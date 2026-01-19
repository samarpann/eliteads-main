import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileEffects = () => {
  const isMobile = useIsMobile();
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (!isMobile) return;
    
    let rippleId = 0;

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        // Limit ripples for performance
        const newRipple = {
          id: rippleId++,
          x: touch.clientX,
          y: touch.clientY,
        };
        setRipples(prev => [...prev.slice(-3), newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 800);
      }
    };

    window.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Ripple effects - CSS only for performance */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full border border-primary/20"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            animation: "ripple-expand 0.8s ease-out forwards",
          }}
        />
      ))}

      {/* Static floating decorations */}
      <div
        className="absolute top-1/4 left-4 w-2 h-2 rounded-full bg-primary/40"
        style={{ 
          boxShadow: "0 0 8px hsl(120 100% 50% / 0.3)",
          animation: "float-gentle 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 right-4 w-2 h-2 rounded-full bg-secondary/40"
        style={{ 
          boxShadow: "0 0 8px hsl(42 90% 55% / 0.3)",
          animation: "float-gentle 5s ease-in-out infinite 0.5s",
        }}
      />
      <div
        className="absolute bottom-1/3 left-6 w-1.5 h-1.5 rounded-full bg-accent/40"
        style={{ 
          boxShadow: "0 0 8px hsl(175 70% 50% / 0.3)",
          animation: "float-gentle 6s ease-in-out infinite 1s",
        }}
      />

      <style>{`
        @keyframes ripple-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 0.6;
          }
          100% {
            width: 120px;
            height: 120px;
            opacity: 0;
          }
        }
        
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileEffects;
