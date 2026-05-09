export default function ChartCard({ title, data = [] }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const lowest = data.reduce((low, item) => (item.value < low.value ? item : low), data[0] || { value: 0 });

  return (
    <section className="glass-panel rounded-xl p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black">{title}</h2>
          <p className="mt-1 text-xs font-bold text-slate-500">
            Lowest work: {lowest.date || lowest.label} ({lowest.value} tasks)
          </p>
        </div>
        <span className="w-fit rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-500">Live</span>
      </div>
      <div className="flex h-64 items-end gap-3">
        {data.map((item) => (
          <div key={`${item.label}-${item.date}`} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
            <span className="text-xs font-black text-slate-600 dark:text-slate-300">{item.value}</span>
            <div className="relative w-full overflow-hidden rounded-t-lg bg-slate-200/70 dark:bg-white/10" style={{ height: `${Math.max(12, (item.value / max) * 100)}%` }}>
              <div className={`absolute inset-0 ${item === lowest ? 'bg-gradient-to-t from-rose-400 via-amber-300 to-cyan-300' : 'bg-gradient-to-t from-cyan-400 via-fuchsia-400 to-lime-300'}`} />
            </div>
            <div className="text-center leading-tight">
              <p className="text-xs font-bold text-slate-500">{item.label}</p>
              <p className="text-[11px] font-black text-slate-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
