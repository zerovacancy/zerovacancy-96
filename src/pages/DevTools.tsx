
import React from 'react';
import Header from './Header';
import DevAssistant from '@/components/DevAssistant';

const DevTools: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Developer Tools</h1>
        
        <div className="max-w-4xl mx-auto">
          <DevAssistant />
        </div>
      </div>
    </div>
  );
};

export default DevTools;
