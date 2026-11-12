import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const auth = getAuth(app);
export const storage = getStorage(app);

// UCSD accounts run on Microsoft 365, so SSO goes through the Microsoft provider.
export const ucsdProvider = new OAuthProvider('microsoft.com');
ucsdProvider.setCustomParameters({
  prompt: 'select_account',
  ...(import.meta.env.VITE_MICROSOFT_TENANT_ID && {
    tenant: import.meta.env.VITE_MICROSOFT_TENANT_ID,
  }),
});

export const ALLOWED_EMAIL_DOMAIN = import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN ?? 'ucsd.edu';
