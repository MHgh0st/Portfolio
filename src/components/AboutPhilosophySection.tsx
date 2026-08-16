"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Feather, UserRoundCheck, Lightbulb } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionGeometry } from "./SectionGeometry";

export function AboutPhilosophySection() {
  const t = useTranslations("AboutPhilosophy");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bannerX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : isRtl ? [-50, 50] : [50, -50]
  );
  const quoteScale = useTransform(scrollYProgress, [0.1, 0.4], [0.98, 1]);

  const steps = t.raw("steps") as string[];
  const principles = t.raw("principles") as Array<{
    number: string;
    title: string;
    statement: string;
  }>;

  return (
    <section ref={containerRef} id="about-philosophy" className="py-12 sm:py-20 border-b border-[#111111] dark:border-[#2b3038] bg-[#f4f3ef] dark:bg-[#0c0d0e] relative overflow-hidden">
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="about" scrollYProgress={scrollYProgress} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Banner */}
        <motion.div style={{ x: bannerX }} className="mb-8 sm:mb-14 border-b border-[#111111] dark:border-[#2b3038] pb-4 sm:pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] dark:bg-[#141618] p-4 sm:p-5 border shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff]">
          <div>
            <div className="text-xs font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Feather className="w-4 h-4 text-[#ff3b00]" />
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] dark:text-[#f2f1ec] tracking-tight uppercase">
              {t("heading")}
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555] dark:text-[#9fa4ab]">
            PERSONAL PERSPECTIVE & PHILOSOPHY
          </div>
        </motion.div>

        {/* Editorial Personal Narrative Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-8 sm:mb-16">
          
          {/* Start Column: Main Personal Narrative Quote */}
          <motion.div
            style={{ scale: quoteScale }}
            className="lg:col-span-7 bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] border-2 border-[#111111] dark:border-[#2b3038] p-5 sm:p-8 lg:p-10 shadow-[6px_6px_0px_#0047ff] sm:shadow-[8px_8px_0px_#0047ff] space-y-5 sm:space-y-6 relative overflow-hidden origin-center"
          >
            <div className="absolute inset-0 bg-swiss-grid opacity-10 pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0047ff] text-[#d4ff00] text-xs font-mono font-bold border border-[#111111] dark:border-[#2b3038]">
              <UserRoundCheck className="w-3.5 h-3.5 text-[#d4ff00]" />
              <span>{t("personalTag")}</span>
            </div>

            <h3 className="text-xl sm:text-3xl lg:text-4xl font-black leading-tight text-[#f4f3ef]">
              {t("narrativeHeading")}
            </h3>

            <p className="text-xs sm:text-sm text-[#cccccc] dark:text-[#9fa4ab] font-medium leading-relaxed max-w-[60ch]">
              {t("narrativeText")}
            </p>

            <div className="pt-4 border-t border-[#333333] dark:border-[#2b3038] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#888888] dark:text-[#6e747e]">
              <span>{t("narrativeFooter")}</span>
              <span className="text-[#d4ff00] font-bold">{t("focusStamp")}</span>
            </div>
          </motion.div>

          {/* End Column: Personal Approach & Mindset Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-[#f4f3ef] dark:bg-[#141618] border-2 border-[#111111] dark:border-[#2b3038] p-5 sm:p-8 shadow-[5px_5px_0px_#111111] dark:shadow-[5px_5px_0px_#0047ff] space-y-4 sm:space-y-6"
          >
            <div className="border-b border-[#111111] dark:border-[#2b3038] pb-3 flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-[#0047ff] dark:text-[#d4ff00]">{t("approachHeader")}</span>
              <Lightbulb className="w-4 h-4 text-[#ff3b00]" />
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-[#111111] dark:text-[#f2f1ec] font-semibold leading-relaxed">
              {steps.map((stepText, idx) => (
                <p key={idx} className="p-3.5 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038]">
                  {stepText}
                </p>
              ))}
            </div>
          </motion.div>

        </div>

        {/* 3 Core Philosophical Principles Stack */}
        <div className="space-y-4 sm:space-y-6">
          <div className="text-xs font-mono font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase tracking-wider mb-2">
            {t("principlesHeading")}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {principles.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#f4f3ef] dark:bg-[#141618] border-2 border-[#111111] dark:border-[#2b3038] p-5 sm:p-6 shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff] hover:shadow-[7px_7px_0px_#0047ff] dark:hover:shadow-[7px_7px_0px_#d4ff00] transition-all space-y-3 sm:space-y-4 group"
              >
                <div className="flex items-center justify-between border-b border-[#111111] dark:border-[#2b3038] pb-2.5">
                  <span className="font-mono text-xl font-black text-[#0047ff] dark:text-[#d4ff00] group-hover:text-[#ff3b00] transition-colors">
                    {item.number}
                  </span>
                  <Compass className="w-4 h-4 text-[#111111] dark:text-[#f2f1ec]" />
                </div>

                <h4 className="text-base sm:text-lg font-black text-[#111111] dark:text-[#f2f1ec]">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#444444] dark:text-[#9fa4ab] font-semibold leading-relaxed">
                  {item.statement}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
