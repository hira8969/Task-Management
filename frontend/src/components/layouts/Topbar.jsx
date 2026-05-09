import { Bell, Search } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle.jsx';
import { useAppStore } from '../../store/useAppStore.js';

export default function Topbar() {
  const user = useAppStore((state) => state.user);
  const notifications = useAppStore((state) => state.notifications);

  return (
    <header className="sticky top-0 z-30 border-b border-white/30 bg-white/60 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/55 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1540px] items-center gap-3">
        <div className="relative hidden flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="focus-ring w-full rounded-lg border border-slate-200 bg-white/70 py-2.5 pl-10 pr-4 text-sm dark:border-white/10 dark:bg-slate-900/70" placeholder="Search tasks, teammates, labels..." />
        </div>
        <button className="focus-ring relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white/75 dark:border-white/10 dark:bg-slate-900/75" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {notifications.length ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" /> : null}
        </button>
        <ThemeToggle />
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/75 px-3 py-2 dark:border-white/10 dark:bg-slate-900/75">
          <img className="h-8 w-8 rounded-lg object-cover" src={user?.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${user?.name || 'Orbit'}`} alt="" />
          <div className="hidden sm:block">
            <p className="text-sm font-black">{user?.name || 'Demo User'}</p>
            <p className="text-xs text-slate-500">{user?.role || 'member'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
