"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Exact window scroll calculation
  const updateScroll = useCallback(() => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      setScrollProgress(0);
      return;
    }
    const currentScroll = window.scrollY;
    const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  // Click or drag on track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const targetProgress = Math.min(Math.max(clickY / rect.height, 0), 1);
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * totalHeight,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const moveY = e.clientY - rect.top;
    const targetProgress = Math.min(Math.max(moveY / rect.height, 0), 1);
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * totalHeight,
      behavior: "auto",
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const percentText = Math.round(scrollProgress * 100);

  return (
    <aside
      className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none font-mono"
      style={{ direction: "ltr" }}
    >
      {/* Top Percentage Badge */}
      <div className="mb-2 px-2 py-0.5 bg-[#111111] text-[#d4ff00] text-[10px] font-black border-2 border-[#111111] shadow-[3px_3px_0px_#0047ff] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b00] animate-pulse" />
        <span>{percentText}%</span>
      </div>

      {/* Top Jump Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ x: 2, y: -2 }}
        whileTap={{ x: 0, y: 0 }}
        className="w-8 h-8 bg-[#d4ff00] hover:bg-[#0047ff] text-[#111111] hover:text-[#f4f3ef] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center mb-1.5 transition-colors cursor-pointer"
        title="پرش به اول صفحه"
      >
        <ArrowUp className="w-4 h-4 stroke-[3]" />
      </motion.button>

      {/* Main Track Rail (Right Side) */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative w-8 h-[40vh] min-h-[220px] max-h-[380px] bg-[#f4f3ef] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] cursor-pointer overflow-hidden p-0.5"
      >
        {/* Background Caution Hatch Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #111111 0, #111111 2px, transparent 0, transparent 8px)",
          }}
        />

        {/* Dynamic Indicator Thumb */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            top: `${scrollProgress * 100}%`,
            transform: `translateY(-${scrollProgress * 100}%)`,
          }}
          className={`absolute left-0.5 right-0.5 h-12 border-2 border-[#111111] flex flex-col items-center justify-between p-1 cursor-grab active:cursor-grabbing transition-colors ${
            isDragging
              ? "bg-[#0047ff] text-[#f4f3ef] shadow-[2px_2px_0px_#d4ff00]"
              : "bg-[#ff3b00] text-[#f4f3ef] hover:bg-[#d4ff00] hover:text-[#111111] shadow-[2px_2px_0px_#111111]"
          }`}
        >
          <div className="w-full h-1 bg-[#111111]" />
          <div className="text-[8px] font-black -rotate-90 leading-none">
            DRAG
          </div>
          <div className="w-full h-1 bg-[#d4ff00]" />
        </div>
      </div>

      {/* Bottom Jump Button */}
      <motion.button
        onClick={scrollToBottom}
        whileHover={{ x: 2, y: 2 }}
        whileTap={{ x: 0, y: 0 }}
        className="w-8 h-8 bg-[#0047ff] hover:bg-[#ff3b00] text-[#f4f3ef] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center mt-1.5 transition-colors cursor-pointer"
        title="پرش به انتهای صفحه"
      >
        <ArrowDown className="w-4 h-4 stroke-[3]" />
      </motion.button>
    </aside>
  );
}
