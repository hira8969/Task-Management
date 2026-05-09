import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { logger } from '../utils/logger.js';

let io;

export function initializeSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: env.clientUrl, credentials: true }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      const payload = jwt.verify(token, env.jwtAccessSecret);
      const user = await User.findById(payload.sub);
      if (!user) return next(new Error('Unauthorized'));
      socket.user = user;
      next();
    } catch (error) {
      next(error);
    }
  });

  io.on('connection', (socket) => {
    socket.join(`user:${socket.user._id}`);
    socket.join(`workspace:${socket.user.workspace}`);
    socket.on('activity:typing', (payload) => socket.to(`workspace:${socket.user.workspace}`).emit('activity:typing', payload));
    socket.on('disconnect', () => logger.info(`socket disconnected ${socket.id}`));
  });

  return io;
}

export function getIO() {
  return io;
}
