import { useIsMobile } from "@/hooks/use-mobile";

const NoiseTexture = () => {
  const isMobile = useIsMobile();

  // On mobile, use a static subtle noise texture instead of animated canvas
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
    );
  }

  // Desktop: Use CSS animation for subtle movement
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] opacity-15"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay",
        animation: "noise-shift 8s steps(10) infinite",
      }}
    />
  );
};

export default NoiseTexture;
