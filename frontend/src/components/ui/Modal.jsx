import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="glass-panel max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl p-5"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black">{title}</h2>
              <button className="focus-ring rounded-lg p-2 hover:bg-slate-900/10 dark:hover:bg-white/10" onClick={onClose} aria-label="Close modal">
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
