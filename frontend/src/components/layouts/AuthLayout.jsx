import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-mesh p-4">
      <div className="absolute inset-x-0 top-8 flex animate-marquee gap-4 whitespace-nowrap text-xs font-black uppercase tracking-[0.35em] text-slate-400/80">
        <span>Plan Ship Learn Collaborate Measure Automate</span>
        <span>Plan Ship Learn Collaborate Measure Automate</span>
      </div>
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="hidden lg:block">
          <p className="text-sm font-black uppercase tracking-[0.5em] text-cyan-500">OrbitFlow</p>
          <h1 className="mt-5 max-w-3xl text-6xl font-black leading-[0.95] text-slate-950 dark:text-white">
            Command center for teams that move fast.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Real-time tasks, analytics, workspaces, kanban, and admin controls in one polished SaaS surface.
          </p>
        </motion.div>
        <Outlet />
      </section>
    </main>
  );
}
