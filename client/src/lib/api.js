import { auth } from './firebase.js';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

/** fetch wrapper that attaches the Firebase ID token and parses JSON. */
export async function api(path, { method = 'GET', body, headers } = {}) {
  const token = await auth.currentUser?.getIdToken();
  const res = await fetch(`${API_URL}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status})`);
  return data;
}
