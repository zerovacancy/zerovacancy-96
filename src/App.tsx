
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Index from './pages/Index';
import PaymentConfirmation from './pages/PaymentConfirmation';
import Terms from './pages/Terms';
import Account from './pages/Account';
import ConnectSuccess from './pages/ConnectSuccess';
import ConnectRefresh from './pages/ConnectRefresh';
import ConnectOnboarding from './pages/ConnectOnboarding';
import FontLoader from './components/FontLoader';
import { Toaster } from '@/components/ui/toaster';

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-700 mb-4">{error.message || "An unexpected error occurred"}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <FontLoader />
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden overflow-y-auto touch-manipulation">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/account" element={<Account />} />
            <Route path="/connect/success" element={<ConnectSuccess />} />
            <Route path="/connect/refresh" element={<ConnectRefresh />} />
            <Route path="/connect/onboarding" element={<ConnectOnboarding />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
