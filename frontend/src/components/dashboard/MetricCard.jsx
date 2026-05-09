import { motion } from 'framer-motion';

export default function MetricCard({ label, value, delta, icon: Icon, tone = 'from-cyan-400 to-blue-500' }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="glass-panel glow-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-black">{value}</p>
        </div>
        <span className={`grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br ${tone} text-white shadow-glow`}>
          <Icon className="h-6 w-6" />
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-emerald-500">{delta}</p>
    </motion.article>
  );
}
