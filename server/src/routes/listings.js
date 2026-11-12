import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { HttpError } from '../middleware/error.js';
import { Listing } from '../models/Listing.js';
import { User } from '../models/User.js';

const router = Router();

// GET /api/listings?maxRent=&minRent=&bedrooms=
// TODO(filters): commute time, nearby grocery/dining, geo radius
router.get('/', requireAuth, async (req, res) => {
  const { minRent, maxRent, bedrooms } = req.query;
  const query = { status: 'active' };
  if (minRent || maxRent) {
    query.rent = {};
    if (minRent) query.rent.$gte = Number(minRent);
    if (maxRent) query.rent.$lte = Number(maxRent);
  }
  if (bedrooms) query.bedrooms = Number(bedrooms);
  const listings = await Listing.find(query)
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('owner', 'displayName avatarUrl');
  res.json(listings);
});

router.get('/:id', requireAuth, async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('owner', 'displayName avatarUrl');
  if (!listing) throw new HttpError(404, 'Listing not found');
  res.json(listing);
});

router.post('/', requireAuth, async (req, res) => {
  const owner = await User.findOne({ firebaseUid: req.user.uid });
  if (!owner) throw new HttpError(400, 'Create your profile first (GET /api/users/me)');
  const listing = await Listing.create({ ...req.body, owner: owner._id, status: 'active' });
  res.status(201).json(listing);
});

// TODO(listings): PATCH /:id and DELETE /:id (owner only)

export default router;
