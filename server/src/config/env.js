import { cleanEnv, str, port, url } from 'envalid';

/**
 * Validates server env vars at startup and fails fast with a clear message.
 * `devDefault` applies only when NODE_ENV !== 'production', so production must set every value.
 * Add new variables here AND in server/.env.example.
 */
const raw = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 4000 }),
  CLIENT_ORIGIN: url({ devDefault: 'http://localhost:5173' }),
  MONGODB_URI: str({ devDefault: 'mongodb://localhost:27017/tritonnest' }),
  ALLOWED_EMAIL_DOMAIN: str({ default: 'ucsd.edu' }),
  FIREBASE_SERVICE_ACCOUNT_JSON: str({ default: '', desc: 'Firebase Admin service account JSON' }),
  GOOGLE_APPLICATION_CREDENTIALS: str({ default: '', desc: 'Path to the service account file' }),
  FIREBASE_STORAGE_BUCKET: str({ default: '' }),
  GOOGLE_MAPS_API_KEY: str({ default: '' }),
});

export const env = {
  nodeEnv: raw.NODE_ENV,
  port: raw.PORT,
  clientOrigin: raw.CLIENT_ORIGIN,
  mongodbUri: raw.MONGODB_URI,
  allowedEmailDomain: raw.ALLOWED_EMAIL_DOMAIN,
  firebaseServiceAccountJson: raw.FIREBASE_SERVICE_ACCOUNT_JSON,
  googleApplicationCredentials: raw.GOOGLE_APPLICATION_CREDENTIALS,
  firebaseStorageBucket: raw.FIREBASE_STORAGE_BUCKET,
  googleMapsApiKey: raw.GOOGLE_MAPS_API_KEY,
};
