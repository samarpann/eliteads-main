import { useIsMobile } from "@/hooks/use-mobile";

const MorphingGradient = () => {
  const isMobile = useIsMobile();

  // Simpler version for mobile
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-morph-1"
          style={{
            background: "radial-gradient(circle, hsl(120 100% 50% / 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
            top: "-15%",
            right: "-15%",
            willChange: "transform",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-morph-2"
          style={{
            background: "radial-gradient(circle, hsl(42 90% 55% / 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
            bottom: "-10%",
            left: "-10%",
            willChange: "transform",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ contain: 'strict' }}>
      {/* Primary gradient blob - CSS animation with GPU layers */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 animate-morph-1"
        style={{
          background: "radial-gradient(circle, hsl(120 100% 50% / 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-20%",
          right: "-10%",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Secondary gradient blob */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 animate-morph-2"
        style={{
          background: "radial-gradient(circle, hsl(42 90% 55% / 0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "-15%",
          left: "-5%",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Accent gradient blob */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 animate-morph-3"
        style={{
          background: "radial-gradient(circle, hsl(175 70% 50% / 0.4) 0%, transparent 70%)",
          filter: "blur(50px)",
          top: "40%",
          left: "30%",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Static accent orbs - no animation, reduced blur */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsl(120 100% 50% / 0.2) 0%, transparent 70%)",
          filter: "blur(30px)",
          top: "20%",
          left: "10%",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute w-[200px] h-[200px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsl(42 90% 55% / 0.2) 0%, transparent 70%)",
          filter: "blur(30px)",
          top: "60%",
          left: "70%",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};

export default MorphingGradient;
