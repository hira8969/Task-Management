import { Router } from 'express';
import { getWorkspace, updateWorkspace } from '../controllers/workspace.controller.js';
import { authorize, protect } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/current', protect, getWorkspace);
router.patch('/current', protect, authorize('owner', 'admin'), updateWorkspace);
export default router;
