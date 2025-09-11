'use client';

import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 24 }: { size?: number }) => {
  return (
    <motion.div
      style={{ 
        width: size,
        height: size,
        borderTop: `2px solid #10B981`,
        borderRight: `2px solid #10B981`,
        borderBottom: `2px solid transparent`,
        borderLeft: `2px solid transparent`,
      }}
      className="rounded-full"
      animate={{ rotate: 360 }}
      transition={{ 
        loop: Infinity,
        ease: "linear",
        duration: 0.8
      }}
    />
  );
};

export default LoadingSpinner;
