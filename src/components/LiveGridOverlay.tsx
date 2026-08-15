"use client";

import { useState, useEffect } from "react";
import { Crosshair } from "lucide-react";

export function LiveGridOverlay() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };

    handleResize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Floating Blueprint Coordinate Inspector */}
      <div className="absolute top-4 right-4 flex items-center gap-3 px-3 py-1.5 bg-[#121417]/90 border border-[#262a31] text-[11px] font-mono text-[#9ca3af] backdrop-blur-md">
        <Crosshair className="w-3.5 h-3.5 text-[#ff4d00] animate-pulse" />
        <span className="text-[#e5e7eb]">SYS.INSPECT</span>
        <span className="text-[#393f4a]">|</span>
        <span>X: <span className="text-[#ff4d00]">{coords.x.toString().padStart(4, "0")}</span></span>
        <span>Y: <span className="text-[#ff4d00]">{coords.y.toString().padStart(4, "0")}</span></span>
        <span className="hidden sm:inline text-[#393f4a]">|</span>
        <span className="hidden sm:inline">{viewport.w}x{viewport.h}PX</span>
      </div>

      {/* Thin Crosshair Hairlines tracking cursor */}
      <div
        className="absolute w-full h-[1px] bg-[#ff4d00]/15"
        style={{ top: `${coords.y}px` }}
      />
      <div
        className="absolute h-full w-[1px] bg-[#ff4d00]/15"
        style={{ left: `${coords.x}px` }}
      />
    </div>
  );
}
