import Notification from '../models/Notification.js';
import { getIO } from '../sockets/index.js';

export async function createNotification(payload) {
  const notification = await Notification.create(payload);
  getIO()?.to(`user:${payload.recipient}`).emit('notification:new', notification);
  return notification;
}
