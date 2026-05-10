# OrbitFlow Task Manager

Enterprise-grade full-stack task management app built with React, Vite, Tailwind CSS, Framer Motion, GSAP, TanStack Query, Zustand, Express, MongoDB, Mongoose, JWT auth, secure cookies, Cloudinary-ready uploads, and Socket.IO.

## Features

- JWT access tokens with refresh-token cookies
- MVC Express backend with controllers, models, routes, middleware, services, validators, helpers, sockets, constants, logs, and uploads
- Workspace-aware tasks, comments, labels, categories, attachments, activities, notifications, users, teams, and admin analytics
- Real-time task updates and notifications through Socket.IO rooms
- Responsive premium SaaS UI with glass panels, aurora backgrounds, dark/light persistence, Framer Motion transitions, GSAP reveal animations, skeleton-style loading, and optimistic kanban movement
- Dashboard analytics, task list, drag/drop kanban, calendar, profile, admin dashboard, custom 404, error boundary, PWA setup, API caching, and code splitting-friendly routing

## Quick Start

```bash
npm --prefix frontend install
npm --prefix server install
```

Create environment files from `frontend/.env.example` and `server/.env.example`.

```bash
npm run dev
```

This starts the backend on `http://localhost:5000` and the frontend on `http://localhost:5173` together.

`npm run backend:dev` also starts both apps. Use `npm run backend:only` only when you need the API server without the Vite frontend.

If you are inside the `server/` directory, `npm run dev` starts only the API server. Use `npm run dev:full` there only for local full-stack development.

Seed local MongoDB or Atlas:

```bash
npm run backend:seed
```

Demo credentials after seeding:

```text
demo@orbitflow.app
Password123!
```

## Project Structure

```text
frontend/
  src/
  components/ common ui animations dashboard forms modals kanban layouts
  pages/ routes/ hooks/ services/ store/ context/ utils/ constants/ config/ assets/ styles/
server/
  config/ controllers/ models/ routes/ middleware/ services/ utils/ validators/ helpers/
  sockets/ uploads/ logs/ constants/ app.js server.js
```

## Scripts

Frontend:

```bash
npm run dev
npm run frontend:dev
npm run frontend:build
npm run frontend:preview
```

Backend:

```bash
npm run backend:dev
npm run backend:only
npm run backend:start
npm run backend:seed
```

## Frontend and Backend Integration

During development, the frontend runs on `http://localhost:5173` and proxies `/api` requests to `http://localhost:5000`. Socket.IO connects through `VITE_SOCKET_URL`, which defaults to the backend server.

Production is split by platform: Vercel serves the frontend, and Render serves the backend API.

Render backend settings:

```text
Root Directory: server
Build Command: npm install
Start Command: npm start
```

If Render is still configured with `npm run dev`, change it to `npm start`. The backend `dev` script is backend-only now, but production should still use `start`.

Vercel frontend env:

```text
VITE_API_URL=https://task-management-75oz.onrender.com/api
VITE_SOCKET_URL=https://task-management-75oz.onrender.com
```

Render backend root (`/`) redirects to the Vercel frontend. API routes stay under `/api`.

Use these local env values:

```text
frontend/.env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

server/.env
CLIENT_URL=http://localhost:5173
PORT=5000
MONGO_URI=your-mongodb-uri
```

In production, set:

```text
NODE_ENV=production
PORT=your-platform-port
CLIENT_URL=https://task-management-fawn-three.vercel.app
CLIENT_URLS=https://task-management-fawn-three.vercel.app,https://task-management-jnzoak7lr-hira8969s-projects.vercel.app
MONGO_URI=your-production-mongodb-uri
JWT_ACCESS_SECRET=your-strong-access-secret
JWT_REFRESH_SECRET=your-strong-refresh-secret
COOKIE_SECRET=your-strong-cookie-secret
```
# Task-Management
