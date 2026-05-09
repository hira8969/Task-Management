import dotenv from 'dotenv';
import { connectDatabase } from '../config/database.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import Workspace from '../models/Workspace.js';

dotenv.config();
await connectDatabase();
await Promise.all([User.deleteMany({}), Workspace.deleteMany({}), Task.deleteMany({})]);

const user = await User.create({ name: 'Demo User', email: 'demo@orbitflow.app', password: 'Password123!', role: 'owner', isEmailVerified: true });
const workspace = await Workspace.create({ name: 'OrbitFlow Demo', slug: `orbitflow-demo-${Date.now()}`, owner: user._id, members: [{ user: user._id, role: 'owner' }] });
user.workspace = workspace._id;
await user.save();

await Task.insertMany([
  { title: 'Design dashboard analytics', description: 'Ship polished executive metrics.', priority: 'high', status: 'todo', workspace: workspace._id, createdBy: user._id, dueDate: new Date() },
  { title: 'Implement socket events', description: 'Broadcast task moves and notifications.', priority: 'urgent', status: 'in-progress', workspace: workspace._id, createdBy: user._id },
  { title: 'Finalize deployment docs', description: 'Vercel, Render, Atlas and Cloudinary.', priority: 'medium', status: 'review', workspace: workspace._id, createdBy: user._id },
  { title: 'Accessibility QA', description: 'Keyboard and color contrast pass.', priority: 'medium', status: 'completed', workspace: workspace._id, createdBy: user._id, completedAt: new Date() }
]);

console.log('Seeded demo@orbitflow.app / Password123!');
process.exit(0);
