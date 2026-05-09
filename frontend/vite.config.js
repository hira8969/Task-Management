import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'OrbitFlow Task Manager',
        short_name: 'OrbitFlow',
        theme_color: '#0f172a',
        background_color: '#020617',
        display: 'standalone',
        icons: []
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache' }
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'gsap'],
          query: ['@tanstack/react-query', 'axios', 'zustand'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          realtime: ['socket.io-client']
        }
      }
    }
  }
});
