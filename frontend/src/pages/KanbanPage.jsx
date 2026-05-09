import PageTransition from '../components/animations/PageTransition.jsx';
import KanbanBoard from '../components/kanban/KanbanBoard.jsx';

export default function KanbanPage() {
  return (
    <PageTransition>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500">Drag and Drop</p>
        <h1 className="mt-2 text-4xl font-black">Kanban Board</h1>
      </div>
      <KanbanBoard />
    </PageTransition>
  );
}
