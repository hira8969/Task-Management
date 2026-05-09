import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Menu, Orbit } from 'lucide-react';
import { navigationItems } from '../../constants/navigation.js';
import { authService } from '../../services/api.js';
import { useAppStore } from '../../store/useAppStore.js';
import { cn } from '../../utils/cn.js';

export default function Sidebar() {
  const open = useAppStore((state) => state.sidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const clearSession = useAppStore((state) => state.clearSession);

  const logout = async () => {
    await authService.logout().catch(() => null);
    clearSession();
  };

  return (
    <motion.aside className="sticky top-0 hidden h-screen shrink-0 p-3 md:block" animate={{ width: open ? 280 : 92 }}>
      <div className="glass-panel flex h-full flex-col rounded-xl p-3">
        <div className="flex items-center justify-between gap-2 px-2 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-cyan-300 dark:bg-white dark:text-slate-950">
              <Orbit className="h-5 w-5" />
            </span>
            {open ? <span className="text-lg font-black">OrbitFlow</span> : null}
          </div>
          <button className="focus-ring rounded-lg p-2 hover:bg-slate-900/10 dark:hover:bg-white/10" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-5 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold transition',
                  isActive ? 'bg-slate-950 text-white shadow-glow dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10'
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {open ? item.label : null}
            </NavLink>
          ))}
        </nav>
        <button className="mt-auto flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-rose-500 hover:bg-rose-500/10" onClick={logout}>
          <LogOut className="h-5 w-5" />
          {open ? 'Logout' : null}
        </button>
      </div>
    </motion.aside>
  );
}
