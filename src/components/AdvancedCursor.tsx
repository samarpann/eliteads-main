import { useEffect, useRef, useState, useCallback } from "react";

const AdvancedCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  
  // Use refs for DOM elements to avoid re-renders
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);
  const trail3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Position refs to avoid state updates
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const trail1Pos = useRef({ x: 0, y: 0 });
  const trail2Pos = useRef({ x: 0, y: 0 });
  const trail3Pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  useEffect(() => {
    let isAnimating = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animate);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.dataset.cursorHover;

      setIsHovering(!!isInteractive);
      setCursorText(target.dataset.cursorText || "");
    };

    const animate = () => {
      const lerpCursor = 0.2;
      const lerpTrail1 = 0.1;
      const lerpTrail2 = 0.05;
      const lerpTrail3 = 0.025;

      // Calculate deltas
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      
      // Only continue animation if there's meaningful movement
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        isAnimating = false;
        return;
      }

      cursorPos.current.x += dx * lerpCursor;
      cursorPos.current.y += dy * lerpCursor;
      
      trail1Pos.current.x += (mousePos.current.x - trail1Pos.current.x) * lerpTrail1;
      trail1Pos.current.y += (mousePos.current.y - trail1Pos.current.y) * lerpTrail1;
      
      trail2Pos.current.x += (mousePos.current.x - trail2Pos.current.x) * lerpTrail2;
      trail2Pos.current.y += (mousePos.current.y - trail2Pos.current.y) * lerpTrail2;
      
      trail3Pos.current.x += (mousePos.current.x - trail3Pos.current.x) * lerpTrail3;
      trail3Pos.current.y += (mousePos.current.y - trail3Pos.current.y) * lerpTrail3;

      // Batch DOM updates
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trail1Pos.current.x}px, ${trail1Pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trail1Ref.current) {
        trail1Ref.current.style.transform = `translate3d(${trail1Pos.current.x}px, ${trail1Pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trail2Ref.current) {
        trail2Ref.current.style.transform = `translate3d(${trail2Pos.current.x}px, ${trail2Pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trail3Ref.current) {
        trail3Ref.current.style.transform = `translate3d(${trail3Pos.current.x}px, ${trail3Pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${cursorPos.current.x + 20}px, ${cursorPos.current.y}px, 0) translateY(-50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const cursorSize = isHovering ? 60 : 16;
  const glowSize = isHovering ? 150 : 80;

  return (
    <div className="hidden lg:block">
      {/* Outermost glow trail */}
      <div
        ref={trail3Ref}
        className="fixed rounded-full pointer-events-none z-40"
        style={{
          width: 200,
          height: 200,
          background: "radial-gradient(circle, hsl(142 70% 45% / 0.03) 0%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* Middle glow trail */}
      <div
        ref={trail2Ref}
        className="fixed rounded-full pointer-events-none z-40"
        style={{
          width: 120,
          height: 120,
          background: "radial-gradient(circle, hsl(45 100% 50% / 0.05) 0%, transparent 70%)",
          filter: "blur(25px)",
          willChange: "transform",
        }}
      />

      {/* Inner glow trail */}
      <div
        ref={trail1Ref}
        className="fixed rounded-full pointer-events-none z-40"
        style={{
          width: glowSize,
          height: glowSize,
          background: "radial-gradient(circle, hsl(142 70% 45% / 0.1) 0%, transparent 60%)",
          filter: "blur(15px)",
          willChange: "transform",
          transition: "width 0.3s, height 0.3s",
        }}
      />

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed rounded-full pointer-events-none z-50 mix-blend-difference bg-white"
        style={{
          width: cursorSize,
          height: cursorSize,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s",
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
        }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed rounded-full pointer-events-none z-50 border-2 border-primary/50"
        style={{
          width: cursorSize * 2.5,
          height: cursorSize * 2.5,
          opacity: isHovering ? 1 : 0.3,
          willChange: "transform",
          transition: "width 0.3s, height 0.3s, opacity 0.3s",
        }}
      />

      {/* Cursor text label */}
      {cursorText && (
        <div
          ref={textRef}
          className="fixed pointer-events-none z-50 font-pixel text-[8px] text-primary whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {cursorText}
        </div>
      )}
    </div>
  );
};

export default AdvancedCursor;
