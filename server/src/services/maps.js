import { env } from '../config/env.js';

// UCSD Price Center as the default campus destination
export const UCSD_CAMPUS = { lat: 32.8801, lng: -117.234 };

/**
 * TODO(filters): call the Google Distance Matrix API for walk/bike/transit/drive minutes.
 * Cache results on the Listing (commuteMinutes) so we don't pay per request.
 */
export async function getCommuteMinutes(_origin, _destination = UCSD_CAMPUS) {
  if (!env.googleMapsApiKey) throw new Error('GOOGLE_MAPS_API_KEY is not set');
  throw new Error('Not implemented');
}
