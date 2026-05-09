import { BarChart3, CalendarDays, KanbanSquare, ShieldCheck, Sparkles, UserCircle2 } from 'lucide-react';

export const navigationItems = [
  { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { label: 'Tasks', href: '/tasks', icon: Sparkles },
  { label: 'Kanban', href: '/kanban', icon: KanbanSquare },
  { label: 'Calendar', href: '/calendar', icon: CalendarDays },
  { label: 'Admin', href: '/admin', icon: ShieldCheck },
  { label: 'Profile', href: '/profile', icon: UserCircle2 }
];

export const statusColumns = [
  { key: 'todo', label: 'Todo', color: 'bg-sky-400' },
  { key: 'in-progress', label: 'In Progress', color: 'bg-amber-400' },
  { key: 'review', label: 'Review', color: 'bg-fuchsia-400' },
  { key: 'completed', label: 'Completed', color: 'bg-emerald-400' }
];

export const priorityTone = {
  low: 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-200',
  medium: 'border-cyan-300 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/35 dark:text-cyan-200',
  high: 'border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-200',
  urgent: 'border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/35 dark:text-rose-200'
};
