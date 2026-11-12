import admin from 'firebase-admin';
import { env } from './env.js';

let app;

/** Lazily initialise Firebase Admin so the server can boot (and tests run) without credentials. */
export function getFirebaseAdmin() {
  if (app) return admin;
  const credential = env.firebaseServiceAccountJson
    ? admin.credential.cert(JSON.parse(env.firebaseServiceAccountJson))
    : process.env.GOOGLE_APPLICATION_CREDENTIALS
      ? admin.credential.applicationDefault()
      : null;
  if (!credential) {
    throw new Error('Firebase Admin is not configured (see server/.env.example)');
  }
  app = admin.initializeApp({ credential, storageBucket: env.firebaseStorageBucket });
  return admin;
}
