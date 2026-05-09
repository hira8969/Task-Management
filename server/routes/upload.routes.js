import { Router } from 'express';
import { uploadFile } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();
router.post('/', protect, upload.single('file'), uploadFile);
export default router;
