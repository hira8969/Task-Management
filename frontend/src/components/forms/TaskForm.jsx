import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { userService } from '../../services/api.js';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

const optionalNumber = z.preprocess((value) => (value === '' || Number.isNaN(value) ? 0 : value), z.number().min(0));

const schema = z.object({
  title: z.string().min(3, 'Use at least 3 characters'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'review', 'completed']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  reminderAt: z.string().optional(),
  progress: z.preprocess((value) => (value === '' || Number.isNaN(value) ? 0 : value), z.number().min(0).max(100)),
  estimatedHours: optionalNumber,
  actualHours: optionalNumber,
  billingType: z.enum(['non-billable', 'billable']),
  recurrence: z.enum(['none', 'daily', 'weekly', 'monthly']),
  tagsText: z.string().optional(),
  assignees: z.array(z.string()).optional(),
  checklist: z.array(z.object({
    title: z.string().optional(),
    completed: z.boolean().optional()
  })).optional()
});

const toDateInputValue = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

const getDefaults = (task) => ({
  title: task?.title || '',
  description: task?.description || '',
  status: task?.status || 'todo',
  priority: task?.priority || 'medium',
  startDate: toDateInputValue(task?.startDate),
  dueDate: toDateInputValue(task?.dueDate),
  reminderAt: toDateInputValue(task?.reminderAt),
  progress: task?.progress ?? 0,
  estimatedHours: task?.estimatedHours ?? 0,
  actualHours: task?.actualHours ?? 0,
  billingType: task?.billingType || 'non-billable',
  recurrence: task?.recurrence || 'none',
  tagsText: (task?.tags || []).join(', '),
  assignees: (task?.assignees || []).map((assignee) => assignee._id || assignee),
  checklist: task?.checklist?.length ? task.checklist.map((item) => ({ title: item.title, completed: Boolean(item.completed) })) : []
});

export default function TaskForm({ task, onSubmit, isLoading, submitLabel = 'Create Task' }) {
  const { data: usersData } = useQuery({ queryKey: ['users'], queryFn: userService.list });
  const users = usersData?.data || [];
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaults(task)
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'checklist' });

  useEffect(() => {
    reset(getDefaults(task));
  }, [reset, task]);

  const submitValues = (values) => {
    const tags = values.tagsText
      ?.split(',')
      .map((tag) => tag.trim())
      .filter(Boolean) || [];
    const checklist = values.checklist
      ?.map((item) => ({ title: item.title?.trim(), completed: Boolean(item.completed) }))
      .filter((item) => item.title) || [];

    onSubmit({
      title: values.title.trim(),
      description: values.description?.trim() || '',
      status: values.status,
      priority: values.priority,
      startDate: values.startDate || null,
      dueDate: values.dueDate || null,
      reminderAt: values.reminderAt || null,
      progress: Number(values.progress) || 0,
      estimatedHours: Number(values.estimatedHours) || 0,
      actualHours: Number(values.actualHours) || 0,
      billingType: values.billingType,
      recurrence: values.recurrence,
      tags,
      assignees: values.assignees || [],
      checklist
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submitValues)}>
      <Input label="Task title" {...register('title')} error={errors.title?.message} />
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Description</span>
        <textarea className="focus-ring min-h-28 w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900/70" {...register('description')} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Status</span>
          <select className="focus-ring w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900/70" {...register('status')}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Priority</span>
          <select className="focus-ring w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900/70" {...register('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Due date" type="date" {...register('dueDate')} />
        <Input label="Start date" type="date" {...register('startDate')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Reminder date" type="date" {...register('reminderAt')} />
        <Input label="Progress %" type="number" min="0" max="100" {...register('progress', { valueAsNumber: true })} error={errors.progress?.message} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Estimated hours" type="number" min="0" step="0.25" {...register('estimatedHours', { valueAsNumber: true })} />
        <Input label="Actual hours" type="number" min="0" step="0.25" {...register('actualHours', { valueAsNumber: true })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Billing</span>
          <select className="focus-ring w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900/70" {...register('billingType')}>
            <option value="non-billable">Non-billable</option>
            <option value="billable">Billable</option>
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Repeat</span>
          <select className="focus-ring w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900/70" {...register('recurrence')}>
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
      </div>
      <Input label="Tags" placeholder="client, sprint, design" {...register('tagsText')} />
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Assignees</span>
        <select
          className="focus-ring min-h-28 w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900/70"
          multiple
          {...register('assignees')}
        >
          {users.map((user) => <option key={user._id} value={user._id}>{user.name} ({user.email})</option>)}
        </select>
      </label>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Checklist</span>
          <Button type="button" variant="secondary" icon={Plus} onClick={() => append({ title: '', completed: false })}>Add Item</Button>
        </div>
        {fields.length ? (
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                <input className="h-4 w-4 accent-cyan-500" type="checkbox" {...register(`checklist.${index}.completed`)} />
                <Input label="" placeholder="Subtask title" {...register(`checklist.${index}.title`)} />
                <button type="button" className="focus-ring rounded-lg p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" onClick={() => remove(index)} aria-label="Remove checklist item">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <Button className="w-full" isLoading={isLoading}>{submitLabel}</Button>
    </form>
  );
}
