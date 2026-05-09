import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { refreshSession } from '../services/api.js';
import { getSocket } from '../services/socket.js';
import { useAppStore } from '../store/useAppStore.js';

export function useSocket() {
  const token = useAppStore((state) => state.accessToken);
  const pushNotification = useAppStore((state) => state.pushNotification);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return undefined;
    let didRetryAuth = false;
    const socket = getSocket();

    const syncAuthToken = () => {
      socket.auth = { token: useAppStore.getState().accessToken };
    };

    const handleConnectError = async (error) => {
      const code = error?.data?.code;
      const canRefresh = code === 'TOKEN_EXPIRED' || code === 'INVALID_TOKEN' || error?.message === 'Access token expired';
      if (!canRefresh || didRetryAuth) return;
      didRetryAuth = true;
      try {
        const session = await refreshSession();
        socket.auth = { token: session.accessToken };
        socket.connect();
      } catch {
        toast.error('Session expired. Please sign in again.');
      }
    };

    syncAuthToken();
    socket.connect();
    socket.on('connect', () => {
      didRetryAuth = false;
    });
    socket.on('connect_error', handleConnectError);
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
      socket.off('connect');
      socket.off('connect_error', handleConnectError);
      socket.off('task:changed');
      socket.off('dashboard:changed');
      socket.off('notification:new');
      socket.disconnect();
    };
  }, [pushNotification, queryClient, token]);
}
