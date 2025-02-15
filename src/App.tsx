
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from './pages/Index';
import FontLoader from './components/FontLoader';

function App() {
  return (
    <Router>
      <FontLoader />
      <Index />
    </Router>
  );
}

export default App;
