import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { authService } from '../services/api.js';
import { useAppStore } from '../store/useAppStore.js';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid professional email'),
  password: z.string().min(8, 'Use at least 8 characters'),
  workspaceName: z.string().min(2, 'Workspace name is required')
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const setSession = useAppStore((state) => state.setSession);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (values) => {
    try {
      const session = await authService.register(values);
      setSession(session);
      toast.success('Workspace created');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Could not create workspace.';
      toast.error(message);
    }
  };

  return (
    <motion.section className="glass-panel glow-border rounded-xl p-6 sm:p-8" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
      <h2 className="text-3xl font-black">Launch workspace</h2>
      <p className="mt-2 text-sm text-slate-500">Use any valid company, school, or professional email to create your workspace.</p>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" autoComplete="name" placeholder="Your name" {...register('name')} error={errors.name?.message} />
        <Input label="Professional email" type="email" autoComplete="email" placeholder="you@company.com" {...register('email')} error={errors.email?.message} />
        <Input label="Workspace" placeholder="Company or team name" {...register('workspaceName')} error={errors.workspaceName?.message} />
        <Input label="Password" type="password" autoComplete="new-password" placeholder="Minimum 8 characters" {...register('password')} error={errors.password?.message} />
        <Button className="w-full" icon={Rocket} isLoading={isSubmitting}>Create account</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">Already have an account? <Link className="font-black text-cyan-500" to="/login">Sign in</Link></p>
    </motion.section>
  );
}
