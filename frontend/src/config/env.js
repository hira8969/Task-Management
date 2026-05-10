const backendUrl = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'https://task-management-75oz.onrender.com')).replace(/\/$/, '');
const apiUrl = backendUrl.endsWith('/api') ? backendUrl : `${backendUrl}/api`;

export const env = {
  apiUrl: backendUrl ? apiUrl : '/api',
  socketUrl: import.meta.env.VITE_SOCKET_URL || backendUrl.replace(/\/api$/, '') || 'http://localhost:5000'
};
