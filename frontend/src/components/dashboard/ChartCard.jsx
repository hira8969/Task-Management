export default function ChartCard({ title, data = [] }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <section className="glass-panel rounded-xl p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-black">{title}</h2>
        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-500">Live</span>
      </div>
      <div className="flex h-64 items-end gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
            <div className="relative w-full overflow-hidden rounded-t-lg bg-slate-200/70 dark:bg-white/10" style={{ height: `${Math.max(12, (item.value / max) * 100)}%` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-400 via-fuchsia-400 to-lime-300" />
            </div>
            <span className="text-xs font-bold text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
