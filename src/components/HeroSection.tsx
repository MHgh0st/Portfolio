"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowDownLeft, Terminal, Sparkles, Compass, ZoomIn } from "lucide-react";
import { SectionGeometry } from "./SectionGeometry";
import { useLightbox } from "./ImageLightboxProvider";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openImage } = useLightbox();

  // Subtle, smooth spring physics for micro-parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Softened spring parameters for organic, subtle floating without jarring jumps
  const springConfig = { stiffness: 60, damping: 25, mass: 0.8 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  // Very gentle counter displacement
  const counterDx = useTransform(dx, (v) => -v * 0.7);
  const counterDy = useTransform(dy, (v) => -v * 0.7);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    // Reduced parallax range by 4x to be subtle and non-distracting
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

  // Integrated Section Geometry Transformations
  const typeTranslateY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const typeScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const portraitTranslateY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], [0, -350]);

  // Integrated Material/Y2K Abstract Geometric Form Animations
  const capsuleRotate = useTransform(scrollYProgress, [0, 1], [45, 225]);
  const capsuleScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const circleMorphX = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full border-b border-[#111111] bg-swiss-grid overflow-hidden min-h-[92vh] flex flex-col justify-between select-none"
    >
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="hero" scrollYProgress={scrollYProgress} />

      {/* Background Kinetic Oversized Backdrop Text (Scroll Scrubbed) */}
      <motion.div
        style={{ x: bgTextX }}
        className="absolute top-1/3 -right-20 text-[14vw] font-black text-[#111111]/[0.04] leading-none pointer-events-none whitespace-nowrap font-mono z-0"
      >
        MHGH0ST // CREATIVE DEVELOPER // FRONTEND ARCHITECT
      </motion.div>

      {/* Main Asymmetric Interlocking Layout */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 my-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Right Column (RTL Start): Personal Identity & Kinetic Typography */}
          <motion.div
            style={{ y: typeTranslateY, scale: typeScale }}
            className="lg:col-span-7 space-y-6 relative origin-right"
          >
            {/* Role & Eyebrow */}
            <motion.div
              style={{ x: counterDx, y: counterDy }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] text-[#f4f3ef] text-xs font-bold border border-[#111111]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" />
              <span>طراح محصول و توسعه‌دهنده خلاق</span>
            </motion.div>

            {/* Name Lockup as Graphic Hero Anchor */}
            <div className="overflow-visible relative">
              <motion.h1
                style={{ x: dx, y: dy }}
                data-cursor="interactive"
                data-cursor-label="IDENTITY"
                className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight leading-[0.98] text-[#111111]"
              >
                محمدحسین <br />
                <span className="text-[#0047ff]">غلامـی</span>
              </motion.h1>

              {/* Floating Technical Stamp Overlay */}
              <motion.div
                style={{ x: counterDx, y: counterDy }}
                className="absolute -top-6 left-4 bg-[#d4ff00] text-[#111111] text-[11px] font-mono font-bold px-3 py-1 border border-[#111111] shadow-[3px_3px_0px_#111111] hidden md:block"
              >
                // SENIOR_FRONTEND_ARCHITECT
              </motion.div>
            </div>

            {/* Core Persian Statement */}
            <motion.p className="text-lg sm:text-2xl font-bold text-[#111111] leading-relaxed max-w-[48ch] border-r-4 border-[#0047ff] pr-4 py-1">
              خلق سامانه‌های وب با ظرافت مهندسی، معماری مقیاس‌پذیر و هویت بصری
              متمایز.
            </motion.p>

            {/* Paragraph Sub-description */}
            <motion.p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-[55ch] font-medium">
              تمرکز من بر توسعه سیستم‌های پیچیده فرانت‌اند، بهینه‌سازی دقیق Core
              Web Vitals و خلق رابط‌های کاربری است که مرز بین مهندسی نرم‌افزار و
              هنر دیجیتال را کمرنگ می‌کنند.
            </motion.p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold">
              <a
                href="#projects"
                data-cursor="interactive"
                data-cursor-label="PROJECTS"
                className="px-7 py-4 bg-[#0047ff] text-[#f4f3ef] hover:bg-[#111111] transition-all flex items-center gap-2 border border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>مشاهده کارهای منتخب</span>
                <ArrowDownLeft className="w-4 h-4 text-[#d4ff00]" />
              </a>

              <a
                href="#contact"
                data-cursor="interactive"
                data-cursor-label="CONTACT"
                className="px-7 py-4 bg-[#f4f3ef] text-[#111111] hover:bg-[#e9e7e1] transition-all border border-[#111111] shadow-[4px_4px_0px_#111111] flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>شروع گفتگوی کاری</span>
              </a>
            </div>
          </motion.div>

          {/* Left Column (RTL End): Integrated Editorial Photo Portrait Composition with Scroll Rotation */}
          <motion.div
            style={{ y: portraitTranslateY, rotate: portraitRotate }}
            className="lg:col-span-5 relative origin-center"
          >
            {/* Integrated Portrait Frame (Swiss Editorial x Neo-Brutalist Canvas) */}
            <div
              onClick={() =>
                openImage({
                  src: "/header.jpg",
                  title: "محمدحسین غلامی // PORTRAIT_REF_01",
                  alt: "محمدحسین غلامی",
                })
              }
              className="relative w-full aspect-[4/5] bg-[#e9e7e1] border-2 border-[#111111] shadow-[8px_8px_0px_#111111] overflow-hidden group cursor-zoom-in"
              title="برای مشاهده عکس با رزولوشن اصلی کلیک کنید"
            >
              {/* Halftone / Graphic Grid Overlay */}
              <div className="absolute inset-0 bg-dot-grid opacity-30 z-10 pointer-events-none" />

              {/* Photo Portrait Element */}
              <div className="absolute inset-0 flex items-center justify-center p-3 bg-[#f4f3ef]">
                <div className="w-full h-full border border-[#111111] relative overflow-hidden bg-[#e9e7e1]">
                  {/* Real Photo Image from /public/header.jpg */}
                  <Image
                    src="/header.jpg"
                    alt="محمدحسین غلامی"
                    fill
                    priority
                    className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* High-Contrast Editorial Overlay Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent z-10 flex flex-col justify-between p-4">
                    {/* Top CAD Corner Markers */}
                    <div className="flex justify-between items-center font-mono text-[10px] text-[#f4f3ef] border-b border-[#f4f3ef]/30 pb-2">
                      <span className="flex items-center gap-1 font-bold">
                        <Compass className="w-3.5 h-3.5 text-[#d4ff00]" />
                        PORTRAIT_REF // 01
                      </span>
                      <span className="bg-[#ff3b00] text-[#f4f3ef] font-bold px-1.5 py-0.5 border border-[#111111] flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" />
                        [RAW_FRAME]
                      </span>
                    </div>

                    {/* Bottom Technical Identity Tag */}
                    <div className="pt-2 border-t border-[#f4f3ef]/30 flex items-center justify-between text-[11px] font-mono text-[#f4f3ef]">
                      <div className="font-extrabold text-sm text-[#f4f3ef]">
                        محمدحسین غلامی
                      </div>
                      <span className="bg-[#0047ff] text-[#d4ff00] font-bold px-2 py-0.5 border border-[#111111]">
                        @MHGH0ST
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Corner Flash */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#d4ff00] border-b border-l border-[#111111] z-20" />
            </div>

            {/* Grid-locking Side Annotations */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#555555] border-t border-[#111111] pt-3">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#0047ff]" />
                طراحی شده با تایپوگرافی کلمه
              </span>
              <span className="font-bold text-[#111111]">نسخه ۲۰۲۶</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Transition Scroll Cue to Selected Work */}
      <div className="w-full border-t border-[#111111] bg-[#e9e7e1] px-4 sm:px-8 py-3 text-xs font-bold text-[#111111] flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="w-2 h-2 bg-[#0047ff] animate-ping" />
          <span>[اسکرول کنید // نمونه‌کارهای منتخب در ادامه]</span>
        </div>
        <ArrowDownLeft className="w-4 h-4 text-[#0047ff] animate-bounce" />
        <span className="font-mono text-[11px] text-[#555555]">
          MHGH0ST.DEV // SECTION_01
        </span>
      </div>
    </section>
  );
}
