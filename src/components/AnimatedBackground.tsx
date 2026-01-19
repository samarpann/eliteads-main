import { useIsMobile } from "@/hooks/use-mobile";

const AnimatedBackground = () => {
  const isMobile = useIsMobile();

  // On mobile, use simpler CSS animations instead of framer-motion
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-20 animate-morph-1"
          style={{
            background: "radial-gradient(circle, hsl(120 100% 50% / 0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
            top: "-10%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[250px] h-[250px] rounded-full opacity-15 animate-morph-2"
          style={{
            background: "radial-gradient(circle, hsl(42 90% 55% / 0.2) 0%, transparent 70%)",
            filter: "blur(30px)",
            bottom: "10%",
            right: "-5%",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Desktop: CSS animations for performance */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-morph-1"
        style={{
          background: "radial-gradient(circle, hsl(120 100% 50% / 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "-20%",
          left: "-10%",
          willChange: "transform",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-morph-2"
        style={{
          background: "radial-gradient(circle, hsl(42 90% 55% / 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          top: "20%",
          right: "-10%",
          willChange: "transform",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-morph-3"
        style={{
          background: "radial-gradient(circle, hsl(150 70% 50% / 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          bottom: "-10%",
          left: "25%",
          willChange: "transform",
        }}
      />

      {/* Pulsing rings - desktop only */}
      <div className="absolute top-1/4 right-1/4 hidden lg:block">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full border border-primary/20"
            style={{
              transform: "translate(-50%, -50%)",
              animation: `pulse-ring 4s ease-out infinite ${i * 1.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
