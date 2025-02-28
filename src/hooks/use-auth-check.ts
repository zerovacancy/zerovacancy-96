
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAuthCheck = () => {
  const [authChecking, setAuthChecking] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return { authChecking };
};
