const backendUrl = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'https://task-management-75oz.onrender.com')).replace(/\/$/, '');

export const env = {
  apiUrl: backendUrl ? `${backendUrl}/api` : '/api',
  socketUrl: import.meta.env.VITE_SOCKET_URL || backendUrl || 'http://localhost:5000'
};
