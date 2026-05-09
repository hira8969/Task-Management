import { Plus } from 'lucide-react';
import Button from '../ui/Button.jsx';

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <section className="glass-panel rounded-xl p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-cyan-400/10 text-cyan-500">
        <Plus className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-2xl font-black">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-300">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" icon={Plus} onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}
