import { motion } from "framer-motion";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: 'neon' | 'gold' | 'emerald';
}

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 3,
    color: ['neon', 'gold', 'emerald'][Math.floor(Math.random() * 3)] as Particle['color'],
  }));
};

const getColorStyle = (color: Particle['color']) => {
  switch (color) {
    case 'neon': return { background: 'hsl(120 100% 50% / 0.3)' };
    case 'gold': return { background: 'hsl(42 90% 55% / 0.3)' };
    case 'emerald': return { background: 'hsl(150 70% 50% / 0.3)' };
  }
};

const FloatingParticles = () => {
  const isMobile = useIsMobile();
  
  // Fewer particles on mobile for performance
  const particles = useMemo(() => generateParticles(isMobile ? 8 : 20), [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            ...getColorStyle(particle.color),
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
