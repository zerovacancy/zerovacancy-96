
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

    // Cancel the subscription at the end of the current period
    const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update the subscription in the database
    await supabase
      .from("customer_subscriptions")
      .update({
        status: "canceling",
        cancel_at: new Date(canceledSubscription.cancel_at * 1000).toISOString(),
        metadata: canceledSubscription,
      })
      .eq("stripe_subscription_id", subscriptionId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Subscription will be canceled at the end of the billing period",
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to cancel subscription",
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400,
      }
    );
  }
});
