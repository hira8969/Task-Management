import Activity from '../models/Activity.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const startOfDay = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const buildLastSevenDays = () => {
  const today = startOfDay(new Date());
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    return {
      date,
      nextDate,
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dateLabel: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    };
  });
};

export const overview = asyncHandler(async (req, res) => {
  const days = buildLastSevenDays();
  const [totalTasks, completedTasks, overdueTasks, teamMembers, activities] = await Promise.all([
    Task.countDocuments({ workspace: req.user.workspace }),
    Task.countDocuments({ workspace: req.user.workspace, status: 'completed' }),
    Task.countDocuments({ workspace: req.user.workspace, dueDate: { $lt: new Date() }, status: { $ne: 'completed' } }),
    User.countDocuments({ workspace: req.user.workspace, isActive: true }),
    Activity.find({ workspace: req.user.workspace }).sort('-createdAt').limit(8)
  ]);
  const velocityCounts = await Promise.all(
    days.map((day) => Task.countDocuments({
      workspace: req.user.workspace,
      status: 'completed',
      completedAt: { $gte: day.date, $lt: day.nextDate }
    }))
  );
  const velocity = days.map((day, index) => ({
    label: day.label,
    date: day.dateLabel,
    value: velocityCounts[index]
  }));

  res.json({
    metrics: { totalTasks, completedTasks, overdueTasks, teamMembers },
    velocity,
    activities
  });
});
