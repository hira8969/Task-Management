# Deployment Guide

## MongoDB Atlas

1. Create an Atlas cluster.
2. Create a database user.
3. Add the Render outbound IP or `0.0.0.0/0` during development.
4. Copy the connection string into `MONGO_URI`.

## Backend on Render

Create a Web Service from this repository with:

```bash
Root Directory: server
Build Command: npm install
Start Command: npm start
```

Set environment variables:

```text
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-vercel-app.vercel.app
MONGO_URI=...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
COOKIE_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Frontend on Vercel

Use:

```bash
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

Set:

```text
VITE_API_URL=https://your-render-api.onrender.com/api
VITE_SOCKET_URL=https://your-render-api.onrender.com
```

## Production Notes

- Use long random secrets for JWT and cookies.
- Keep refresh tokens in HTTP-only cookies.
- Restrict CORS to your Vercel domain.
- Configure Cloudinary upload folder policies.
- Run `npm run frontend:build` from the repository root before deploying frontend changes.
- Add CI steps for lint, build, backend smoke tests, and dependency audit.
