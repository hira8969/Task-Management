import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSocket } from '../services/socket.js';
import { useAppStore } from '../store/useAppStore.js';

export function useSocket() {
  const token = useAppStore((state) => state.accessToken);
  const pushNotification = useAppStore((state) => state.pushNotification);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return undefined;
    const socket = getSocket();
    socket.auth = { token };
    socket.connect();
    socket.on('task:changed', (payload) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (payload?.action) toast(`Task ${payload.action}`);
    });
    socket.on('dashboard:changed', () => queryClient.invalidateQueries({ queryKey: ['dashboard'] }));
    socket.on('notification:new', (notification) => {
      pushNotification(notification);
      toast(notification.title);
    });
    return () => {
      socket.off('task:changed');
      socket.off('dashboard:changed');
      socket.off('notification:new');
      socket.disconnect();
    };
  }, [pushNotification, queryClient, token]);
}
