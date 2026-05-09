import Task from '../models/Task.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildQuery } from '../utils/queryFeatures.js';
import { logActivity } from '../services/activity.service.js';
import { getIO } from '../sockets/index.js';

const emitTaskChange = (workspace) => {
  const io = getIO();
  io?.to(`workspace:${workspace}`).emit('task:changed');
  io?.to(`workspace:${workspace}`).emit('dashboard:changed');
};

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await buildQuery(Task, req.query, { workspace: req.user.workspace })
    .populate('assignees', 'name email avatar')
    .populate('labels', 'name color')
    .populate('commentsCount');
  const total = await Task.countDocuments({ workspace: req.user.workspace });
  res.json({ data: tasks, total });
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({ ...req.body, workspace: req.user.workspace, createdBy: req.user._id });
  await logActivity({ title: 'Task created', description: task.title, actor: req.user._id, task: task._id, workspace: req.user.workspace, type: 'task.created' });
  emitTaskChange(req.user.workspace);
  res.status(201).json(task);
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, workspace: req.user.workspace })
    .populate('assignees labels category attachments')
    .populate('commentsCount');
  if (!task) throw new ApiError(404, 'Task not found');
  res.json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, workspace: req.user.workspace }, req.body, { new: true, runValidators: true });
  if (!task) throw new ApiError(404, 'Task not found');
  await logActivity({ title: 'Task updated', description: task.title, actor: req.user._id, task: task._id, workspace: req.user.workspace, type: 'task.updated' });
  emitTaskChange(req.user.workspace);
  res.json(task);
});

export const moveTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, workspace: req.user.workspace }, { status: req.body.status, order: req.body.order || 0 }, { new: true, runValidators: true });
  if (!task) throw new ApiError(404, 'Task not found');
  await logActivity({ title: 'Task moved', description: `${task.title} moved to ${task.status}`, actor: req.user._id, task: task._id, workspace: req.user.workspace, type: 'task.moved' });
  emitTaskChange(req.user.workspace);
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, workspace: req.user.workspace });
  if (!task) throw new ApiError(404, 'Task not found');
  await logActivity({ title: 'Task deleted', description: task.title, actor: req.user._id, workspace: req.user.workspace, type: 'task.deleted' });
  emitTaskChange(req.user.workspace);
  res.status(204).send();
});
