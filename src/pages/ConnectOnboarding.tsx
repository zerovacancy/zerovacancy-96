
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CreditCard, DollarSign, Info, RefreshCw, CheckCircle } from 'lucide-react';

const ConnectOnboarding = () => {
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [accountStatus, setAccountStatus] = useState<{
    exists: boolean;
    isOnboarded: boolean;
    accountId?: string;
  } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication first
  useEffect(() => {
    const checkAuth = async () => {
      setAuthChecking(true);
      const { data } = await supabase.auth.getUser();
      
      if (!data?.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access this page.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      setAuthChecking(false);
    };
    
    checkAuth();
  }, [navigate, toast]);

  const checkAccountStatus = async () => {
    try {
      setLoading(true);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to continue.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      // Check if user already has a connect account
      const { data, error } = await supabase.functions.invoke('create-connect-account', {
        body: {
          userId: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || ''
        },
      });
      
      if (error) throw new Error(error.message);
      
      setAccountStatus({
        exists: !!data.accountId,
        isOnboarded: data.isFullyOnboarded || false,
        accountId: data.accountId
      });
      
      // If account exists and onboarding URL is available, store it for the start button
      if (data.accountLink) {
        localStorage.setItem('connectAccountLink', data.accountLink);
      }
      
    } catch (error) {
      console.error('Error checking account status:', error);
      toast({
        title: "Error",
        description: "Failed to check your account status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startOnboarding = async () => {
    try {
      setLoading(true);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to continue.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      // If we have a stored account link, use it
      const storedLink = localStorage.getItem('connectAccountLink');
      if (storedLink) {
        window.location.href = storedLink;
        return;
      }
      
      // Otherwise, create a new account + link
      const { data, error } = await supabase.functions.invoke('create-connect-account', {
        body: {
          userId: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || ''
        },
      });
      
      if (error) throw new Error(error.message);
      
      if (data.accountLink) {
        // Redirect to Stripe Connect onboarding
        window.location.href = data.accountLink;
      } else {
        toast({
          title: "Error",
          description: "Failed to generate an onboarding link. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error starting onboarding:', error);
      toast({
        title: "Error",
        description: "Failed to start onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Once authentication is confirmed, check account status
  useEffect(() => {
    if (!authChecking) {
      checkAccountStatus();
    }
  }, [authChecking]);

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">Checking authentication...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Stripe Connect Onboarding
          </h1>
          
          <Card className="p-6 border bg-white shadow-md rounded-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Become a Photographer</h2>
              <p className="text-gray-600">
                Complete the Stripe Connect onboarding process to start receiving payments for your photography services.
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {accountStatus && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Account Status</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className={`mr-2 ${accountStatus.exists ? 'text-green-500' : 'text-gray-400'}`}>
                          {accountStatus.exists ? <CheckCircle size={18} /> : <Info size={18} />}
                        </div>
                        <span>Connect Account: {accountStatus.exists ? 'Created' : 'Not Created'}</span>
                      </li>
                      <li className="flex items-center">
                        <div className={`mr-2 ${accountStatus.isOnboarded ? 'text-green-500' : 'text-gray-400'}`}>
                          {accountStatus.isOnboarded ? <CheckCircle size={18} /> : <Info size={18} />}
                        </div>
                        <span>Onboarding Status: {accountStatus.isOnboarded ? 'Complete' : 'Incomplete'}</span>
                      </li>
                      {accountStatus.accountId && (
                        <li className="flex items-center">
                          <div className="mr-2 text-blue-500">
                            <CreditCard size={18} />
                          </div>
                          <span>Account ID: {accountStatus.accountId}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  {accountStatus?.isOnboarded ? (
                    <Button 
                      variant="default" 
                      className="w-full sm:w-auto" 
                      onClick={() => navigate('/account')}
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Go to Dashboard
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      className="w-full sm:w-auto" 
                      onClick={startOnboarding}
                      disabled={loading}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      {accountStatus?.exists ? 'Continue Onboarding' : 'Start Onboarding'}
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto" 
                    onClick={checkAccountStatus}
                    disabled={loading}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Status
                  </Button>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    Note: You will be redirected to Stripe to complete the onboarding process. After completion, you'll be redirected back to the success page.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConnectOnboarding;
