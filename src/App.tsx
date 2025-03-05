
import React, { useState, useEffect, ErrorBoundary } from 'react';
import { Routes, Route, useNavigate, useLocation, BrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Account from './pages/Account';
import ConnectOnboarding from './pages/ConnectOnboarding';
import ConnectSuccess from './pages/ConnectSuccess';
import ConnectRefresh from './pages/ConnectRefresh';
import Auth from './pages/Auth';
import PaymentConfirmation from './pages/PaymentConfirmation';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/clerk-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { ErrorFallback } from '@/components/ErrorFallback';

// Using an environment variable or a valid key is recommended
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_cmVndWxhci1jYXQtMjEuY2xlcmsuYWNjb3VudHMuZGV2JA"; // Using a test key for now

function AppContent() {
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent layout shift
  if (!isMounted) {
    return null
  }

  return (
    <div className="App">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {authError ? (
          // Fallback UI when Clerk fails
          <Routes>
            <Route path="*" element={<Index />} />
          </Routes>
        ) : (
          <ClerkProvider publishableKey={clerkPubKey} 
                         onError={() => setAuthError(true)}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/connect/onboarding" element={<ConnectOnboarding />} />
              <Route path="/connect/success" element={<ConnectSuccess />} />
              <Route path="/connect/refresh" element={<ConnectRefresh />} />
              <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            </Routes>
          </ClerkProvider>
        )}
        <Toaster />
      </ThemeProvider>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppContent />
        </ErrorBoundary>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
