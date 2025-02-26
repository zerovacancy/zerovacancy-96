
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import PaymentConfirmation from './pages/PaymentConfirmation';
import Terms from './pages/Terms';
import FontLoader from './components/FontLoader';

function App() {
  return (
    <Router>
      <FontLoader />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
