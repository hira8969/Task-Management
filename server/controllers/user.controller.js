import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ workspace: req.user.workspace }).select('-password');
  res.json({ data: users });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).select('-password');
  res.json({ user });
});
