import { Router } from 'express';
import { createTask, deleteTask, getTask, getTasks, moveTask, updateTask } from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createTaskSchema, moveTaskSchema, updateTaskSchema } from '../validators/task.validator.js';

const router = Router();

router.use(protect);
router.route('/').get(getTasks).post(validate(createTaskSchema), createTask);
router.route('/:id').get(getTask).patch(validate(updateTaskSchema), updateTask).delete(deleteTask);
router.patch('/:id/move', validate(moveTaskSchema), moveTask);

export default router;
