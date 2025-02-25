
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/stripe-js";

const PaymentConfirmation = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paymentIntent = queryParams.get('payment_intent');
    const paymentIntentClientSecret = queryParams.get('payment_intent_client_secret');

    const checkPaymentStatus = async () => {
      if (!paymentIntent || !paymentIntentClientSecret) {
        setStatus('failed');
        toast({
          title: "Payment Failed",
          description: "Invalid payment information. Please try again.",
          variant: "destructive",
        });
        return;
      }

      try {
        const stripe = await loadStripe('pk_live_51QtulpAIAL4hcfkS0KfdqCUoUQtz3eDphv2xibo0oIyQGTmtFnSWgTMGghDsj4J5Ff6htMYmGi2iWZmKDDvgJQM700gD6Qtd7Z');
        if (!stripe) throw new Error('Failed to load Stripe');

        const { paymentIntent: stripePaymentIntent } = await stripe.retrievePaymentIntent(paymentIntentClientSecret);

        if (stripePaymentIntent?.status === 'succeeded') {
          setStatus('success');
          
          // Update payment status in database
          const { error: updateError } = await supabase
            .from('payments')
            .update({ status: 'completed' })
            .eq('stripe_payment_id', paymentIntent);

          if (updateError) {
            console.error('Error updating payment status:', updateError);
          }

          toast({
            title: "Payment Successful",
            description: "Thank you for your purchase! We'll get started right away.",
          });
        } else {
          setStatus('failed');
          toast({
            title: "Payment Failed",
            description: "Something went wrong with your payment. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('failed');
        toast({
          title: "Error",
          description: "Failed to verify payment status. Please contact support.",
          variant: "destructive",
        });
      }
    };

    checkPaymentStatus();
  }, [toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Processing your payment...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we confirm your payment.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Payment Successful!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Thank you for your purchase. We'll get started on your project right away.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Return to Home
              </button>
            </div>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Payment Failed
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Something went wrong with your payment. Please try again.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Return to Pricing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
