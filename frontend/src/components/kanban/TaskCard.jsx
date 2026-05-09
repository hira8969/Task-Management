import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { priorityTone } from '../../constants/navigation.js';
import { cn } from '../../utils/cn.js';

export default function TaskCard({ task, onDragStart }) {
  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, task)}
      className="cursor-grab rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-glow active:cursor-grabbing dark:border-white/10 dark:bg-slate-900/80"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-black leading-5">{task.title}</h3>
        <span className={cn('rounded-full border px-2 py-1 text-[10px] font-black uppercase', priorityTone[task.priority || 'medium'])}>
          {task.priority || 'medium'}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{task.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(task.labels || []).slice(0, 3).map((label) => (
          <span key={label.name || label} className="rounded-full bg-slate-900/5 px-2 py-1 text-[10px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">
            {label.name || label}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
        <span className="flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5" /> {task.commentsCount || 0}
          <Paperclip className="h-3.5 w-3.5" /> {task.attachmentsCount || 0}
        </span>
      </div>
    </article>
  );
}
