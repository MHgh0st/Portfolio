"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomBlueprintCursor() {
  const [hoverState, setHoverState] = useState<"default" | "project" | "interactive">("default");
  const [targetLabel, setTargetLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });

  // Smooth springs for cursor reticle
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Completely disable custom cursor on touch/mobile devices or reduced motion
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });

      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("button, a, [data-cursor]");
      if (interactiveEl) {
        const cursorType = interactiveEl.getAttribute("data-cursor");
        const label = interactiveEl.getAttribute("data-cursor-label") || "";
        setTargetLabel(label);

        if (cursorType === "project") {
          setHoverState("project");
        } else {
          setHoverState("interactive");
        }
      } else {
        setHoverState("default");
        setTargetLabel("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Full-viewport CAD Hairline Crosshairs */}
      <div
        className="absolute w-full h-[1px] bg-[#0047ff]/25 dark:bg-[#0047ff]/35 transition-transform duration-75 ease-out"
        style={{ top: `${coords.y}px` }}
      />
      <div
        className="absolute h-full w-[1px] bg-[#0047ff]/25 dark:bg-[#0047ff]/35 transition-transform duration-75 ease-out"
        style={{ left: `${coords.x}px` }}
      />

      {/* Primary Reticle Circle / Box */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: hoverState === "project" ? 1.6 : hoverState === "interactive" ? 1.25 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Main Blueprint Target Ring */}
          <div
            className={`transition-all duration-200 flex items-center justify-center ${
              hoverState === "project"
                ? "w-16 h-16 border-2 border-[#ff3b00] bg-[#ff3b00]/15"
                : hoverState === "interactive"
                ? "w-10 h-10 border-2 border-[#0047ff] bg-[#d4ff00]/40 dark:bg-[#0047ff]/30"
                : "w-6 h-6 border border-[#111111]/60 dark:border-[#f2f1ec]/60"
            }`}
          >
            {/* Inner Center Dot */}
            <div
              className={`w-1.5 h-1.5 transition-colors ${
                hoverState === "project"
                  ? "bg-[#ff3b00]"
                  : hoverState === "interactive"
                  ? "bg-[#0047ff] dark:bg-[#d4ff00]"
                  : "bg-[#111111] dark:bg-[#f2f1ec]"
              }`}
            />
          </div>

          {/* Dynamic Floating Label readout */}
          {targetLabel && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#111111] dark:bg-[#0047ff] text-[#d4ff00] dark:text-[#ffffff] text-[9px] font-mono px-1.5 py-0.5 border border-[#111111] dark:border-[#2b3038]"
            >
              {targetLabel}
            </motion.span>
          )}

          {/* Coordinate Readout Badge */}
          {hoverState === "default" && (
            <span className="absolute -bottom-5 left-4 text-[9px] font-mono text-[#555555] dark:text-[#9fa4ab] bg-[#f4f3ef] dark:bg-[#141618] px-1 border border-[#111111]/30 dark:border-[#2b3038]">
              {coords.x},{coords.y}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
