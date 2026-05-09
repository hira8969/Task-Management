import Activity from '../models/Activity.js';
import Notification from '../models/Notification.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import Workspace from '../models/Workspace.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const adminOverview = asyncHandler(async (_req, res) => {
  const [users, workspaces, tasks, notifications, activities] = await Promise.all([
    User.countDocuments(),
    Workspace.countDocuments(),
    Task.countDocuments(),
    Notification.countDocuments(),
    Activity.countDocuments()
  ]);
  res.json({ users, workspaces, tasks, notifications, activities });
});
