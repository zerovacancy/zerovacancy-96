
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import PaymentConfirmation from './pages/PaymentConfirmation';
import Terms from './pages/Terms';
import Account from './pages/Account';
import ConnectSuccess from './pages/ConnectSuccess';
import ConnectRefresh from './pages/ConnectRefresh';
import ConnectOnboarding from './pages/ConnectOnboarding';
import FontLoader from './components/FontLoader';

function App() {
  return (
    <Router>
      <FontLoader />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/account" element={<Account />} />
        <Route path="/connect/success" element={<ConnectSuccess />} />
        <Route path="/connect/refresh" element={<ConnectRefresh />} />
        <Route path="/connect/onboarding" element={<ConnectOnboarding />} />
      </Routes>
    </Router>
  );
}

export default App;
