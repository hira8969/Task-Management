import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

const schema = z.object({
  title: z.string().min(3, 'Use at least 3 characters'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  dueDate: z.string().optional()
});

export default function TaskForm({ onSubmit, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { priority: 'medium' }
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Task title" {...register('title')} error={errors.title?.message} />
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Description</span>
        <textarea className="focus-ring min-h-28 w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900/70" {...register('description')} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Priority</span>
          <select className="focus-ring w-full rounded-lg border border-slate-200 bg-white/75 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900/70" {...register('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
        <Input label="Due date" type="date" {...register('dueDate')} />
      </div>
      <Button className="w-full" isLoading={isLoading}>Create Task</Button>
    </form>
  );
}
