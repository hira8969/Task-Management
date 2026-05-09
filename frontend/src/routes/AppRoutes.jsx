import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';
import AppLayout from '../components/layouts/AppLayout.jsx';
import AuthLayout from '../components/layouts/AuthLayout.jsx';
import AdminPage from '../pages/AdminPage.jsx';
import CalendarPage from '../pages/CalendarPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import KanbanPage from '../pages/KanbanPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import TasksPage from '../pages/TasksPage.jsx';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
