import Activity from '../models/Activity.js';

export async function logActivity({ title, description, actor, task, workspace, type = 'system', metadata = {} }) {
  return Activity.create({ title, description, actor, task, workspace, type, metadata });
}
