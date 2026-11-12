const required = (name, fallback) => {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required env var: ${name} (see server/.env.example)`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  mongodbUri: () => required('MONGODB_URI'),
  allowedEmailDomain: process.env.ALLOWED_EMAIL_DOMAIN ?? 'ucsd.edu',
  firebaseServiceAccountJson: process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
};
