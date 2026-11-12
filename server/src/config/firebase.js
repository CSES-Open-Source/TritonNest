import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { env } from './env.js';

/** Lazily initialise Firebase Admin so the server can boot (and tests run) without credentials. */
function getAdminApp() {
  if (getApps().length) return getApps()[0];
  const credential = env.firebaseServiceAccountJson
    ? cert(JSON.parse(env.firebaseServiceAccountJson))
    : env.googleApplicationCredentials
      ? applicationDefault()
      : null;
  if (!credential) {
    throw new Error('Firebase Admin is not configured (see server/.env.example)');
  }
  return initializeApp({ credential, storageBucket: env.firebaseStorageBucket || undefined });
}

export const getAdminAuth = () => getAuth(getAdminApp());
export const getAdminStorage = () => getStorage(getAdminApp());
