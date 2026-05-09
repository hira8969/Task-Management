import { useQuery } from '@tanstack/react-query';
import PageTransition from '../components/animations/PageTransition.jsx';
import { taskService } from '../services/api.js';

export default function CalendarPage() {
  const { data } = useQuery({ queryKey: ['tasks', 'calendar'], queryFn: () => taskService.list({ limit: 100, sort: 'dueDate' }) });
  const tasks = data?.data || [];
  return (
    <PageTransition>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500">Deadlines</p>
        <h1 className="mt-2 text-4xl font-black">Calendar</h1>
      </div>
      <section className="grid gap-4 lg:grid-cols-7">
        {Array.from({ length: 14 }).map((_, index) => {
          const day = new Date();
          day.setDate(day.getDate() + index);
          const dayTasks = tasks.filter((task) => task.dueDate && new Date(task.dueDate).toDateString() === day.toDateString());
          return (
            <article key={day.toISOString()} className="glass-panel min-h-40 rounded-xl p-4">
              <p className="text-xs font-black uppercase text-slate-500">{day.toLocaleDateString(undefined, { weekday: 'short' })}</p>
              <p className="mt-1 text-2xl font-black">{day.getDate()}</p>
              <div className="mt-4 space-y-2">
                {dayTasks.map((task) => <p key={task._id} className="rounded-lg bg-cyan-400/10 px-2 py-1 text-xs font-bold text-cyan-600">{task.title}</p>)}
              </div>
            </article>
          );
        })}
      </section>
    </PageTransition>
  );
}
