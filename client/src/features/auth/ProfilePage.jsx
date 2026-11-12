import { useEffect, useState } from 'react';
import { api } from '../../lib/api.js';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/users/me')
      .then(setProfile)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!profile) return <p className="text-gray-500">Loading…</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold">{profile.displayName ?? 'Your profile'}</h1>
      <p className="text-gray-600">{profile.email} · ✅ Verified UCSD</p>
      {/* TODO(auth/matching): editable profile + preferences form */}
    </section>
  );
}
