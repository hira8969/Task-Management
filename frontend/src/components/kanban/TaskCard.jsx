import { Calendar, CheckSquare, Edit3, Eye, MessageSquare, Paperclip, Timer, Trash2, Users } from 'lucide-react';
import { priorityTone, statusColumns } from '../../constants/navigation.js';
import { cn } from '../../utils/cn.js';

const statusLabel = (status) => statusColumns.find((column) => column.key === status)?.label || 'Todo';
const checklistProgress = (items = []) => {
  if (!items.length) return null;
  return `${items.filter((item) => item.completed).length}/${items.length}`;
};

export default function TaskCard({ task, onDragStart, onView, onEdit, onDelete }) {
  const hasActions = onView || onEdit || onDelete;
  const progress = Math.max(0, Math.min(Number(task.progress) || 0, 100));
  const checklistDone = checklistProgress(task.checklist);
  const stopAction = (handler) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    handler?.(task);
  };

  return (
    <article
      draggable={Boolean(onDragStart)}
      onDragStart={(event) => onDragStart?.(event, task)}
      className="cursor-grab rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-glow active:cursor-grabbing dark:border-white/10 dark:bg-slate-900/80"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-black leading-5">{task.title}</h3>
        <span className={cn('rounded-full border px-2 py-1 text-[10px] font-black uppercase', priorityTone[task.priority || 'medium'])}>
          {task.priority || 'medium'}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-900/5 px-2 py-1 text-[10px] font-black uppercase text-slate-500 dark:bg-white/10 dark:text-slate-300">
          {statusLabel(task.status)}
        </span>
        {task.completedAt ? (
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-200">
            Done
          </span>
        ) : null}
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{task.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(task.tags || []).slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-cyan-50 px-2 py-1 text-[10px] font-bold text-cyan-700 dark:bg-cyan-950/35 dark:text-cyan-200">
            #{tag}
          </span>
        ))}
        {(task.labels || []).slice(0, 3).map((label) => (
          <span key={label.name || label} className="rounded-full bg-slate-900/5 px-2 py-1 text-[10px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">
            {label.name || label}
          </span>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
          <span>{progress}% progress</span>
          {checklistDone ? <span className="flex items-center gap-1"><CheckSquare className="h-3.5 w-3.5" /> {checklistDone}</span> : null}
        </div>
        <div className="h-2 rounded-full bg-slate-900/10 dark:bg-white/10">
          <div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
        <span className="flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5" /> {task.commentsCount || 0}
          <Paperclip className="h-3.5 w-3.5" /> {task.attachmentsCount || 0}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Timer className="h-3.5 w-3.5" /> {task.actualHours || 0}/{task.estimatedHours || 0}h</span>
        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {task.assignees?.length || 0}</span>
      </div>
      {hasActions ? (
        <div className="mt-4 flex items-center justify-end gap-1 border-t border-slate-200 pt-3 dark:border-white/10">
          {onView ? (
            <button className="focus-ring rounded-lg p-2 text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white" onClick={stopAction(onView)} aria-label={`View ${task.title}`}>
              <Eye className="h-4 w-4" />
            </button>
          ) : null}
          {onEdit ? (
            <button className="focus-ring rounded-lg p-2 text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white" onClick={stopAction(onEdit)} aria-label={`Edit ${task.title}`}>
              <Edit3 className="h-4 w-4" />
            </button>
          ) : null}
          {onDelete ? (
            <button className="focus-ring rounded-lg p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/30" onClick={stopAction(onDelete)} aria-label={`Delete ${task.title}`}>
              <Trash2 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
