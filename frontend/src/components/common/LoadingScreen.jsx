import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="grid min-h-[420px] place-items-center">
      <motion.div className="relative h-20 w-20 rounded-full border border-cyan-300/40" animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}>
        <span className="absolute inset-3 rounded-full bg-aurora blur-xl" />
      </motion.div>
    </div>
  );
}
