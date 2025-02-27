
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
    const { userId, email, name, country = "US" } = await req.json();

    if (!userId || !email) {
      throw new Error("User ID and email are required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if there's already a connect account for this user
    const { data: existingAccount } = await supabase
      .from("stripe_connect_accounts")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (existingAccount?.stripe_account_id) {
      // If account exists, retrieve it
      const account = await stripe.accounts.retrieve(existingAccount.stripe_account_id);
      
      // Check if the onboarding is complete
      if (account.details_submitted) {
        return new Response(
          JSON.stringify({
            success: true,
            accountId: account.id,
            isFullyOnboarded: true,
            message: "Connect account already exists and is fully onboarded"
          }),
          {
            headers: { "Content-Type": "application/json", ...corsHeaders },
            status: 200,
          }
        );
      }

      // If not fully onboarded, create an account link for onboarding
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${req.headers.get("origin")}/connect/refresh`,
        return_url: `${req.headers.get("origin")}/connect/success`,
        type: "account_onboarding",
      });

      return new Response(
        JSON.stringify({
          success: true,
          accountId: account.id,
          accountLink: accountLink.url,
          isFullyOnboarded: false,
          message: "Connect account exists but requires further onboarding"
        }),
        {
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 200,
        }
      );
    }

    // Create a new Stripe Connect Express account
    const account = await stripe.accounts.create({
      type: "express",
      country,
      email,
      business_type: "individual",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_profile: {
        name: name || email.split("@")[0],
        product_description: "Professional property photography services",
      },
      metadata: {
        user_id: userId,
      },
    });

    console.log(`Created Stripe Connect account: ${account.id}`);

    // Save the connect account to the database
    await supabase.from("stripe_connect_accounts").insert({
      user_id: userId,
      stripe_account_id: account.id,
      email,
      country,
      onboarded: false,
      metadata: account,
    });

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${req.headers.get("origin")}/connect/refresh`,
      return_url: `${req.headers.get("origin")}/connect/success`,
      type: "account_onboarding",
    });

    return new Response(
      JSON.stringify({
        success: true,
        accountId: account.id,
        accountLink: accountLink.url,
        isFullyOnboarded: false,
        message: "Created new Connect account and onboarding link"
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating Stripe Connect account:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create Connect account",
      }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400,
      }
    );
  }
});
