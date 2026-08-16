"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Common");

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
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 md:p-10 bg-[#111111]/90 dark:bg-[#000000]/92 backdrop-blur-md"
            style={{
              paddingTop: "max(1rem, env(safe-area-inset-top, 1rem))",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
            }}
          >
            {/* Modal Dialog Window */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[94dvh] bg-[#f4f3ef] dark:bg-[#141618] border-2 border-[#111111] dark:border-[#2b3038] shadow-[6px_6px_0px_#0047ff] sm:shadow-[10px_10px_0px_#0047ff] flex flex-col overflow-hidden"
            >
              {/* Neobrutalist Window Titlebar */}
              <div className="px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] border-b-2 border-[#111111] dark:border-[#2b3038] flex items-center justify-between font-mono text-xs gap-2">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 bg-[#d4ff00] animate-pulse shrink-0" />
                  <span className="font-bold tracking-wider truncate text-[11px] sm:text-xs">
                    {activeImage.title || "IMAGE_INSPECTOR // FULL_RESOLUTION"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <a
                    href={activeImage.src}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="min-h-[38px] min-w-[38px] p-2 bg-[#222222] dark:bg-[#1b1e22] hover:bg-[#0047ff] text-[#f4f3ef] border border-[#444444] dark:border-[#2b3038] transition-colors flex items-center justify-center"
                    title={t("directLink")}
                    aria-label={t("directLink")}
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setActiveImage(null)}
                    aria-label={t("close")}
                    className="min-h-[38px] min-w-[38px] p-2 bg-[#ff3b00] hover:bg-[#d4ff00] hover:text-[#111111] text-[#f4f3ef] border border-[#111111] dark:border-[#2b3038] transition-colors cursor-pointer flex items-center justify-center"
                    title={t("closeEsc")}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Full-Size Image Container */}
              <div className="relative flex-1 min-h-[40vh] max-h-[75dvh] w-full bg-[#111111] dark:bg-[#0c0d0e] flex items-center justify-center p-2 sm:p-4 overflow-auto">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt || "Full Resolution View"}
                  className="max-h-[70dvh] max-w-full object-contain rounded-none border border-[#333333] dark:border-[#2b3038]"
                />
              </div>

              {/* Window Footer Status */}
              <div className="px-3 py-2 sm:px-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border-t border-[#111111] dark:border-[#2b3038] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#555555] dark:text-[#9fa4ab]">
                <span>NATURAL_RATIO</span>
                <span className="text-[#111111] dark:text-[#f2f1ec] font-bold">
                  {t("lightboxDismiss")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
