import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/auth-context.js';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p className="p-8 text-gray-500">Loading…</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
