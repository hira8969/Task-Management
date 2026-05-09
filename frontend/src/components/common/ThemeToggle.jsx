import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';

export default function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const isDark = theme === 'dark';

  return (
    <button
      className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white/75 shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/75"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5 text-amber-300" /> : <Moon className="h-5 w-5 text-slate-700" />}
    </button>
  );
}
