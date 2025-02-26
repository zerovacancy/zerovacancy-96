
import { serve } from 'https://deno.fresh.dev/std@v1/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature || !endpointSecret) {
    return new Response('Webhook signature missing', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const { data: subscriptionData, error: subscriptionError } = await supabaseAdmin
          .from('customer_subscriptions')
          .upsert({
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000),
            current_period_end: new Date(subscription.current_period_end * 1000),
            cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
          }, {
            onConflict: 'stripe_subscription_id'
          });

        if (subscriptionError) throw subscriptionError;
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        if (invoice.subscription) {
          const { data: paymentData, error: paymentError } = await supabaseAdmin
            .from('payments')
            .insert({
              user_id: invoice.customer,
              amount: invoice.amount_paid,
              status: 'completed',
              stripe_payment_id: invoice.payment_intent,
              subscription_id: invoice.subscription,
              subscription_period_start: new Date(invoice.period_start * 1000),
              subscription_period_end: new Date(invoice.period_end * 1000),
              subscription_status: 'active'
            });

          if (paymentError) throw paymentError;
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        // Update subscription status to reflect failed payment
        if (invoice.subscription) {
          const { error: subscriptionError } = await supabaseAdmin
            .from('customer_subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', invoice.subscription);

          if (subscriptionError) throw subscriptionError;
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Webhook error:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
