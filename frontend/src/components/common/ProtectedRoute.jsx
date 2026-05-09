import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore.js';

export default function ProtectedRoute({ children }) {
  const token = useAppStore((state) => state.accessToken);
  const location = useLocation();
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
