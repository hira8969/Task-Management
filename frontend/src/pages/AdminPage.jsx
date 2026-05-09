import { useQuery } from '@tanstack/react-query';
import PageTransition from '../components/animations/PageTransition.jsx';
import { adminService } from '../services/api.js';

export default function AdminPage() {
  const { data } = useQuery({ queryKey: ['admin'], queryFn: adminService.overview });
  const stats = data || { users: 12, workspaces: 4, tasks: 96, notifications: 18 };

  return (
    <PageTransition>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500">System Control</p>
        <h1 className="mt-2 text-4xl font-black">Admin Panel</h1>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(stats).map(([key, value]) => (
          <article key={key} className="glass-panel rounded-xl p-6">
            <p className="text-sm font-black uppercase text-slate-500">{key}</p>
            <p className="mt-3 text-4xl font-black">{value}</p>
          </article>
        ))}
      </section>
      <section className="glass-panel mt-4 rounded-xl p-5">
        <h2 className="text-lg font-black">Operational Controls</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {['User management', 'Workspace control', 'Reports and statistics'].map((item) => (
            <button key={item} className="focus-ring rounded-lg border border-slate-200 p-4 text-left text-sm font-black hover:bg-slate-900/5 dark:border-white/10 dark:hover:bg-white/10">{item}</button>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
