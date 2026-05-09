import Workspace from '../models/Workspace.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getWorkspace = asyncHandler(async (req, res) => {
  const workspace = await Workspace.findById(req.user.workspace).populate('members.user', 'name email avatar role');
  res.json(workspace);
});

export const updateWorkspace = asyncHandler(async (req, res) => {
  const workspace = await Workspace.findByIdAndUpdate(req.user.workspace, req.body, { new: true, runValidators: true });
  res.json(workspace);
});
