import Activity from '../models/Activity.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const overview = asyncHandler(async (req, res) => {
  const [totalTasks, completedTasks, overdueTasks, teamMembers, activities] = await Promise.all([
    Task.countDocuments({ workspace: req.user.workspace }),
    Task.countDocuments({ workspace: req.user.workspace, status: 'completed' }),
    Task.countDocuments({ workspace: req.user.workspace, dueDate: { $lt: new Date() }, status: { $ne: 'completed' } }),
    User.countDocuments({ workspace: req.user.workspace, isActive: true }),
    Activity.find({ workspace: req.user.workspace }).sort('-createdAt').limit(8)
  ]);
  res.json({
    metrics: { totalTasks, completedTasks, overdueTasks, teamMembers },
    velocity: [
      { label: 'Mon', value: 8 }, { label: 'Tue', value: 14 }, { label: 'Wed', value: 11 },
      { label: 'Thu', value: 21 }, { label: 'Fri', value: 18 }, { label: 'Sat', value: 9 }, { label: 'Sun', value: 12 }
    ],
    activities
  });
});
