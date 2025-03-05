
import React, { useState, useEffect } from 'react';
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

const clerkPubKey = "clerk.pub_2Z33J359oxBlDMYRwJmbbqj9czE"

function AppContent() {
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent layout shift
  if (!isMounted) {
    return null
  }

  return (
    <div className="App">
      <ClerkProvider publishableKey={clerkPubKey}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/connect/onboarding" element={<ConnectOnboarding />} />
            <Route path="/connect/success" element={<ConnectSuccess />} />
            <Route path="/connect/refresh" element={<ConnectRefresh />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          </Routes>
          <Toaster />
        </ThemeProvider>
      </ClerkProvider>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
