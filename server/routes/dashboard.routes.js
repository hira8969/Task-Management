import { Router } from 'express';
import { overview } from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/overview', protect, overview);
export default router;
