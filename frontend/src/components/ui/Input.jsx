import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

const Input = forwardRef(function Input({ label, error, className, ...props }, ref) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</span> : null}
      <input
        ref={ref}
        className={cn(
          'focus-ring w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 dark:border-white/10 dark:bg-slate-900/70 dark:text-white',
          error && 'border-rose-400',
          className
        )}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-rose-500">{error}</span> : null}
    </label>
  );
});

export default Input;
