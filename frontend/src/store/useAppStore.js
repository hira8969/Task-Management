import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      theme: 'dark',
      sidebarOpen: true,
      notifications: [],
      setSession: ({ user, accessToken }) => set({ user, accessToken }),
      clearSession: () => set({ user: null, accessToken: null }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      pushNotification: (notification) =>
        set((state) => ({ notifications: [notification, ...state.notifications].slice(0, 30) }))
    }),
    {
      name: 'orbitflow-app',
      partialize: ({ user, accessToken, theme, sidebarOpen }) => ({ user, accessToken, theme, sidebarOpen })
    }
  )
);
