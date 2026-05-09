import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const variants = {
  primary: 'bg-slate-950 text-white shadow-glow hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950',
  secondary: 'glass-panel text-slate-800 hover:-translate-y-0.5 dark:text-slate-100',
  ghost: 'text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10',
  danger: 'bg-rose-500 text-white hover:bg-rose-600'
};

export default function Button({ children, className, variant = 'primary', isLoading, icon: Icon, ...props }) {
  return (
    <button
      className={cn(
        'focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
