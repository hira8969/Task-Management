import { Router } from 'express';
import { adminOverview } from '../controllers/admin.controller.js';
import { authorize, protect } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/overview', protect, authorize('owner', 'admin'), adminOverview);
export default router;
