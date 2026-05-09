import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-mesh p-6 text-center">
      <section className="glass-panel rounded-xl p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500">404</p>
        <h1 className="mt-2 text-4xl font-black">Page not found</h1>
        <Link to="/dashboard"><Button className="mt-6">Back to dashboard</Button></Link>
      </section>
    </main>
  );
}
