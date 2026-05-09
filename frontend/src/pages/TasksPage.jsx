import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, Clock3, Filter, Plus, Search, Timer, Trash2, Users2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import PageTransition from '../components/animations/PageTransition.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';
import TaskForm from '../components/forms/TaskForm.jsx';
import TaskCard from '../components/kanban/TaskCard.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import { priorityTone, statusColumns } from '../constants/navigation.js';
import { taskService } from '../services/api.js';
import { cn } from '../utils/cn.js';

const priorities = ['low', 'medium', 'high', 'urgent'];

const emptyFilters = {
  search: '',
  status: 'all',
  priority: 'all'
};

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : 'No date');
const checklistCount = (task) => `${task.checklist?.filter((item) => item.completed).length || 0}/${task.checklist?.length || 0}`;

export default function TasksPage() {
  const [filters, setFilters] = useState(emptyFilters);
  const [modal, setModal] = useState({ type: null, task: null });
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks', 'list'], queryFn: () => taskService.list({ limit: 100 }) });

  const tasks = data?.data || [];
  const filteredTasks = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch = !search || [task.title, task.description].some((value) => value?.toLowerCase().includes(search));
      const matchesTag = !search || task.tags?.some((tag) => tag.toLowerCase().includes(search));
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      return (matchesSearch || matchesTag) && matchesStatus && matchesPriority;
    });
  }, [filters, tasks]);

  const summary = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'completed').length,
    overdue: tasks.filter((task) => task.dueDate && task.status !== 'completed' && new Date(task.dueDate) < new Date()).length,
    billableHours: tasks.reduce((sum, task) => sum + (task.billingType === 'billable' ? Number(task.estimatedHours) || 0 : 0), 0)
  }), [tasks]);

  const closeModal = () => setModal({ type: null, task: null });

  const createTask = useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      toast.success('Task created');
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (mutationError) => toast.error(mutationError?.response?.data?.message || 'Could not create task')
  });

  const updateTask = useMutation({
    mutationFn: ({ id, values }) => taskService.update(id, values),
    onSuccess: () => {
      toast.success('Task updated');
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (mutationError) => toast.error(mutationError?.response?.data?.message || 'Could not update task')
  });

  const deleteTask = useMutation({
    mutationFn: taskService.remove,
    onSuccess: () => {
      toast.success('Task deleted');
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (mutationError) => toast.error(mutationError?.response?.data?.message || 'Could not delete task')
  });

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500">Work Queue</p>
          <h1 className="mt-2 text-4xl font-black">Tasks</h1>
        </div>
        <Button icon={Plus} onClick={() => setModal({ type: 'create', task: null })}>New Task</Button>
      </div>

      <section className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="glass-panel rounded-lg p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Total Tasks</p>
          <p className="mt-2 text-3xl font-black">{summary.total}</p>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Completed</p>
          <p className="mt-2 text-3xl font-black">{summary.completed}</p>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500"><Clock3 className="h-4 w-4 text-rose-500" /> Overdue</p>
          <p className="mt-2 text-3xl font-black">{summary.overdue}</p>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500"><Timer className="h-4 w-4 text-cyan-500" /> Billable Est.</p>
          <p className="mt-2 text-3xl font-black">{summary.billableHours}h</p>
        </div>
      </section>

      <section className="mb-5 grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
        <label className="focus-within:shadow-glow flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 text-sm dark:border-white/10 dark:bg-slate-900/70">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            className="w-full bg-transparent outline-none"
            value={filters.search}
            onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
            placeholder="Search tasks"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 text-sm dark:border-white/10 dark:bg-slate-900/70">
          <Filter className="h-4 w-4 text-slate-400" />
          <select className="w-full bg-transparent py-3 outline-none" value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
            <option value="all">All status</option>
            {statusColumns.map((status) => <option key={status.key} value={status.key}>{status.label}</option>)}
          </select>
        </label>
        <select
          className="focus-ring min-h-11 rounded-lg border border-slate-200 bg-white/80 px-3 text-sm dark:border-white/10 dark:bg-slate-900/70"
          value={filters.priority}
          onChange={(event) => setFilters((current) => ({ ...current, priority: event.target.value }))}
        >
          <option value="all">All priority</option>
          {priorities.map((priority) => <option key={priority} value={priority}>{priority[0].toUpperCase() + priority.slice(1)}</option>)}
        </select>
        <Button variant="secondary" onClick={() => setFilters(emptyFilters)}>Reset</Button>
      </section>

      {isLoading ? <LoadingScreen /> : isError ? (
        <EmptyState
          title="Tasks load nahi ho paaye"
          description={error?.response?.data?.message || 'Backend server aur MongoDB connection check karo, phir page refresh karo.'}
        />
      ) : tasks.length === 0 ? (
        <EmptyState
          title="Abhi koi task nahi hai"
          description="Naya workspace empty ho sakta hai. Ek task create karo, phir woh Tasks aur Kanban dono screens par dikhne lagega."
          actionLabel="Create Task"
          onAction={() => setModal({ type: 'create', task: null })}
        />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          title="No matching tasks"
          description="Search ya filters ko thoda broad karo. Tasks yahin hain, bas current view me match nahi kar rahe."
          actionLabel="Clear Filters"
          onAction={() => setFilters(emptyFilters)}
        />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onView={(selectedTask) => setModal({ type: 'view', task: selectedTask })}
              onEdit={(selectedTask) => setModal({ type: 'edit', task: selectedTask })}
              onDelete={(selectedTask) => setModal({ type: 'delete', task: selectedTask })}
            />
          ))}
        </section>
      )}

      <Modal open={modal.type === 'create'} title="Create Task" onClose={closeModal}>
        <TaskForm onSubmit={(values) => createTask.mutate(values)} isLoading={createTask.isPending} submitLabel="Create Task" />
      </Modal>

      <Modal open={modal.type === 'edit'} title="Update Task" onClose={closeModal}>
        <TaskForm
          task={modal.task}
          onSubmit={(values) => updateTask.mutate({ id: modal.task._id, values })}
          isLoading={updateTask.isPending}
          submitLabel="Save Changes"
        />
      </Modal>

      <Modal open={modal.type === 'view'} title="Task Details" onClose={closeModal}>
        {modal.task ? (
          <div className="space-y-5">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-900/5 px-2 py-1 text-[10px] font-black uppercase text-slate-500 dark:bg-white/10 dark:text-slate-300">
                  {statusColumns.find((status) => status.key === modal.task.status)?.label || 'Todo'}
                </span>
                <span className={cn('rounded-full border px-2 py-1 text-[10px] font-black uppercase', priorityTone[modal.task.priority || 'medium'])}>
                  {modal.task.priority || 'medium'}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-black">{modal.task.title}</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-500">{modal.task.description || 'No description added.'}</p>
            </div>
            <dl className="grid gap-3 rounded-lg border border-slate-200 p-4 text-sm dark:border-white/10 sm:grid-cols-2">
              <div>
                <dt className="font-black text-slate-500">Start date</dt>
                <dd className="mt-1">{formatDate(modal.task.startDate)}</dd>
              </div>
              <div>
                <dt className="font-black text-slate-500">Due date</dt>
                <dd className="mt-1">{formatDate(modal.task.dueDate)}</dd>
              </div>
              <div>
                <dt className="font-black text-slate-500">Completed at</dt>
                <dd className="mt-1">{formatDate(modal.task.completedAt)}</dd>
              </div>
              <div>
                <dt className="font-black text-slate-500">Reminder</dt>
                <dd className="mt-1">{formatDate(modal.task.reminderAt)}</dd>
              </div>
              <div>
                <dt className="font-black text-slate-500">Time</dt>
                <dd className="mt-1">{modal.task.actualHours || 0}/{modal.task.estimatedHours || 0}h</dd>
              </div>
              <div>
                <dt className="font-black text-slate-500">Checklist</dt>
                <dd className="mt-1">{checklistCount(modal.task)}</dd>
              </div>
            </dl>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black uppercase text-slate-500">
                <span>Progress</span>
                <span>{modal.task.progress || 0}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900/10 dark:bg-white/10">
                <div className="h-full rounded-full bg-cyan-500" style={{ width: `${Math.max(0, Math.min(modal.task.progress || 0, 100))}%` }} />
              </div>
            </div>
            {modal.task.assignees?.length ? (
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-black"><Users2 className="h-4 w-4" /> Assignees</h4>
                <div className="flex flex-wrap gap-2">
                  {modal.task.assignees.map((user) => (
                    <span key={user._id || user} className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
                      {user.name || user.email || user}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {modal.task.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {modal.task.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-950/35 dark:text-cyan-200">#{tag}</span>
                ))}
              </div>
            ) : null}
            {modal.task.checklist?.length ? (
              <div className="space-y-2">
                <h4 className="text-sm font-black">Checklist</h4>
                {modal.task.checklist.map((item) => (
                  <div key={item._id || item.title} className="flex items-center gap-2 text-sm">
                    <span className={cn('h-2.5 w-2.5 rounded-full', item.completed ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600')} />
                    <span className={cn(item.completed && 'text-slate-400 line-through')}>{item.title}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="secondary" onClick={() => setModal({ type: 'edit', task: modal.task })}>Edit</Button>
              <Button variant="danger" icon={Trash2} onClick={() => setModal({ type: 'delete', task: modal.task })}>Delete</Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal open={modal.type === 'delete'} title="Delete Task" onClose={closeModal}>
        <div className="space-y-4">
          <p className="text-sm leading-6 text-slate-500">
            Delete <span className="font-black text-slate-900 dark:text-white">{modal.task?.title}</span>? This removes the task from Tasks, Kanban, and dashboard counts.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="danger" icon={Trash2} isLoading={deleteTask.isPending} onClick={() => deleteTask.mutate(modal.task._id)}>Delete Task</Button>
          </div>
        </div>
      </Modal>
    </PageTransition>
  );
}
