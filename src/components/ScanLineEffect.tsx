import { useIsMobile } from "@/hooks/use-mobile";

const ScanLineEffect = () => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal scan line - CSS animation for performance */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-scan-line"
        style={{ willChange: "transform" }}
      />
      {/* Subtle scanlines overlay - reduced opacity on mobile */}
      <div 
        className={`absolute inset-0 ${isMobile ? 'opacity-[0.01]' : 'opacity-[0.03]'}`}
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(120 100% 50% / 0.1) 2px, hsl(120 100% 50% / 0.1) 4px)",
        }}
      />
    </div>
  );
};

export default ScanLineEffect;
