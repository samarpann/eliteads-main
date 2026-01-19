import { motion } from "framer-motion";

// 8-bit Star component
export const PixelStar = ({ 
  size = 16, 
  color = "primary",
  className = "",
  delay = 0 
}: { 
  size?: number; 
  color?: "primary" | "secondary" | "accent" | "gold";
  className?: string;
  delay?: number;
}) => {
  const colorClass = {
    primary: "bg-primary",
    secondary: "bg-secondary", 
    accent: "bg-accent",
    gold: "bg-secondary"
  }[color];

  const glowColor = {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    accent: "hsl(var(--accent))",
    gold: "hsl(var(--gold))"
  }[color];

  const pixelSize = size / 5;

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        delay 
      }}
    >
      {/* Center pixel */}
      <div 
        className={`absolute ${colorClass}`}
        style={{ 
          width: pixelSize, 
          height: pixelSize, 
          left: pixelSize * 2, 
          top: pixelSize * 2,
          boxShadow: `0 0 ${size/2}px ${glowColor}`
        }} 
      />
      {/* Top */}
      <div 
        className={`absolute ${colorClass}`}
        style={{ width: pixelSize, height: pixelSize, left: pixelSize * 2, top: 0 }} 
      />
      {/* Bottom */}
      <div 
        className={`absolute ${colorClass}`}
        style={{ width: pixelSize, height: pixelSize, left: pixelSize * 2, top: pixelSize * 4 }} 
      />
      {/* Left */}
      <div 
        className={`absolute ${colorClass}`}
        style={{ width: pixelSize, height: pixelSize, left: 0, top: pixelSize * 2 }} 
      />
      {/* Right */}
      <div 
        className={`absolute ${colorClass}`}
        style={{ width: pixelSize, height: pixelSize, left: pixelSize * 4, top: pixelSize * 2 }} 
      />
      {/* Diagonals */}
      <div 
        className={`absolute ${colorClass} opacity-70`}
        style={{ width: pixelSize, height: pixelSize, left: pixelSize, top: pixelSize }} 
      />
      <div 
        className={`absolute ${colorClass} opacity-70`}
        style={{ width: pixelSize, height: pixelSize, left: pixelSize * 3, top: pixelSize }} 
      />
      <div 
        className={`absolute ${colorClass} opacity-70`}
        style={{ width: pixelSize, height: pixelSize, left: pixelSize, top: pixelSize * 3 }} 
      />
      <div 
        className={`absolute ${colorClass} opacity-70`}
        style={{ width: pixelSize, height: pixelSize, left: pixelSize * 3, top: pixelSize * 3 }} 
      />
    </motion.div>
  );
};

// 8-bit Arrow component
export const PixelArrow = ({ 
  direction = "right",
  size = 20,
  color = "primary",
  className = "",
  animated = true
}: { 
  direction?: "up" | "down" | "left" | "right";
  size?: number;
  color?: "primary" | "secondary" | "accent";
  className?: string;
  animated?: boolean;
}) => {
  const colorClass = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  }[color];

  const pixelSize = size / 5;
  
  const rotation = {
    up: -90,
    down: 90,
    left: 180,
    right: 0
  }[direction];

  const animationProps = animated ? {
    animate: { x: [0, 5, 0] },
    transition: { duration: 1, repeat: Infinity }
  } : {};

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size,
        transform: `rotate(${rotation}deg)`
      }}
      {...animationProps}
    >
      {/* Arrow shaft */}
      <div className={`absolute ${colorClass}`} style={{ width: pixelSize * 3, height: pixelSize, left: 0, top: pixelSize * 2 }} />
      {/* Arrow head */}
      <div className={`absolute ${colorClass}`} style={{ width: pixelSize, height: pixelSize, left: pixelSize * 3, top: pixelSize * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: pixelSize, height: pixelSize, left: pixelSize * 2, top: pixelSize }} />
      <div className={`absolute ${colorClass}`} style={{ width: pixelSize, height: pixelSize, left: pixelSize * 2, top: pixelSize * 3 }} />
      <div className={`absolute ${colorClass}`} style={{ width: pixelSize, height: pixelSize, left: pixelSize * 3, top: 0 }} />
      <div className={`absolute ${colorClass}`} style={{ width: pixelSize, height: pixelSize, left: pixelSize * 3, top: pixelSize * 4 }} />
      <div className={`absolute ${colorClass}`} style={{ width: pixelSize, height: pixelSize, left: pixelSize * 4, top: pixelSize }} />
      <div className={`absolute ${colorClass}`} style={{ width: pixelSize, height: pixelSize, left: pixelSize * 4, top: pixelSize * 3 }} />
    </motion.div>
  );
};

// Animated pixel border
export const PixelBorder = ({ 
  className = "",
  color = "primary",
  position = "top"
}: { 
  className?: string;
  color?: "primary" | "secondary" | "accent";
  position?: "top" | "bottom" | "left" | "right";
}) => {
  const colorClass = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  }[color];

  const isHorizontal = position === "top" || position === "bottom";

  return (
    <div className={`absolute ${position}-0 ${isHorizontal ? 'left-0 right-0 h-2' : 'top-0 bottom-0 w-2'} overflow-hidden ${className}`}>
      <motion.div 
        className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} gap-1`}
        animate={{ 
          x: isHorizontal ? [0, -20, 0] : 0,
          y: isHorizontal ? 0 : [0, -20, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className={`${colorClass} ${i % 2 === 0 ? 'opacity-80' : 'opacity-40'}`}
            style={{ 
              width: isHorizontal ? 8 : 4, 
              height: isHorizontal ? 4 : 8,
              boxShadow: i % 3 === 0 ? `0 0 10px hsl(var(--${color}))` : 'none'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Pixel corner decoration
export const PixelCorner = ({ 
  position = "top-left",
  size = 40,
  color = "primary",
  className = ""
}: { 
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  color?: "primary" | "secondary" | "accent";
  className?: string;
}) => {
  const colorClass = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent"
  }[color];

  const glowColor = {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    accent: "hsl(var(--accent))"
  }[color];

  const positionClasses = {
    "top-left": "top-0 left-0 border-l-4 border-t-4",
    "top-right": "top-0 right-0 border-r-4 border-t-4",
    "bottom-left": "bottom-0 left-0 border-l-4 border-b-4",
    "bottom-right": "bottom-0 right-0 border-r-4 border-b-4"
  }[position];

  return (
    <motion.div 
      className={`absolute ${positionClasses} ${colorClass} ${className}`}
      style={{ 
        width: size, 
        height: size,
        boxShadow: `0 0 20px ${glowColor}`
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
};

// Floating pixel particles
export const PixelParticles = ({ count = 10, className = "" }: { count?: number; className?: string }) => {
  const colors = ["primary", "secondary", "accent"] as const;
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const color = colors[i % 3];
        const colorClass = {
          primary: "bg-primary",
          secondary: "bg-secondary",
          accent: "bg-accent"
        }[color];
        
        return (
          <motion.div
            key={i}
            className={`absolute ${colorClass}`}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        );
      })}
    </div>
  );
};

// 8-bit Heart
export const PixelHeart = ({ 
  size = 20, 
  color = "accent",
  className = "" 
}: { 
  size?: number; 
  color?: "primary" | "secondary" | "accent";
  className?: string;
}) => {
  const colorClass = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  }[color];

  const p = size / 7; // pixel unit

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size * 0.85 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    >
      {/* Row 1 */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p, top: 0 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: 0 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 4, top: 0 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 5, top: 0 }} />
      {/* Row 2 */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: 0, top: p }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p, top: p }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: p }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 3, top: p }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 4, top: p }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 5, top: p }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 6, top: p }} />
      {/* Row 3 */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: 0, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 3, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 4, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 5, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 6, top: p * 2 }} />
      {/* Row 4 */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p, top: p * 3 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: p * 3 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 3, top: p * 3 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 4, top: p * 3 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 5, top: p * 3 }} />
      {/* Row 5 */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: p * 4 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 3, top: p * 4 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 4, top: p * 4 }} />
      {/* Row 6 */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 3, top: p * 5 }} />
    </motion.div>
  );
};

// 8-bit Diamond/Gem
export const PixelGem = ({ 
  size = 20, 
  color = "secondary",
  className = "" 
}: { 
  size?: number; 
  color?: "primary" | "secondary" | "accent";
  className?: string;
}) => {
  const colorClass = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  }[color];

  const lightClass = {
    primary: "bg-primary/60",
    secondary: "bg-secondary/60",
    accent: "bg-accent/60"
  }[color];

  const p = size / 5;

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ 
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Top */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: 0 }} />
      {/* Row 2 */}
      <div className={`absolute ${lightClass}`} style={{ width: p, height: p, left: p, top: p }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: p }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 3, top: p }} />
      {/* Row 3 - widest */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: 0, top: p * 2 }} />
      <div className={`absolute ${lightClass}`} style={{ width: p, height: p, left: p, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 3, top: p * 2 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 4, top: p * 2 }} />
      {/* Row 4 */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p, top: p * 3 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: p * 3 }} />
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 3, top: p * 3 }} />
      {/* Bottom */}
      <div className={`absolute ${colorClass}`} style={{ width: p, height: p, left: p * 2, top: p * 4 }} />
    </motion.div>
  );
};

// Section decorator component that combines multiple elements
export const SectionDecorator = ({ 
  variant = "default",
  className = ""
}: { 
  variant?: "default" | "stars" | "corners" | "full";
  className?: string;
}) => {
  if (variant === "stars") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <PixelStar size={20} color="primary" className="absolute top-10 left-[10%]" delay={0} />
        <PixelStar size={16} color="secondary" className="absolute top-20 right-[15%]" delay={0.3} />
        <PixelStar size={24} color="accent" className="absolute bottom-16 left-[20%]" delay={0.6} />
        <PixelStar size={14} color="primary" className="absolute bottom-24 right-[25%]" delay={0.9} />
        <PixelStar size={18} color="secondary" className="absolute top-1/3 left-[5%]" delay={1.2} />
        <PixelStar size={12} color="accent" className="absolute top-1/2 right-[8%]" delay={1.5} />
      </div>
    );
  }

  if (variant === "corners") {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <PixelCorner position="top-left" size={50} color="primary" className="m-4" />
        <PixelCorner position="top-right" size={50} color="secondary" className="m-4" />
        <PixelCorner position="bottom-left" size={50} color="accent" className="m-4" />
        <PixelCorner position="bottom-right" size={50} color="primary" className="m-4" />
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <PixelBorder position="top" color="primary" />
        <PixelBorder position="bottom" color="secondary" />
        <PixelCorner position="top-left" size={40} color="primary" className="m-2" />
        <PixelCorner position="top-right" size={40} color="secondary" className="m-2" />
        <PixelCorner position="bottom-left" size={40} color="accent" className="m-2" />
        <PixelCorner position="bottom-right" size={40} color="primary" className="m-2" />
        <PixelParticles count={8} />
      </div>
    );
  }

  // Default variant
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <PixelStar size={16} color="primary" className="absolute top-8 left-[8%]" delay={0} />
      <PixelStar size={20} color="secondary" className="absolute top-12 right-[12%]" delay={0.5} />
      <PixelGem size={18} color="accent" className="absolute bottom-12 left-[15%]" />
      <PixelArrow direction="right" size={24} color="primary" className="absolute top-1/4 right-[5%]" />
    </div>
  );
};

export default SectionDecorator;
