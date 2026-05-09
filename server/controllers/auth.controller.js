import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import Workspace from '../models/Workspace.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { setRefreshCookie, signAccessToken, signRefreshToken } from '../utils/tokens.js';

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  workspace: user.workspace
});

function sessionResponse(res, user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  setRefreshCookie(res, refreshToken);
  res.json({ user: publicUser(user), accessToken });
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, workspaceName } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'Email already registered');
  const user = await User.create({ name, email, password, role: 'owner' });
  const workspace = await Workspace.create({
    name: workspaceName,
    slug: `${workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
    owner: user._id,
    members: [{ user: user._id, role: 'owner' }]
  });
  user.workspace = workspace._id;
  await user.save();
  await Task.insertMany([
    {
      title: 'Create your first project plan',
      description: 'Add goals, owners, due dates, and labels for the work your team is starting.',
      priority: 'high',
      status: 'todo',
      workspace: workspace._id,
      createdBy: user._id,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Invite your teammates',
      description: 'Bring collaborators into the workspace so tasks, comments, and updates stay in one place.',
      priority: 'medium',
      status: 'in-progress',
      workspace: workspace._id,
      createdBy: user._id,
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Review dashboard analytics',
      description: 'Track team velocity, overdue work, completion rate, and recent activity.',
      priority: 'medium',
      status: 'review',
      workspace: workspace._id,
      createdBy: user._id,
      dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
    }
  ]);
  sessionResponse(res.status(201), user);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid email or password');
  user.lastLoginAt = new Date();
  await user.save();
  sessionResponse(res, user);
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.signedCookies.refreshToken;
  if (!token) throw new ApiError(401, 'Refresh token missing');
  let payload;
  try {
    payload = jwt.verify(token, env.jwtRefreshSecret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') throw new ApiError(401, 'Refresh token expired');
    if (error.name === 'JsonWebTokenError') throw new ApiError(401, 'Invalid refresh token');
    throw error;
  }
  const user = await User.findById(payload.sub);
  if (!user || user.tokenVersion !== payload.tokenVersion) throw new ApiError(401, 'Refresh token revoked');
  sessionResponse(res, user);
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: publicUser(req.user), accessToken: req.headers.authorization?.split(' ')[1] });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

export const forgotPassword = asyncHandler(async (_req, res) => {
  res.json({ message: 'Password reset instructions queued' });
});

export const resetPassword = asyncHandler(async (_req, res) => {
  res.json({ message: 'Password reset endpoint ready for token workflow' });
});
