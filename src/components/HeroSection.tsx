"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  ArrowDownLeft,
  ArrowDownRight,
  Terminal,
  Sparkles,
  Compass,
  ZoomIn,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionGeometry } from "./SectionGeometry";
import { useLightbox } from "./ImageLightboxProvider";

export function HeroSection() {
  const t = useTranslations("Hero");
  const commonT = useTranslations("Common");
  const cursorT = useTranslations("Cursor");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const containerRef = useRef<HTMLDivElement>(null);
  const { openImage } = useLightbox();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Subtle spring physics for micro-parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 25, mass: 0.8 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const counterDx = useTransform(dx, (v) => -v * 0.7);
  const counterDy = useTransform(dy, (v) => -v * 0.7);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 80;
    const y = (e.clientY - top - height / 2) / 80;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Continuous Scrubbed Scroll-Driven Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Responsive transforms that shift smoothly
  const typeTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 40] : [0, 180]
  );
  const typeScale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [1, 0.98] : [1, 0.9]
  );
  const portraitTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -100]
  );
  const portraitRotate = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : isRtl ? [0, -3] : [0, 3]
  );
  const bgTextX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile
      ? isRtl ? [0, -100] : [0, 100]
      : isRtl ? [0, -350] : [0, 350]
  );

  const ArrowActionIcon = isRtl ? ArrowDownLeft : ArrowDownRight;

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full border-b border-[#111111] dark:border-[#2b3038] bg-swiss-grid overflow-hidden min-h-[90dvh] flex flex-col justify-between"
    >
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="hero" scrollYProgress={scrollYProgress} />

      {/* Background Kinetic Oversized Backdrop Text */}
      <motion.div
        style={{ x: bgTextX }}
        className="absolute top-1/3 rtl:-right-20 ltr:-left-20 text-[14vw] font-black text-[#111111]/[0.04] dark:text-[#f2f1ec]/[0.03] leading-none pointer-events-none whitespace-nowrap font-mono z-0 select-none"
      >
        {t("bgText")}
      </motion.div>

      {/* Main Asymmetric Interlocking Layout */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 my-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Typographic Column (Start) */}
          <motion.div
            style={{ y: typeTranslateY, scale: typeScale }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 relative rtl:origin-right ltr:origin-left"
          >
            {/* Role & Eyebrow */}
            <motion.div
              style={{ x: counterDx, y: counterDy }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111111] dark:bg-[#1b1e22] text-[#f4f3ef] text-xs font-bold border border-[#111111] dark:border-[#2b3038] shadow-[2px_2px_0px_#d4ff00] dark:shadow-[2px_2px_0px_#0047ff]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" />
              <span>{t("eyebrow")}</span>
            </motion.div>

            {/* Name Lockup with Safe Diacritic / Capitalization Padding */}
            <div className="overflow-visible relative pt-1 pb-2">
              <motion.h1
                style={{ x: dx, y: dy }}
                data-cursor="interactive"
                data-cursor-label={cursorT("identity")}
                className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1] sm:leading-[1.02] text-[#111111] dark:text-[#f2f1ec]"
              >
                {t("firstName")} <br />
                <span className="text-[#0047ff] dark:text-[#3b82f6]">{t("lastName")}</span>
              </motion.h1>

              {/* Floating Technical Stamp Overlay */}
              <motion.div
                style={{ x: counterDx, y: counterDy }}
                className="absolute -top-3 rtl:left-2 rtl:sm:left-4 ltr:right-2 ltr:sm:right-4 bg-[#d4ff00] dark:bg-[#0047ff] text-[#111111] dark:text-[#ffffff] text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-1 border border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#d4ff00] hidden sm:block"
              >
                {t("titleStamp")}
              </motion.div>
            </div>

            {/* Core Statement */}
            <motion.p className="text-base sm:text-xl md:text-2xl font-bold text-[#111111] dark:text-[#f2f1ec] leading-relaxed max-w-[48ch] border-s-4 border-[#0047ff] dark:border-[#3b82f6] ps-3 sm:ps-4 py-1">
              {t("statement")}
            </motion.p>

            {/* Paragraph Sub-description */}
            <motion.p className="text-xs sm:text-sm text-[#555555] dark:text-[#9fa4ab] leading-relaxed max-w-[55ch] font-medium">
              {t("description")}
            </motion.p>

            {/* Action Buttons with 48px Touch Ergonomics on Mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 text-xs font-bold">
              <a
                href="#projects"
                data-cursor="interactive"
                data-cursor-label={cursorT("projects")}
                className="min-h-[48px] px-6 sm:px-7 py-3.5 sm:py-4 bg-[#0047ff] text-[#f4f3ef] hover:bg-[#111111] dark:hover:bg-[#1b1e22] transition-all flex items-center justify-center gap-2 border-2 border-[#111111] dark:border-[#2b3038] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff] active:shadow-[1px_1px_0px_#111111] active:translate-y-0.5"
              >
                <span>{t("ctaSelectedWork")}</span>
                <ArrowActionIcon className="w-4 h-4 text-[#d4ff00]" />
              </a>

              <a
                href="#contact"
                data-cursor="interactive"
                data-cursor-label={cursorT("contact")}
                className="min-h-[48px] px-6 sm:px-7 py-3.5 sm:py-4 bg-[#f4f3ef] dark:bg-[#141618] text-[#111111] dark:text-[#f2f1ec] hover:bg-[#e9e7e1] dark:hover:bg-[#1b1e22] transition-all border-2 border-[#111111] dark:border-[#2b3038] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff] flex items-center justify-center gap-2 active:shadow-[1px_1px_0px_#111111] active:translate-y-0.5"
              >
                <span>{t("ctaContact")}</span>
              </a>
            </div>
          </motion.div>

          {/* Portrait Canvas Column (End) */}
          <motion.div
            style={{ y: portraitTranslateY, rotate: portraitRotate }}
            className="lg:col-span-5 relative origin-center pt-4 lg:pt-0"
          >
            {/* Integrated Portrait Frame */}
            <div
              onClick={() =>
                openImage({
                  src: "/header.jpg",
                  title: t("portraitTitle"),
                  alt: t("portraitAlt"),
                })
              }
              className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-[4/5] bg-[#e9e7e1] dark:bg-[#1b1e22] border-2 border-[#111111] dark:border-[#2b3038] shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#0047ff] sm:shadow-[8px_8px_0px_#111111] sm:dark:shadow-[8px_8px_0px_#0047ff] overflow-hidden group cursor-pointer"
              title={t("portraitTooltip")}
            >
              {/* Halftone / Graphic Grid Overlay */}
              <div className="absolute inset-0 bg-dot-grid opacity-30 z-10 pointer-events-none" />

              {/* Photo Portrait Element */}
              <div className="absolute inset-0 flex items-center justify-center p-2.5 sm:p-3 bg-[#f4f3ef] dark:bg-[#141618]">
                <div className="w-full h-full border border-[#111111] dark:border-[#2b3038] relative overflow-hidden bg-[#e9e7e1] dark:bg-[#1b1e22]">
                  <Image
                    src="/header.jpg"
                    alt={t("portraitAlt")}
                    fill
                    priority
                    className="object-cover object-center grayscale contrast-125 dark:contrast-115 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* High-Contrast Editorial Overlay Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 dark:from-[#070809]/95 via-transparent to-transparent z-10 flex flex-col justify-between p-3 sm:p-4">
                    {/* Top CAD Corner Markers */}
                    <div className="flex justify-between items-center font-mono text-[10px] text-[#f4f3ef] border-b border-[#f4f3ef]/30 pb-2">
                      <span className="flex items-center gap-1 font-bold">
                        <Compass className="w-3.5 h-3.5 text-[#d4ff00]" />
                        {t("cornerLabel")}
                      </span>
                      <span className="bg-[#ff3b00] text-[#f4f3ef] font-bold px-2 py-0.5 border border-[#111111] flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" />
                        {t("rawFrame")}
                      </span>
                    </div>

                    {/* Bottom Technical Identity Tag */}
                    <div className="pt-2 border-t border-[#f4f3ef]/30 flex items-center justify-between text-[11px] font-mono text-[#f4f3ef]">
                      <div className="font-extrabold text-sm text-[#f4f3ef]">
                        {commonT("brandName")}
                      </div>
                      <span className="bg-[#0047ff] text-[#d4ff00] font-bold px-2 py-0.5 border border-[#111111] dark:border-[#2b3038]">
                        {t("tagHandle")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Corner Flash */}
              <div className="absolute top-0 end-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#d4ff00] border-b border-s border-[#111111] dark:border-[#2b3038] z-20" />
            </div>

            {/* Grid-locking Side Annotations */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs font-mono text-[#555555] dark:text-[#9fa4ab] border-t border-[#111111] dark:border-[#2b3038] pt-2.5 sm:pt-3 max-w-sm sm:max-w-md mx-auto">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#0047ff] dark:text-[#d4ff00]" />
                {t("annotationTypography")}
              </span>
              <span className="font-bold text-[#111111] dark:text-[#f2f1ec]">{t("annotationEdition")}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Transition Scroll Cue to Selected Work */}
      <div className="w-full border-t border-[#111111] dark:border-[#2b3038] bg-[#e9e7e1] dark:bg-[#141618] px-4 sm:px-8 py-3 text-xs font-bold text-[#111111] dark:text-[#f2f1ec] flex items-center justify-between z-20 relative select-none">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="w-2 h-2 bg-[#0047ff] dark:bg-[#d4ff00] animate-ping" />
          <span>{t("scrollCue")}</span>
        </div>
        <ArrowActionIcon className="w-4 h-4 text-[#0047ff] dark:text-[#d4ff00] animate-bounce shrink-0" />
        <span className="font-mono text-[11px] text-[#555555] dark:text-[#9fa4ab] hidden sm:inline">
          {t("sectionId")}
        </span>
      </div>
    </section>
  );
}
