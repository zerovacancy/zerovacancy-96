
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We encountered an unexpected error. Our team has been notified.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-3 bg-gray-100 rounded text-left w-full overflow-auto">
              <p className="text-red-600 text-sm font-mono">{error.message}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              onClick={resetErrorBoundary}
              variant="outline" 
              className="flex-1"
            >
              Try Again
            </Button>
            <Button 
              asChild
              className="flex-1"
            >
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
