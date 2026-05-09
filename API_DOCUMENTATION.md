# API Documentation

Base URL: `/api`

All protected routes require:

```http
Authorization: Bearer <accessToken>
```

## Auth

- `POST /auth/register` - Create user and workspace
- `POST /auth/login` - Login and set refresh-token cookie
- `POST /auth/refresh` - Rotate access token from secure cookie
- `POST /auth/logout` - Clear refresh cookie
- `GET /auth/me` - Current user
- `POST /auth/forgot-password` - Password reset entrypoint
- `POST /auth/reset-password` - Password reset completion entrypoint

## Tasks

- `GET /tasks?search=&status=&priority=&page=&limit=&sort=` - Paginated filtered tasks
- `POST /tasks` - Create task
- `GET /tasks/:id` - Task detail
- `PATCH /tasks/:id` - Update task
- `PATCH /tasks/:id/move` - Move task between kanban columns
- `DELETE /tasks/:id` - Delete task

## Collaboration

- `GET /comments/task/:taskId`
- `POST /comments`
- `GET /notifications`
- `PATCH /notifications/:id/read`
- `GET /workspaces/current`
- `PATCH /workspaces/current`
- `POST /uploads` with multipart field `file`

## Analytics and Admin

- `GET /dashboard/overview`
- `GET /admin/overview` owner/admin only
- `GET /users`
- `PATCH /users/me`

## Socket Events

Client joins authenticated user and workspace rooms automatically.

- `task:changed` - Invalidate task queries
- `dashboard:changed` - Refresh analytics
- `notification:new` - Show real-time notification
- `activity:typing` - Broadcast collaboration presence
