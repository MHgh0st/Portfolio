"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Download, ExternalLink } from "lucide-react";

type LightboxImage = {
  src: string;
  alt?: string;
  title?: string;
};

type LightboxContextType = {
  openImage: (image: LightboxImage) => void;
  closeImage: () => void;
};

const LightboxContext = createContext<LightboxContextType | null>(null);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within an ImageLightboxProvider");
  }
  return context;
}

export function ImageLightboxProvider({ children }: { children: React.ReactNode }) {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    if (activeImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <LightboxContext.Provider
      value={{
        openImage: (img) => setActiveImage(img),
        closeImage: () => setActiveImage(null),
      }}
    >
      {children}

      {/* Global High-Craft Neobrutal Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#111111]/85 backdrop-blur-md select-none"
          >
            {/* Modal Dialog Window */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[92vh] bg-[#f4f3ef] border-2 border-[#111111] shadow-[10px_10px_0px_#0047ff] flex flex-col overflow-hidden"
            >
              {/* Neobrutalist Window Titlebar */}
              <div className="px-4 py-2.5 bg-[#111111] text-[#f4f3ef] border-b-2 border-[#111111] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#d4ff00] animate-pulse" />
                  <span className="font-bold tracking-wider">
                    {activeImage.title || "IMAGE_INSPECTOR // FULL_RESOLUTION"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeImage.src}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="p-1.5 bg-[#222222] hover:bg-[#0047ff] text-[#f4f3ef] border border-[#444444] transition-colors"
                    title="مشاهده مستقیم یا دانلود فایل"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setActiveImage(null)}
                    className="p-1.5 bg-[#ff3b00] hover:bg-[#d4ff00] hover:text-[#111111] text-[#f4f3ef] border border-[#111111] transition-colors cursor-pointer"
                    title="بستن پنجره (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Full-Size Image Container */}
              <div className="relative flex-1 min-h-[50vh] max-h-[78vh] w-full bg-[#111111] flex items-center justify-center p-2 overflow-auto">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt || "Full Resolution View"}
                  className="max-h-[76vh] max-w-full object-contain rounded-none border border-[#333333]"
                />
              </div>

              {/* Window Footer Status */}
              <div className="px-4 py-2 bg-[#e9e7e1] border-t border-[#111111] flex items-center justify-between text-[11px] font-mono text-[#555555]">
                <span>SCALE: 1:1 NATURAL_VIEWPORT</span>
                <span className="text-[#111111] font-bold">
                  کلیک روی کادر یا دکمه ضربدر برای خروج
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
