import { Router } from 'express';
import { createComment, listComments } from '../controllers/comment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();
router.use(protect);
router.get('/task/:taskId', listComments);
router.post('/', createComment);
export default router;
