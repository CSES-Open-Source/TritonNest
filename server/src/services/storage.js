import { getFirebaseAdmin } from '../config/firebase.js';

/**
 * Listing photo uploads go to Firebase Storage by default.
 * TODO(listings): issue signed upload URLs or accept multipart uploads.
 * To switch to AWS S3, keep this function's signature and swap the implementation.
 */
export async function getUploadUrl(path, contentType) {
  const bucket = getFirebaseAdmin().storage().bucket();
  const [url] = await bucket.file(path).getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    contentType,
  });
  return url;
}
