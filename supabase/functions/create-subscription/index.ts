
import { serve } from 'https://deno.fresh.dev/std@v1/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { corsHeaders } from '../_shared/cors.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const PRICE_IDS = {
  'Basic': 'price_basic', // Replace with your actual Stripe price IDs
  'Professional': 'price_professional',
  'Premium': 'price_premium'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { packageName, userId } = await req.json();
    const priceId = PRICE_IDS[packageName as keyof typeof PRICE_IDS];

    if (!priceId) {
      throw new Error('Invalid package selected');
    }

    // Create or retrieve customer
    let customer;
    const customers = await stripe.customers.search({
      query: `metadata['supabase_user_id']:'${userId}'`,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        metadata: {
          supabase_user_id: userId,
        },
      });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Store subscription in database
    const { data: subscriptionData, error: subscriptionError } = await supabaseAdmin
      .from('customer_subscriptions')
      .insert([
        {
          user_id: userId,
          stripe_customer_id: customer.id,
          stripe_subscription_id: subscription.id,
          plan_id: priceId,
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000),
          current_period_end: new Date(subscription.current_period_end * 1000),
        },
      ]);

    if (subscriptionError) {
      throw subscriptionError;
    }

    return new Response(
      JSON.stringify({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any).payment_intent.client_secret,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
