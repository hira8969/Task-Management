import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function PageTransition({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('[data-reveal]'), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
  }, []);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
