import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  isVisible: boolean;
}

const PageTransition = ({ children, isVisible }: PageTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Overlay curtains */}
          <motion.div
            className="fixed inset-0 z-[200] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top curtain */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-background via-background to-primary/20"
              initial={{ y: "-100%" }}
              exit={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Bottom curtain */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background via-background to-secondary/20"
              initial={{ y: "100%" }}
              exit={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
