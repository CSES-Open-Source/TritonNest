import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../context/auth-context.js';

const links = [
  { to: '/listings', label: 'Subleases' },
  { to: '/matches', label: 'Roommates' },
  { to: '/messages', label: 'Messages' },
  { to: '/profile', label: 'Profile' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-triton-navy text-white">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
          <NavLink to="/" className="text-lg font-bold">
            🏡 TritonNest
          </NavLink>
          {user && (
            <ul className="flex gap-4 text-sm">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      isActive ? 'text-triton-gold' : 'hover:underline'
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
          <div className="ml-auto text-sm">
            {user ? (
              <button onClick={logout} className="hover:underline">
                Sign out
              </button>
            ) : (
              <NavLink to="/login" className="hover:underline">
                Sign in
              </NavLink>
            )}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
