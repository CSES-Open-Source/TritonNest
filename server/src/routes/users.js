import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';

const router = Router();

// GET /api/users/me: find or create the profile for the signed-in user
router.get('/me', requireAuth, async (req, res) => {
  const { uid, email, name } = req.user;
  const user = await User.findOneAndUpdate(
    { firebaseUid: uid },
    { $setOnInsert: { firebaseUid: uid, email, displayName: name } },
    { returnDocument: 'after', upsert: true },
  );
  res.json(user);
});

// PATCH /api/users/me: update profile + roommate preferences
router.patch('/me', requireAuth, async (req, res) => {
  const allowed = ['displayName', 'avatarUrl', 'major', 'year', 'bio', 'preferences'];
  const update = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const user = await User.findOneAndUpdate({ firebaseUid: req.user.uid }, update, {
    returnDocument: 'after',
    runValidators: true,
  });
  res.json(user);
});

export default router;
