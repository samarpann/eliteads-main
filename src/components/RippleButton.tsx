import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { retroSound } from "@/lib/retroSound";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  soundType?: "click" | "success" | "powerUp" | "coin" | "nav";
}

const RippleButton = ({ children, className = "", onClick, href, soundType = "click" }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1000);
    
    // Play sound based on type
    switch (soundType) {
      case "success":
        retroSound.playSuccess();
        break;
      case "powerUp":
        retroSound.playPowerUp();
        break;
      case "coin":
        retroSound.playCoin();
        break;
      case "nav":
        retroSound.playNav();
        break;
      default:
        retroSound.playClick();
    }
    
    onClick?.();
  };

  const handleMouseEnter = () => {
    retroSound.playHover();
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 400, height: 400, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </Component>
  );
};

export default RippleButton;
