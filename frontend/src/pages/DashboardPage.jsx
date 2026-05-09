import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Clock3, Flame, Users2 } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';
import ActivityFeed from '../components/dashboard/ActivityFeed.jsx';
import ChartCard from '../components/dashboard/ChartCard.jsx';
import MetricCard from '../components/dashboard/MetricCard.jsx';
import { dashboardService } from '../services/api.js';

const fallback = {
  metrics: { totalTasks: 42, completedTasks: 18, overdueTasks: 3, teamMembers: 8 },
  velocity: [
    { label: 'Mon', date: '04 May', value: 12 }, { label: 'Tue', date: '05 May', value: 18 }, { label: 'Wed', date: '06 May', value: 16 },
    { label: 'Thu', date: '07 May', value: 24 }, { label: 'Fri', date: '08 May', value: 21 }, { label: 'Sat', date: '09 May', value: 10 }, { label: 'Sun', date: '10 May', value: 14 }
  ],
  activities: [
    { title: 'Roadmap board updated', description: 'Three tasks moved into review.' },
    { title: 'Design QA completed', description: 'Landing workflow signed off by product.' },
    { title: 'New member invited', description: 'A teammate joined the Growth workspace.' }
  ]
};

export default function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: dashboardService.overview });
  if (isLoading) return <LoadingScreen />;
  const overview = data || fallback;

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500">Realtime Command</p>
          <h1 className="mt-2 text-4xl font-black">Dashboard</h1>
        </div>
        <div className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-glow dark:bg-white dark:text-slate-950">Productivity score 94%</div>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total tasks" value={overview.metrics.totalTasks} delta="+12% this week" icon={Flame} />
        <MetricCard label="Completed" value={overview.metrics.completedTasks} delta="+8 shipped" icon={CheckCircle2} tone="from-emerald-400 to-lime-500" />
        <MetricCard label="Overdue" value={overview.metrics.overdueTasks} delta="Needs attention" icon={Clock3} tone="from-rose-400 to-orange-500" />
        <MetricCard label="Members" value={overview.metrics.teamMembers} delta="3 active now" icon={Users2} tone="from-fuchsia-400 to-violet-500" />
      </section>
      <section className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_.8fr]">
        <ChartCard title="Team Velocity" data={overview.velocity} />
        <ActivityFeed items={overview.activities} />
      </section>
    </PageTransition>
  );
}
