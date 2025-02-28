import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type AccountStatus = {
  exists: boolean;
  isOnboarded: boolean;
  accountId?: string;
} | null;

export const useConnectAccount = () => {
  const [loading, setLoading] = useState(true);
  const [accountStatus, setAccountStatus] = useState<AccountStatus>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAccountStatus = useCallback(async () => {
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
  }, [navigate, toast]);

  const startOnboarding = useCallback(async () => {
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
  }, [navigate, toast]);

  return {
    loading,
    accountStatus,
    checkAccountStatus,
    startOnboarding
  };
};
