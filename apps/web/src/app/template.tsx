'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// A template re-mounts on every navigation, so this gives all guest pages a
// gentle fade-in transition as the user moves between routes.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
