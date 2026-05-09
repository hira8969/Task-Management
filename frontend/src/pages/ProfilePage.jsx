import PageTransition from '../components/animations/PageTransition.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { useAppStore } from '../store/useAppStore.js';

export default function ProfilePage() {
  const user = useAppStore((state) => state.user);
  return (
    <PageTransition>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-500">Identity</p>
        <h1 className="mt-2 text-4xl font-black">Profile</h1>
      </div>
      <section className="glass-panel max-w-2xl rounded-xl p-6">
        <img className="h-20 w-20 rounded-xl" src={user?.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${user?.name || 'Orbit'}`} alt="" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input label="Name" defaultValue={user?.name || ''} />
          <Input label="Email" defaultValue={user?.email || ''} />
          <Input label="Role" defaultValue={user?.role || 'member'} />
          <Input label="Password" type="password" placeholder="Update password" />
        </div>
        <Button className="mt-6">Save changes</Button>
      </section>
    </PageTransition>
  );
}
