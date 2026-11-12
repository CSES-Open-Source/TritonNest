import { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/auth-context.js';

export default function Login() {
  const { user, login } = useAuth();
  const location = useLocation();
  const [error, setError] = useState('');

  if (user) return <Navigate to={location.state?.from?.pathname ?? '/listings'} replace />;

  const handleLogin = async () => {
    setError('');
    try {
      await login();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-sm rounded-xl bg-white p-8 text-center shadow">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <p className="mt-2 text-sm text-gray-600">Only @ucsd.edu accounts can use TritonNest.</p>
      <button
        onClick={handleLogin}
        className="bg-triton-navy mt-6 w-full rounded-lg px-4 py-2 font-semibold text-white"
      >
        Sign in with UCSD Google account
      </button>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
