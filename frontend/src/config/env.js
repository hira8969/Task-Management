export const env = {
  apiUrl: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'https://task-management-75oz.onrender.com/api'),
  socketUrl: import.meta.env.VITE_SOCKET_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://task-management-75oz.onrender.com')
};
