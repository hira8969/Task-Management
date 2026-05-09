import axios from 'axios';
import { env } from '../config/env.js';
import { useAppStore } from '../store/useAppStore.js';

export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = useAppStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original?._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${env.apiUrl}/auth/refresh`, {}, { withCredentials: true });
        useAppStore.getState().setSession(data);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        useAppStore.getState().clearSession();
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (payload) => api.post('/auth/login', payload).then((res) => res.data),
  register: (payload) => api.post('/auth/register', payload).then((res) => res.data),
  logout: () => api.post('/auth/logout').then((res) => res.data),
  me: () => api.get('/auth/me').then((res) => res.data)
};

export const taskService = {
  list: (params) => api.get('/tasks', { params }).then((res) => res.data),
  create: (payload) => api.post('/tasks', payload).then((res) => res.data),
  update: (id, payload) => api.patch(`/tasks/${id}`, payload).then((res) => res.data),
  remove: (id) => api.delete(`/tasks/${id}`).then((res) => res.data),
  move: (id, payload) => api.patch(`/tasks/${id}/move`, payload).then((res) => res.data)
};

export const dashboardService = {
  overview: () => api.get('/dashboard/overview').then((res) => res.data)
};

export const adminService = {
  overview: () => api.get('/admin/overview').then((res) => res.data)
};
