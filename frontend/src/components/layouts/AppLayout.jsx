import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import { useSocket } from '../../hooks/useSocket.js';

export default function AppLayout() {
  useSocket();
  return (
    <div className="min-h-screen bg-mesh text-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar />
          <main className="mx-auto w-full max-w-[1540px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
