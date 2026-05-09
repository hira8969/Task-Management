import { io } from 'socket.io-client';
import { env } from '../config/env.js';
import { useAppStore } from '../store/useAppStore.js';

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(env.socketUrl, {
      autoConnect: false,
      withCredentials: true,
      auth: { token: useAppStore.getState().accessToken }
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (!socket) return;
  socket.removeAllListeners();
  socket.disconnect();
}
