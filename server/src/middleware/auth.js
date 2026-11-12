import { getAdminAuth } from '../config/firebase.js';
import { env } from '../config/env.js';
import { HttpError } from './error.js';

/** Verifies a Firebase ID token and confirms the user has a verified UCSD email. */
export async function verifyIdToken(token) {
  const decoded = await getAdminAuth().verifyIdToken(token);
  const email = decoded.email?.toLowerCase() ?? '';
  if (!email.endsWith(`@${env.allowedEmailDomain}`) || decoded.email_verified === false) {
    throw new HttpError(403, `A verified @${env.allowedEmailDomain} account is required`);
  }
  return { uid: decoded.uid, email, name: decoded.name };
}

/** Express middleware: expects `Authorization: Bearer <Firebase ID token>`. Sets req.user. */
export async function requireAuth(req, _res, next) {
  try {
    const [scheme, token] = (req.headers.authorization ?? '').split(' ');
    if (scheme !== 'Bearer' || !token) throw new HttpError(401, 'Missing bearer token');
    req.user = await verifyIdToken(token);
    next();
  } catch (err) {
    next(err instanceof HttpError ? err : new HttpError(401, 'Invalid or expired token'));
  }
}
