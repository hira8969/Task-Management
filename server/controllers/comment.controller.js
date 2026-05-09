import Comment from '../models/Comment.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { logActivity } from '../services/activity.service.js';
import { getIO } from '../sockets/index.js';

export const listComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ task: req.params.taskId, workspace: req.user.workspace }).populate('author', 'name avatar').sort('createdAt');
  res.json({ data: comments });
});

export const createComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create({ body: req.body.body, task: req.body.task, author: req.user._id, workspace: req.user.workspace, mentions: req.body.mentions || [] });
  await logActivity({ title: 'Comment added', description: req.body.body.slice(0, 80), actor: req.user._id, task: req.body.task, workspace: req.user.workspace, type: 'comment.created' });
  getIO()?.to(`workspace:${req.user.workspace}`).emit('task:changed');
  res.status(201).json(comment);
});
