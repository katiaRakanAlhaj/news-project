// shared/animations.js
import { motion } from "framer-motion";

// Animation variants for containers
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// Animation variants for images
export const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" }
  },
};

// Centered Square Loader Component
export const CenteredSquareLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex justify-center items-center min-h-[400px]"
  >
    <div className="flex gap-2">
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          backgroundColor: ["#e5e7eb", "#dc2626", "#e5e7eb"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0,
        }}
        className="w-3 h-3 rounded-sm"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          backgroundColor: ["#e5e7eb", "#dc2626", "#e5e7eb"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2,
        }}
        className="w-3 h-3 rounded-sm"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          backgroundColor: ["#e5e7eb", "#dc2626", "#e5e7eb"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4,
        }}
        className="w-3 h-3 rounded-sm"
      />
    </div>
  </motion.div>
);