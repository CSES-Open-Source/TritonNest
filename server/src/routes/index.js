import { Router } from 'express';
import health from './health.js';
import users from './users.js';
import listings from './listings.js';

const router = Router();

router.use('/health', health);
router.use('/users', users);
router.use('/listings', listings);
// TODO(messaging): router.use('/conversations', conversations);
// TODO(matching):  router.use('/matches', matches);

export default router;
