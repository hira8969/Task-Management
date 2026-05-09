export default function ActivityFeed({ items = [] }) {
  return (
    <section className="glass-panel rounded-xl p-5">
      <h2 className="mb-5 text-lg font-black">Activity Pulse</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id || item.title} className="flex gap-3">
            <span className="mt-1 h-3 w-3 rounded-full bg-cyan-400 shadow-glow" />
            <div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
