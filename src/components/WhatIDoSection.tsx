"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Terminal, Layers, Database, Smartphone, Palette } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionGeometry } from "./SectionGeometry";

const PILLAR_KEYS = [
  { id: "visualization-data", icon: Layers },
  { id: "fullstack-data-engineering", icon: Database },
  { id: "cross-platform-native", icon: Smartphone },
  { id: "design-systems-architecture", icon: Palette },
] as const;

export function WhatIDoSection() {
  const t = useTranslations("WhatIDo");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} id="what-i-do" className="py-12 sm:py-20 border-b border-[#111111] dark:border-[#2b3038] bg-swiss-grid relative overflow-hidden">
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="what-i-do" scrollYProgress={scrollYProgress} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Banner */}
        <div className="mb-8 sm:mb-14 border-b border-[#111111] dark:border-[#2b3038] pb-4 sm:pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] dark:bg-[#141618] p-4 sm:p-5 border shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff]">
          <div>
            <div className="text-xs font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Terminal className="w-4 h-4 text-[#ff3b00]" />
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] dark:text-[#f2f1ec] tracking-tight uppercase">
              {t("heading")}
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555] dark:text-[#9fa4ab]">
            EVIDENCE-BASED ENGINEERING MINDSET
          </div>
        </div>

        {/* Editorial Sub-Manifesto Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-14 p-5 sm:p-8 bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] border-2 border-[#111111] dark:border-[#2b3038] shadow-[6px_6px_0px_#0047ff] sm:shadow-[8px_8px_0px_#0047ff] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-[65ch]">
            <span className="text-xs font-mono text-[#d4ff00] font-bold uppercase tracking-wider">
              {t("calloutTag")}
            </span>
            <p className="text-sm sm:text-lg md:text-xl font-bold leading-relaxed text-[#f4f3ef]">
              {t("calloutText")}
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-[#cccccc] dark:text-[#9fa4ab] border-t md:border-t-0 md:border-s border-[#333333] dark:border-[#2b3038] pt-3 md:pt-0 md:ps-6">
            <div>{t("calloutFooter")}</div>
            <div className="text-[#d4ff00] font-bold mt-1">{t("evidenceStamp")}</div>
          </div>
        </motion.div>

        {/* 4 Open Editorial Pillars Stack */}
        <div className="space-y-6 sm:space-y-10">
          {PILLAR_KEYS.map((item, idx) => {
            const IconComponent = item.icon;
            const number = t(`pillars.${item.id}.number`);
            const title = t(`pillars.${item.id}.title`);
            const englishTitle = t(`pillars.${item.id}.englishTitle`);
            const statement = t(`pillars.${item.id}.statement`);
            const manifesto = t(`pillars.${item.id}.manifesto`);
            const evidenceStack = t.raw(`pillars.${item.id}.evidenceStack`) as string[];
            const repos = t(`pillars.${item.id}.repos`);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#f4f3ef] dark:bg-[#141618] border-2 border-[#111111] dark:border-[#2b3038] shadow-[5px_5px_0px_#111111] dark:shadow-[5px_5px_0px_#0047ff] overflow-hidden group hover:shadow-[8px_8px_0px_#0047ff] dark:hover:shadow-[8px_8px_0px_#d4ff00] transition-all duration-300"
              >
                {/* Pillar Header Bar */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-mono text-xs border-b border-[#111111] dark:border-[#2b3038]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg font-black text-[#d4ff00]">
                      {number}
                    </span>
                    <span className="font-bold tracking-wider text-[11px] sm:text-xs">
                      PILLAR &#47;&#47; {englishTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#cccccc] dark:text-[#9fa4ab] font-sans">
                    <IconComponent className="w-3.5 h-3.5 text-[#d4ff00] shrink-0" />
                    <span>{t("reposTag")}{repos}</span>
                  </div>
                </div>

                {/* Pillar Main Editorial Content Grid */}
                <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  
                  {/* Start Column: Title & Statement Quote */}
                  <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] dark:text-[#f2f1ec] tracking-tight">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-[#111111] dark:text-[#f2f1ec] leading-relaxed border-s-4 border-[#0047ff] dark:border-[#d4ff00] ps-3 sm:ps-4 py-1">
                      &ldquo;{statement}&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm text-[#555555] dark:text-[#9fa4ab] leading-relaxed font-medium">
                      {manifesto}
                    </p>
                  </div>

                  {/* End Column: 3 Structured Evidence Stack Cards */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="text-xs font-mono text-[#0047ff] dark:text-[#d4ff00] font-bold uppercase mb-2">
                      {t("evidenceHeader")}
                    </div>
                    <div className="space-y-2.5">
                      {evidenceStack.map((evidence, eIdx) => (
                        <div
                          key={eIdx}
                          className="p-3 sm:p-3.5 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] flex items-start gap-2.5 sm:gap-3 text-xs font-semibold text-[#111111] dark:text-[#f2f1ec] group-hover:border-[#0047ff] dark:group-hover:border-[#d4ff00] transition-colors"
                        >
                          <span className="font-mono text-[#0047ff] dark:text-[#d4ff00] font-bold shrink-0 text-sm">
                            {isRtl ? `۰${eIdx + 1}.` : `0${eIdx + 1}.`}
                          </span>
                          <span className="leading-relaxed">{evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Decorative Line Indicator */}
                <div className="h-1.5 w-full bg-[#111111] dark:bg-[#070809] group-hover:bg-[#0047ff] dark:group-hover:bg-[#d4ff00] transition-colors" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
