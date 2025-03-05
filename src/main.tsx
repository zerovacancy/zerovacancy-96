
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.tsx';
import './index.css';
import ErrorFallback from './components/ErrorFallback.tsx';

/**
 * Root application renderer with error boundary
 * This pattern helps to catch and handle global errors gracefully
 */
createRoot(document.getElementById("root")!).render(
  <ErrorBoundary 
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // Reset the app state here
      window.location.href = '/';
    }}
  >
    <App />
  </ErrorBoundary>
);
