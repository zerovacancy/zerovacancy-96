
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, CreditCard, Lock, LogOut, Settings, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe('pk_live_51QtulpAIAL4hcfkS0KfdqCUoUQtz3eDphv2xibo0oIyQGTmtFnSWgTMGghDsj4J5Ff6htMYmGi2iWZmKDDvgJQM700gD6Qtd7Z');

const Account = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        if (!currentUser) {
          navigate('/');
          return;
        }
        
        setUser(currentUser);
        
        // Fetch subscription data
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('customer_subscriptions')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (subscriptionError) {
          throw subscriptionError;
        }
        
        if (subscriptionData && subscriptionData.length > 0) {
          setSubscription(subscriptionData[0]);
        }
        
        // Fetch payment history
        const { data: paymentData, error: paymentError } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (paymentError) {
          throw paymentError;
        }
        
        if (paymentData) {
          setPayments(paymentData);
        }
        
      } catch (error) {
        console.error('Error loading account data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load account information',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCancelSubscription = async () => {
    if (!user || !subscription) return;
    
    try {
      setIsProcessing(true);
      
      const { error } = await supabase.functions.invoke('cancel-subscription', {
        body: { 
          subscriptionId: subscription.stripe_subscription_id,
          userId: user.id
        }
      });
      
      if (error) throw new Error(error.message);
      
      // Update subscription status locally
      setSubscription({
        ...subscription,
        status: 'canceling',
      });
      
      toast({
        title: 'Subscription Cancelled',
        description: 'Your subscription will remain active until the end of the current billing period.',
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription. Please try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleUpdatePaymentMethod = async () => {
    if (!user || !subscription) return;
    
    try {
      setIsProcessing(true);
      
      const { data, error } = await supabase.functions.invoke('create-payment-update-session', {
        body: { 
          subscriptionId: subscription.stripe_subscription_id,
          userId: user.id
        }
      });
      
      if (error) throw new Error(error.message);
      
      if (!data.sessionId) throw new Error('No session ID returned');
      
      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');
      
      await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });
      
    } catch (error) {
      console.error('Error updating payment method:', error);
      toast({
        title: 'Error',
        description: 'Failed to update payment method. Please try again or contact support.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatCurrency = (amount: number, currency: string) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account details and subscription</p>
        </div>
        
        <Tabs defaultValue="subscription" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:w-[400px]">
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription Details
                </CardTitle>
                <CardDescription>
                  Manage your subscription plan and payment settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {subscription ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Current Plan</h3>
                        <p className="mt-1 text-lg font-medium capitalize">
                          {subscription.plan_id.replace('price_', '')}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                        <p className="mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            subscription.status === 'active' || subscription.status === 'trialing'
                              ? 'bg-green-100 text-green-800'
                              : subscription.status === 'past_due'
                              ? 'bg-red-100 text-red-800'
                              : subscription.status === 'canceled' || subscription.status === 'canceling'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {subscription.status}
                          </span>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Current Period</h3>
                        <p className="mt-1 text-sm">
                          {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Auto Renewal</h3>
                        <p className="mt-1 text-sm">
                          {subscription.status === 'canceled' || subscription.status === 'canceling'
                            ? 'No - Subscription will end on ' + formatDate(subscription.current_period_end)
                            : 'Yes - Will renew on ' + formatDate(subscription.current_period_end)
                          }
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleUpdatePaymentMethod}
                        disabled={isProcessing || subscription.status === 'canceled'}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Update Payment Method
                      </Button>
                      
                      {subscription.status !== 'canceled' && subscription.status !== 'canceling' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleCancelSubscription}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Cancel Subscription'}
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active subscription</h3>
                    <p className="text-gray-500 mb-6">Subscribe to a plan to access premium features</p>
                    <ShimmerButton
                      onClick={() => navigate('/#pricing')}
                      className="mx-auto"
                    >
                      <span>View Plans</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </ShimmerButton>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-sm">{user?.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
                      <p className="mt-1 text-sm">
                        {user?.created_at ? formatDate(user.created_at) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Billing History
                </CardTitle>
                <CardDescription>
                  View your recent payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {payments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(payment.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCurrency(payment.amount, payment.currency)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                                payment.status === 'succeeded'
                                  ? 'bg-green-100 text-green-800'
                                  : payment.status === 'failed'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No payment history</h3>
                    <p className="text-gray-500">
                      Your payment history will appear here once you've made a payment
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
