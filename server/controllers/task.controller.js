import Task from '../models/Task.js';
import '../models/Attachment.js';
import '../models/Category.js';
import '../models/Comment.js';
import '../models/Label.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildQuery } from '../utils/queryFeatures.js';
import { logActivity } from '../services/activity.service.js';
import { getIO } from '../sockets/index.js';

const dateFields = ['startDate', 'dueDate', 'reminderAt'];

const normalizeTaskPayload = (payload) => {
  const normalized = { ...payload };
  dateFields.forEach((field) => {
    if (normalized[field] === '') normalized[field] = null;
  });
  if (Array.isArray(normalized.tags)) {
    normalized.tags = [...new Set(normalized.tags.map((tag) => tag.trim()).filter(Boolean))];
  }
  if (Array.isArray(normalized.checklist)) {
    normalized.checklist = normalized.checklist
      .map((item) => ({ title: item.title.trim(), completed: Boolean(item.completed) }))
      .filter((item) => item.title);
  }
  if (normalized.status === 'completed') normalized.progress = 100;
  return normalized;
};

const emitTaskChange = (workspace, payload = {}) => {
  const io = getIO();
  io?.to(`workspace:${workspace}`).emit('task:changed', payload);
  io?.to(`workspace:${workspace}`).emit('dashboard:changed', payload);
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
  const payload = normalizeTaskPayload(req.body);
  const completedAt = payload.status === 'completed' ? new Date() : undefined;
  const task = await Task.create({ ...payload, completedAt, workspace: req.user.workspace, createdBy: req.user._id });
  await logActivity({ title: 'Task created', description: task.title, actor: req.user._id, task: task._id, workspace: req.user.workspace, type: 'task.created' });
  emitTaskChange(req.user.workspace, { action: 'created', taskId: task._id });
  const populatedTask = await Task.findById(task._id).populate('assignees', 'name email avatar').populate('labels', 'name color').populate('commentsCount');
  res.status(201).json(populatedTask);
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, workspace: req.user.workspace })
    .populate('assignees labels category attachments')
    .populate('commentsCount');
  if (!task) throw new ApiError(404, 'Task not found');
  res.json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const update = normalizeTaskPayload(req.body);
  if (update.status === 'completed') update.completedAt = new Date();
  if (update.status && update.status !== 'completed') update.completedAt = null;
  const task = await Task.findOneAndUpdate({ _id: req.params.id, workspace: req.user.workspace }, update, { new: true, runValidators: true })
    .populate('assignees', 'name email avatar')
    .populate('labels', 'name color')
    .populate('commentsCount');
  if (!task) throw new ApiError(404, 'Task not found');
  await logActivity({ title: 'Task updated', description: task.title, actor: req.user._id, task: task._id, workspace: req.user.workspace, type: 'task.updated' });
  emitTaskChange(req.user.workspace, { action: 'updated', taskId: task._id });
  res.json(task);
});

export const moveTask = asyncHandler(async (req, res) => {
  const update = { status: req.body.status, order: req.body.order || 0 };
  update.completedAt = req.body.status === 'completed' ? new Date() : null;
  if (req.body.status === 'completed') update.progress = 100;
  const task = await Task.findOneAndUpdate({ _id: req.params.id, workspace: req.user.workspace }, update, { new: true, runValidators: true })
    .populate('assignees', 'name email avatar')
    .populate('labels', 'name color')
    .populate('commentsCount');
  if (!task) throw new ApiError(404, 'Task not found');
  await logActivity({ title: 'Task moved', description: `${task.title} moved to ${task.status}`, actor: req.user._id, task: task._id, workspace: req.user.workspace, type: 'task.moved' });
  emitTaskChange(req.user.workspace, { action: 'moved', taskId: task._id });
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, workspace: req.user.workspace });
  if (!task) throw new ApiError(404, 'Task not found');
  await logActivity({ title: 'Task deleted', description: task.title, actor: req.user._id, workspace: req.user.workspace, type: 'task.deleted' });
  emitTaskChange(req.user.workspace, { action: 'deleted', taskId: task._id });
  res.status(204).send();
});
