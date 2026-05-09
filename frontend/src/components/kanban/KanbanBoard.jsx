import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { statusColumns } from '../../constants/navigation.js';
import { taskService } from '../../services/api.js';
import EmptyState from '../common/EmptyState.jsx';
import LoadingScreen from '../common/LoadingScreen.jsx';
import TaskCard from './TaskCard.jsx';

export default function KanbanBoard() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks', 'kanban'], queryFn: () => taskService.list({ limit: 100 }) });
  const moveTask = useMutation({
    mutationFn: ({ id, status }) => taskService.move(id, { status }),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previous = queryClient.getQueryData(['tasks', 'kanban']);
      queryClient.setQueryData(['tasks', 'kanban'], (old) => ({
        ...old,
        data: old.data.map((task) => (task._id === id ? { ...task, status } : task))
      }));
      return { previous };
    },
    onError: (_error, _vars, context) => {
      queryClient.setQueryData(['tasks', 'kanban'], context.previous);
      toast.error('Could not move task');
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  if (isLoading) return <LoadingScreen />;
  const tasks = data?.data || [];
  if (isError) {
    return (
      <EmptyState
        title="Kanban tasks load nahi ho paaye"
        description={error?.response?.data?.message || 'Backend server aur MongoDB connection check karo, phir page refresh karo.'}
      />
    );
  }
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="Kanban board empty hai"
        description="Tasks page se ek task create karo. Status ke hisaab se woh yahan Todo, In Progress, Review ya Completed column me dikhega."
      />
    );
  }

  const onDragStart = (event, task) => event.dataTransfer.setData('taskId', task._id);
  const onDrop = (event, status) => {
    const id = event.dataTransfer.getData('taskId');
    if (id) moveTask.mutate({ id, status });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {statusColumns.map((column) => (
        <section
          key={column.key}
          className="glass-panel min-h-[68vh] rounded-xl p-4"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => onDrop(event, column.key)}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide">
              <span className={`h-3 w-3 rounded-full ${column.color}`} />
              {column.label}
            </h2>
            <span className="rounded-full bg-slate-900/5 px-2 py-1 text-xs font-black dark:bg-white/10">
              {tasks.filter((task) => task.status === column.key).length}
            </span>
          </div>
          <div className="space-y-3">
            {tasks.filter((task) => task.status === column.key).map((task) => (
              <TaskCard key={task._id} task={task} onDragStart={onDragStart} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
