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

If you are inside the `server/` directory, `npm run dev` starts the API and the frontend together.

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

For a combined production deployment, build the frontend and start the backend:

```bash
npm install
npm run build
npm start
```

The root `postinstall` script installs both `frontend/` and `server/` dependencies on a clean deployment server.

The Express backend serves the generated `frontend/dist` bundle when `NODE_ENV=production`. Frontend routes are handled by the backend fallback, so pages like `/tasks`, `/dashboard`, and `/login` work after refresh. API routes stay under `/api`, and Socket.IO uses the same deployed host.

If deploying only the `server/` folder on Render, use:

```bash
npm start
```

The server `prestart` script automatically installs frontend dependencies when needed and builds `../frontend/dist` before the backend starts. After that, the backend URL serves both the API and the frontend.

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
MONGO_URI=your-production-mongodb-uri
JWT_ACCESS_SECRET=your-strong-access-secret
JWT_REFRESH_SECRET=your-strong-refresh-secret
COOKIE_SECRET=your-strong-cookie-secret
```
# Task-Management
