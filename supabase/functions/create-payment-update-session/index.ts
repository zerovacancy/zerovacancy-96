
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import Stripe from "https://esm.sh/stripe@13.10.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subscriptionId, userId } = await req.json();

    if (!subscriptionId || !userId) {
      throw new Error("Subscription ID and user ID are required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the user owns this subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from("customer_subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("stripe_subscription_id", subscriptionId)
      .single();

    if (subscriptionError || !subscription) {
      throw new Error(`Subscription not found or doesn't belong to user`);
    }

    // Retrieve the subscription from Stripe to get the customer ID
    const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customerId = stripeSubscription.customer;

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId.toString(),
      return_url: `${req.headers.get("origin")}/account`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        sessionId: session.id,
        url: session.url,
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating payment update session:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create payment update session",
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400,
      }
    );
  }
});
