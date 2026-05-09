import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
  if (!token) throw new ApiError(401, 'Authentication required');
  const payload = jwt.verify(token, env.jwtAccessSecret);
  const user = await User.findById(payload.sub).select('-password');
  if (!user || !user.isActive) throw new ApiError(401, 'Invalid session');
  req.user = user;
  next();
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) throw new ApiError(403, 'Insufficient permissions');
  next();
};
