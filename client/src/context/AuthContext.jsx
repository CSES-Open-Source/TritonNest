import { useEffect, useState } from 'react';
import { AuthContext } from './auth-context.js';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, ucsdProvider, ALLOWED_EMAIL_DOMAIN } from '../lib/firebase.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      }),
    [],
  );

  const login = async () => {
    const { user: u } = await signInWithPopup(auth, ucsdProvider);
    // UX check only. The server enforces the domain on every request.
    if (!u.email?.toLowerCase().endsWith(`@${ALLOWED_EMAIL_DOMAIN}`)) {
      await signOut(auth);
      throw new Error(`Please sign in with your @${ALLOWED_EMAIL_DOMAIN} account.`);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}
