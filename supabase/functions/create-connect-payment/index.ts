
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
    const { 
      userId, 
      connectAccountId, 
      amount, 
      currency = "usd", 
      description,
      serviceType,
      metadata = {}
    } = await req.json();

    if (!userId || !connectAccountId || !amount) {
      throw new Error("User ID, Connect Account ID, and amount are required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the connect account exists and belongs to a valid photographer
    const { data: connectAccount, error: connectError } = await supabase
      .from("stripe_connect_accounts")
      .select("*")
      .eq("stripe_account_id", connectAccountId)
      .single();

    if (connectError || !connectAccount) {
      throw new Error("Connected account not found or invalid");
    }

    // Calculate platform fee (20% of the total amount)
    const platformFee = Math.round(amount * 0.2);
    
    // Create a payment intent with the connected account
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      description: description || `Payment for ${serviceType || 'photography services'}`,
      metadata: {
        ...metadata,
        user_id: userId,
        connect_account_id: connectAccountId,
        service_type: serviceType,
      },
      application_fee_amount: platformFee,
      transfer_data: {
        destination: connectAccountId,
      },
    });

    // Save the payment record to our database
    await supabase.from("connect_payments").insert({
      user_id: userId,
      photographer_id: connectAccount.user_id,
      stripe_payment_intent_id: paymentIntent.id,
      stripe_connect_account_id: connectAccountId,
      amount,
      platform_fee: platformFee,
      currency,
      status: paymentIntent.status,
      description,
      service_type: serviceType,
      metadata: { ...metadata, paymentIntent },
    });

    return new Response(
      JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating Connect payment:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create payment",
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400,
      }
    );
  }
});
