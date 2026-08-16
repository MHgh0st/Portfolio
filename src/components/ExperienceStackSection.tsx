"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Wrench, MoveLeft, MoveRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionGeometry } from "./SectionGeometry";

const CATEGORY_CONFIGS = [
  {
    id: "frontend-architecture",
    coreTools: [
      "Next.js 16 (App Router)",
      "React 19 / Compiler",
      "TypeScript 5",
      "Tailwind CSS v4",
      "HeroUI v3 / Aria",
      "Zustand / Motion",
    ],
  },
  {
    id: "visualization-graphics",
    coreTools: [
      "@xyflow/react",
      "D3.js (Sankey / Scale)",
      "elkjs (Auto Layout)",
      "Web Workers",
      "Apache Arrow / MsgPack",
      "ApexCharts",
    ],
  },
  {
    id: "cross-platform-native",
    coreTools: [
      "React Native 0.86",
      "Expo SDK 57 / Router",
      "Shopify Skia (2D Graphics)",
      "Reanimated 4 / Worklets",
      "Uniwind (Tailwind for RN)",
      "@gorhom/bottom-sheet",
    ],
  },
  {
    id: "backend-data-pipelines",
    coreTools: [
      "Python 3 (FastAPI)",
      "Polars (High-Speed DataFrames)",
      "PostgreSQL / Supabase",
      "Docker / Docker Compose",
      "ConnectorX / PyArrow",
      "NextAuth.js / JWT",
    ],
  },
] as const;

export function ExperienceStackSection() {
  const t = useTranslations("ExperienceStack");
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

  const headerX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : isRtl ? [-50, 50] : [50, -50]
  );
  const bannerScale = useTransform(scrollYProgress, [0.1, 0.4], [0.98, 1]);

  const FlowArrow = isRtl ? MoveLeft : MoveRight;

  return (
    <section
      ref={containerRef}
      id="experience-stack"
      className="py-12 sm:py-20 border-b border-[#111111] dark:border-[#2b3038] bg-swiss-grid relative overflow-hidden"
    >
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="stack" scrollYProgress={scrollYProgress} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Banner */}
        <motion.div
          style={{ x: headerX }}
          className="mb-8 sm:mb-14 border-b border-[#111111] dark:border-[#2b3038] pb-4 sm:pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] dark:bg-[#141618] p-4 sm:p-5 border shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff]"
        >
          <div>
            <div className="text-xs font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Wrench className="w-4 h-4 text-[#ff3b00]" />
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] dark:text-[#f2f1ec] tracking-tight uppercase">
              {t("heading")}
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555] dark:text-[#9fa4ab]">
            WORKFLOW & TECHNICAL TOOLKIT
          </div>
        </motion.div>

        {/* Conceptual Manifesto with Direction-Aware Flow Arrows */}
        <motion.div
          style={{ scale: bannerScale }}
          className="mb-8 sm:mb-16 p-5 sm:p-8 bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] border-2 border-[#111111] dark:border-[#2b3038] shadow-[6px_6px_0px_#0047ff] sm:shadow-[8px_8px_0px_#0047ff] grid grid-cols-1 md:grid-cols-4 gap-6 items-center origin-center"
        >
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono text-[#d4ff00] font-bold uppercase tracking-wider">
              {t("workflowTag")}
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-base sm:text-xl md:text-2xl font-black text-[#f4f3ef] leading-snug">
              <span>{t("workflow.idea")}</span>
              <FlowArrow className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047ff] dark:text-[#d4ff00] shrink-0" />
              <span>{t("workflow.designSystem")}</span>
              <FlowArrow className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4ff00] shrink-0" />
              <span>{t("workflow.engineering")}</span>
              <FlowArrow className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff3b00] shrink-0" />
              <span className="text-[#d4ff00]">{t("workflow.finalProduct")}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#cccccc] dark:text-[#9fa4ab] font-medium leading-relaxed max-w-[60ch]">
              {t("workflow.text")}
            </p>
          </div>
        </motion.div>

        {/* 4 Architectural Stack Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CATEGORY_CONFIGS.map((config, idx) => {
            const number = t(`categories.${config.id}.number`);
            const title = t(`categories.${config.id}.title`);
            const englishTitle = t(`categories.${config.id}.englishTitle`);
            const tagline = t(`categories.${config.id}.tagline`);
            const workflowMindset = t(`categories.${config.id}.workflowMindset`);

            return (
              <motion.div
                key={config.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#f4f3ef] dark:bg-[#141618] border-2 border-[#111111] dark:border-[#2b3038] p-5 sm:p-8 shadow-[5px_5px_0px_#111111] dark:shadow-[5px_5px_0px_#0047ff] hover:shadow-[8px_8px_0px_#0047ff] dark:hover:shadow-[8px_8px_0px_#d4ff00] transition-all space-y-5 sm:space-y-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Category Header Bar */}
                  <div className="flex items-center justify-between border-b border-[#111111] dark:border-[#2b3038] pb-3 font-mono text-xs gap-2">
                    <span className="text-xl font-black text-[#0047ff] dark:text-[#d4ff00] group-hover:text-[#ff3b00] transition-colors shrink-0">
                      {number}
                    </span>
                    <span className="font-bold text-[#111111] dark:text-[#f2f1ec] text-[11px] sm:text-xs truncate">
                      {englishTitle}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#111111] dark:text-[#f2f1ec] tracking-tight">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555555] dark:text-[#9fa4ab] font-semibold leading-relaxed">
                    {tagline}
                  </p>

                  {/* Core Tools Badges */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    {config.coreTools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 bg-[#e9e7e1] dark:bg-[#1b1e22] text-[#111111] dark:text-[#f2f1ec] font-bold border border-[#111111] dark:border-[#2b3038] group-hover:border-[#0047ff] dark:group-hover:border-[#d4ff00] group-hover:bg-[#111111] dark:group-hover:bg-[#0c0d0e] group-hover:text-[#f4f3ef] dark:group-hover:text-[#d4ff00] transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Workflow Mindset Footer */}
                <div className="pt-4 border-t border-[#111111] dark:border-[#2b3038] text-xs text-[#555555] dark:text-[#9fa4ab] font-semibold flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0047ff] dark:text-[#d4ff00] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {workflowMindset}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
