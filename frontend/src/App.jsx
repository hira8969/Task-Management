import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppRoutes from './routes/AppRoutes.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
  useTheme();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
