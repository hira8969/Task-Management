import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { authService } from '../services/api.js';
import { useAppStore } from '../store/useAppStore.js';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid professional email'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters')
});

export default function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAppStore((state) => state.setSession);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      const session = await authService.login(values);
      setSession(session);
      toast.success('Welcome back');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed. Please check your email and password.';
      toast.error(message);
    }
  };

  return (
    <motion.section className="glass-panel glow-border rounded-xl p-6 sm:p-8" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
      <h2 className="text-3xl font-black">Sign in</h2>
      <p className="mt-2 text-sm text-slate-500">Sign in with your work email. New teams can create a workspace in seconds.</p>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Professional email" type="email" autoComplete="email" placeholder="you@company.com" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" autoComplete="current-password" placeholder="Enter your password" {...register('password')} error={errors.password?.message} />
        <Button className="w-full" icon={LogIn} isLoading={isSubmitting}>Login</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">New here? <Link className="font-black text-cyan-500" to="/register">Create workspace</Link></p>
    </motion.section>
  );
}
