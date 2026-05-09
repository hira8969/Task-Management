import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import PageTransition from '../components/animations/PageTransition.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';
import TaskForm from '../components/forms/TaskForm.jsx';
import TaskCard from '../components/kanban/TaskCard.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import { taskService } from '../services/api.js';

export default function TasksPage() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks', 'list'], queryFn: () => taskService.list({ limit: 60 }) });
  const createTask = useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      toast.success('Task created');
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return (
    <PageTransition>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500">Work Queue</p>
          <h1 className="mt-2 text-4xl font-black">Tasks</h1>
        </div>
        <Button icon={Plus} onClick={() => setOpen(true)}>New Task</Button>
      </div>
      {isLoading ? <LoadingScreen /> : isError ? (
        <EmptyState
          title="Tasks load nahi ho paaye"
          description={error?.response?.data?.message || 'Backend server aur MongoDB connection check karo, phir page refresh karo.'}
        />
      ) : (data?.data || []).length === 0 ? (
        <EmptyState
          title="Abhi koi task nahi hai"
          description="Naya workspace empty ho sakta hai. Ek task create karo, phir woh Tasks aur Kanban dono screens par dikhne lagega."
          actionLabel="Create Task"
          onAction={() => setOpen(true)}
        />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(data?.data || []).map((task) => <TaskCard key={task._id} task={task} onDragStart={() => null} />)}
        </section>
      )}
      <Modal open={open} title="Create Task" onClose={() => setOpen(false)}>
        <TaskForm onSubmit={(values) => createTask.mutate(values)} isLoading={createTask.isPending} />
      </Modal>
    </PageTransition>
  );
}
