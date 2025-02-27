
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import Stripe from "https://esm.sh/stripe@13.10.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2023-10-16",
});

// Establish a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response(JSON.stringify({ error: "No signature provided" }), {
      status: 400,
    });
  }

  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log(`Webhook received: ${event.type}`);

    // Handle the event based on its type
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return new Response(
      JSON.stringify({
        error: `Webhook error: ${err.message}`,
      }),
      {
        status: 400,
      }
    );
  }
});

// Handle subscription created or updated
async function handleSubscriptionUpdated(subscription: any) {
  console.log(`Handling subscription update: ${subscription.id}`);

  try {
    // Find the customer subscription in our database
    const { data, error } = await supabase
      .from("customer_subscriptions")
      .select("*")
      .eq("stripe_subscription_id", subscription.id)
      .single();

    if (error) {
      console.error("Error finding subscription:", error.message);
      return;
    }

    if (!data) {
      console.error(`Subscription not found: ${subscription.id}`);
      return;
    }

    // Update the subscription in our database
    const { error: updateError } = await supabase
      .from("customer_subscriptions")
      .update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at: subscription.cancel_at
          ? new Date(subscription.cancel_at * 1000).toISOString()
          : null,
        metadata: subscription,
      })
      .eq("stripe_subscription_id", subscription.id);

    if (updateError) {
      console.error("Error updating subscription:", updateError.message);
      return;
    }

    console.log(`Subscription updated: ${subscription.id}`);
  } catch (error) {
    console.error("Error in handleSubscriptionUpdated:", error.message);
  }
}

// Handle subscription deleted
async function handleSubscriptionDeleted(subscription: any) {
  console.log(`Handling subscription deletion: ${subscription.id}`);

  try {
    // Update the subscription in our database to mark it as canceled
    const { error } = await supabase
      .from("customer_subscriptions")
      .update({
        status: "canceled",
        cancel_at: new Date().toISOString(),
        metadata: subscription,
      })
      .eq("stripe_subscription_id", subscription.id);

    if (error) {
      console.error("Error updating subscription on deletion:", error.message);
      return;
    }

    console.log(`Subscription marked as canceled: ${subscription.id}`);
  } catch (error) {
    console.error("Error in handleSubscriptionDeleted:", error.message);
  }
}

// Handle successful invoice payment
async function handleInvoicePaymentSucceeded(invoice: any) {
  console.log(`Handling successful invoice payment: ${invoice.id}`);

  try {
    // Only process subscription invoices
    if (!invoice.subscription) {
      console.log("Not a subscription invoice, skipping");
      return;
    }

    // Store payment record
    const { error } = await supabase.from("payments").insert({
      stripe_payment_id: invoice.payment_intent,
      stripe_customer_id: invoice.customer,
      user_id: await getUserIdFromCustomerId(invoice.customer),
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: "succeeded",
      subscription_id: invoice.subscription,
      subscription_status: "active",
      subscription_period_start: invoice.lines.data[0]?.period.start
        ? new Date(invoice.lines.data[0].period.start * 1000).toISOString()
        : null,
      subscription_period_end: invoice.lines.data[0]?.period.end
        ? new Date(invoice.lines.data[0].period.end * 1000).toISOString()
        : null,
      metadata: invoice,
    });

    if (error) {
      console.error("Error recording payment:", error.message);
      return;
    }

    // Also update the subscription status to active if it was incomplete
    const { error: subscriptionError } = await supabase
      .from("customer_subscriptions")
      .update({
        status: "active",
      })
      .eq("stripe_subscription_id", invoice.subscription)
      .eq("status", "incomplete");

    if (subscriptionError) {
      console.error(
        "Error updating subscription status after payment:",
        subscriptionError.message
      );
      return;
    }

    console.log(`Payment recorded for invoice: ${invoice.id}`);
  } catch (error) {
    console.error("Error in handleInvoicePaymentSucceeded:", error.message);
  }
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice: any) {
  console.log(`Handling failed invoice payment: ${invoice.id}`);

  try {
    // Only process subscription invoices
    if (!invoice.subscription) {
      console.log("Not a subscription invoice, skipping");
      return;
    }

    // Store payment failure record
    const { error } = await supabase.from("payments").insert({
      stripe_payment_id: invoice.payment_intent,
      stripe_customer_id: invoice.customer,
      user_id: await getUserIdFromCustomerId(invoice.customer),
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: "failed",
      subscription_id: invoice.subscription,
      subscription_status: "past_due",
      metadata: invoice,
    });

    if (error) {
      console.error("Error recording failed payment:", error.message);
      return;
    }

    // Update the subscription status
    const { error: subscriptionError } = await supabase
      .from("customer_subscriptions")
      .update({
        status: "past_due",
      })
      .eq("stripe_subscription_id", invoice.subscription);

    if (subscriptionError) {
      console.error(
        "Error updating subscription status after failed payment:",
        subscriptionError.message
      );
      return;
    }

    console.log(`Failed payment recorded for invoice: ${invoice.id}`);
  } catch (error) {
    console.error("Error in handleInvoicePaymentFailed:", error.message);
  }
}

// Helper function to get user ID from Stripe customer ID
async function getUserIdFromCustomerId(customerId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("customer_subscriptions")
      .select("user_id")
      .eq("stripe_customer_id", customerId)
      .limit(1)
      .single();

    if (error || !data) {
      console.error("Error finding user ID for customer:", error?.message);
      return null;
    }

    return data.user_id;
  } catch (error) {
    console.error("Error in getUserIdFromCustomerId:", error.message);
    return null;
  }
}
