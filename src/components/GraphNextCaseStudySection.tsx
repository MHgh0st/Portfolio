"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  ShieldCheck,
  Share2,
  Image as ImageIcon,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { SectionGeometry } from "./SectionGeometry";
import { useLightbox } from "./ImageLightboxProvider";

const CHAPTER_KEYS = [
  "overview",
  "challenge",
  "approach",
  "visuals",
  "designSystem",
  "engineering",
  "outcome",
] as const;

type ChapterKey = (typeof CHAPTER_KEYS)[number];

export function GraphNextCaseStudySection() {
  const t = useTranslations("GraphNextCaseStudy");
  const cursorT = useTranslations("Cursor");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const containerRef = useRef<HTMLDivElement>(null);
  const { openImage } = useLightbox();
  const [activeChapterId, setActiveChapterId] = useState<ChapterKey>("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [images] = useState<string[]>([
    "/Projects/GraphNext/1.png",
    "/Projects/GraphNext/2.png",
    "/Projects/GraphNext/3.png",
    "/Projects/GraphNext/4.png",
    "/Projects/GraphNext/5.png",
    "/Projects/GraphNext/6.png",
  ]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Continuous Scroll Animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : isRtl ? [60, -60] : [-60, 60]
  );
  const heroCardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.98, 1]);
  const chapterTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [30, -15]
  );

  const activeChapterNumber = t(`chapters.${activeChapterId}.number`);
  const activeChapterEngTitle = t(`chapters.${activeChapterId}.englishTitle`);

  return (
    <section
      ref={containerRef}
      id="graphnext-case-study"
      className="py-12 sm:py-20 border-b border-[#111111] dark:border-[#2b3038] bg-swiss-grid relative overflow-hidden"
    >
      {/* Integrated Section Geometry */}
      <SectionGeometry
        variant="case-study-graphnext"
        scrollYProgress={scrollYProgress}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Banner */}
        <motion.div
          style={{ x: headerX }}
          className="mb-8 sm:mb-12 border-b border-[#111111] dark:border-[#2b3038] pb-4 sm:pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] dark:bg-[#141618] p-4 sm:p-5 border shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff]"
        >
          <div>
            <div className="text-xs font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Share2 className="w-4 h-4 text-[#ff3b00]" />
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] dark:text-[#f2f1ec] tracking-tight uppercase">
              {t("heading")}
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555] dark:text-[#9fa4ab]">
            SAMANEH FEKR &#47;&#47; CASE_STUDY_02
          </div>
        </motion.div>

        {/* Hero Banner for GraphNext */}
        <motion.div
          style={{ scale: heroCardScale }}
          className="mb-8 sm:mb-12 bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] border-2 border-[#111111] dark:border-[#2b3038] p-5 sm:p-8 lg:p-10 shadow-[6px_6px_0px_#0047ff] sm:shadow-[8px_8px_0px_#0047ff] relative overflow-hidden origin-center"
        >
          <div className="absolute inset-0 bg-swiss-grid opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0047ff] text-[#d4ff00] text-xs font-mono font-bold border border-[#111111] dark:border-[#2b3038]">
                <Terminal className="w-3.5 h-3.5" />
                <span>SAMANEH_FEKR &#47;&#47; HIGH_PERFORMANCE_VISUALIZATION</span>
              </div>

              <h3 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-[#f4f3ef]">
                {t("heroTitle")}
              </h3>

              <p className="text-xs sm:text-sm text-[#cccccc] dark:text-[#9fa4ab] font-medium leading-relaxed max-w-[65ch]">
                {t("heroParagraph")}
              </p>
            </div>

            {/* Quick Tech Specs Counter Box */}
            <div className="lg:col-span-4 bg-[#f4f3ef] dark:bg-[#141618] text-[#111111] dark:text-[#f2f1ec] p-4 sm:p-5 border-2 border-[#111111] dark:border-[#2b3038] shadow-[4px_4px_0px_#d4ff00] dark:shadow-[4px_4px_0px_#0047ff] font-mono text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b border-[#111111] dark:border-[#2b3038] pb-1.5 gap-2">
                <span className="text-[#555555] dark:text-[#9fa4ab] shrink-0">{t("specs.frontend")}</span>
                <span className="font-bold text-[#0047ff] dark:text-[#d4ff00]">
                  Next.js 16 + XYFlow
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#111111] dark:border-[#2b3038] pb-1.5 gap-2">
                <span className="text-[#555555] dark:text-[#9fa4ab] shrink-0">{t("specs.backend")}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec]">
                  Python (FastAPI + Polars)
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#111111] dark:border-[#2b3038] pb-1.5 gap-2">
                <span className="text-[#555555] dark:text-[#9fa4ab] shrink-0">{t("specs.database")}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec]">
                  PostgreSQL + Docker
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#555555] dark:text-[#9fa4ab] shrink-0">{t("specs.dataTransfer")}</span>
                <span className="font-bold text-[#ff3b00]">
                  Arrow + MsgPack + Zstd
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chapter Navigation */}
        <div className="mb-6 sm:mb-8 pb-2 border-b border-[#111111] dark:border-[#2b3038] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {CHAPTER_KEYS.map((chapKey) => {
            const isSelected = activeChapterId === chapKey;
            const number = t(`chapters.${chapKey}.number`);
            const title = t(`chapters.${chapKey}.title`);

            return (
              <button
                key={chapKey}
                onClick={() => setActiveChapterId(chapKey)}
                data-cursor="interactive"
                data-cursor-label={cursorT("chapter")}
                className={`min-h-[42px] px-3.5 sm:px-4 py-2 text-xs font-bold transition-all cursor-pointer border shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#111111] dark:bg-[#0047ff] text-[#f4f3ef] dark:text-[#ffffff] border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#0047ff] dark:shadow-[3px_3px_0px_#d4ff00]"
                    : "bg-[#f4f3ef] dark:bg-[#141618] text-[#111111] dark:text-[#f2f1ec] border-[#111111] dark:border-[#2b3038] hover:bg-[#e9e7e1] dark:hover:bg-[#1b1e22] active:translate-y-0.5"
                }`}
              >
                <span
                  className={`font-mono font-bold ${isSelected ? "text-[#d4ff00] dark:text-[#d4ff00]" : "text-[#0047ff] dark:text-[#3b82f6]"}`}
                >
                  {number}
                </span>
                <span className="whitespace-nowrap">{title}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Dynamic Editorial Content */}
        <motion.div
          style={{ y: chapterTranslateY }}
          className="bg-[#f4f3ef] dark:bg-[#141618] border-2 border-[#111111] dark:border-[#2b3038] p-5 sm:p-8 lg:p-10 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#0047ff] sm:shadow-[8px_8px_0px_#111111] sm:dark:shadow-[8px_8px_0px_#0047ff] min-h-[380px]"
        >
          {/* 01 — Overview */}
          {activeChapterId === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] dark:border-[#2b3038] pb-3">
                <span className="text-xl font-black text-[#0047ff] dark:text-[#d4ff00]">{activeChapterNumber}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider">
                  CHAPTER &#47;&#47; {activeChapterEngTitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] dark:text-[#f2f1ec]">
                {t("chapters.overview.subTitle")}
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-[#111111] dark:text-[#f2f1ec] font-semibold leading-relaxed">
                {t("chapters.overview.text")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4 font-mono text-xs">
                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1">
                  <span className="text-[#555555] dark:text-[#9fa4ab]">{t("chapters.overview.boxes.role")}</span>
                  <div className="font-bold text-[#111111] dark:text-[#f2f1ec]">
                    {t("chapters.overview.boxes.roleVal")}
                  </div>
                </div>
                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1">
                  <span className="text-[#555555] dark:text-[#9fa4ab]">{t("chapters.overview.boxes.domain")}</span>
                  <div className="font-bold text-[#0047ff] dark:text-[#d4ff00]">
                    {t("chapters.overview.boxes.domainVal")}
                  </div>
                </div>
                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1">
                  <span className="text-[#555555] dark:text-[#9fa4ab]">{t("chapters.overview.boxes.stack")}</span>
                  <div className="font-bold text-[#ff3b00]">
                    {t("chapters.overview.boxes.stackVal")}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 02 — Big Data Challenges */}
          {activeChapterId === "challenge" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] dark:border-[#2b3038] pb-3">
                <span className="text-xl font-black text-[#0047ff] dark:text-[#d4ff00]">{activeChapterNumber}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider">
                  CHAPTER &#47;&#47; {activeChapterEngTitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] dark:text-[#f2f1ec]">
                {t("chapters.challenge.subTitle")}
              </h3>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-[#111111] dark:text-[#f2f1ec] font-semibold leading-relaxed">
                {(t.raw("chapters.challenge.points") as string[]).map((pt, idx) => {
                  const borderColors = ["border-s-[#ff3b00]", "border-s-[#0047ff] dark:border-s-[#3b82f6]", "border-s-[#d4ff00]"];
                  return (
                    <p key={idx} className={`p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] border-s-4 ${borderColors[idx % 3]}`}>
                      {pt}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* 03 — Flow & Sankey Architecture */}
          {activeChapterId === "approach" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] dark:border-[#2b3038] pb-3">
                <span className="text-xl font-black text-[#0047ff] dark:text-[#d4ff00]">{activeChapterNumber}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider">
                  CHAPTER &#47;&#47; {activeChapterEngTitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] dark:text-[#f2f1ec]">
                {t("chapters.approach.subTitle")}
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1">
                  <h4 className="font-bold text-[#0047ff] dark:text-[#d4ff00] text-xs font-mono">
                    {t("chapters.approach.sections.backend")}
                  </h4>
                  <p className="text-xs text-[#111111] dark:text-[#f2f1ec] font-semibold leading-relaxed">
                    {t("chapters.approach.sections.backendText")}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1">
                  <h4 className="font-bold text-[#0047ff] dark:text-[#d4ff00] text-xs font-mono">
                    {t("chapters.approach.sections.sankey")}
                  </h4>
                  <p className="text-xs text-[#111111] dark:text-[#f2f1ec] font-semibold leading-relaxed">
                    {t("chapters.approach.sections.sankeyText")}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1">
                  <h4 className="font-bold text-[#0047ff] dark:text-[#d4ff00] text-xs font-mono">
                    {t("chapters.approach.sections.filter")}
                  </h4>
                  <p className="text-xs text-[#111111] dark:text-[#f2f1ec] font-semibold leading-relaxed">
                    {t("chapters.approach.sections.filterText")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 04 — Visuals & Media Demo */}
          {activeChapterId === "visuals" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] dark:border-[#2b3038] pb-3">
                <span className="text-xl font-black text-[#0047ff] dark:text-[#d4ff00]">{activeChapterNumber}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider">
                  CHAPTER &#47;&#47; {activeChapterEngTitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] dark:text-[#f2f1ec]">
                {t("chapters.visuals.subTitle")}
              </h3>

              {images && images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      onClick={() =>
                        openImage({
                          src: imgSrc,
                          title: `SAMANEH_FEKR &#47;&#47; VISUAL_0${idx + 1}`,
                          alt: `${t("chapters.visuals.imgAlt")} ${idx + 1}`,
                        })
                      }
                      className="relative w-full aspect-video border-2 border-[#111111] dark:border-[#2b3038] overflow-hidden bg-[#e9e7e1] dark:bg-[#1b1e22] cursor-pointer group shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff] hover:shadow-[6px_6px_0px_#0047ff] dark:hover:shadow-[6px_6px_0px_#d4ff00] active:translate-y-0.5 transition-all"
                      title={t("chapters.visuals.zoomHint")}
                    >
                      <Image
                        src={imgSrc}
                        alt={`${t("chapters.visuals.imgAlt")} ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#111111]/30 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end sm:items-center justify-center p-2">
                        <div className="bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] px-2.5 py-1 sm:px-3 sm:py-1.5 border border-[#111111] dark:border-[#2b3038] shadow-[2px_2px_0px_#d4ff00] text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1.5">
                          <ZoomIn className="w-3.5 h-3.5 text-[#d4ff00]" />
                          <span>{t("chapters.visuals.zoomHint")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full aspect-video border-2 border-[#111111] dark:border-[#2b3038] bg-[#e9e7e1] dark:bg-[#1b1e22] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#0047ff]">
                  <div className="absolute inset-0 bg-swiss-grid opacity-50 pointer-events-none" />

                  <div className="flex justify-between items-center font-mono text-[11px] text-[#111111] dark:text-[#f2f1ec] z-10 border-b border-[#111111] dark:border-[#2b3038] pb-2">
                    <span className="font-bold">
                      &#47;&#47; VISUAL_CANVAS &#47;&#47; GRAPHNEXT_DEMO
                    </span>
                    <span className="bg-[#d4ff00] text-[#111111] font-bold px-2 py-0.5 border border-[#111111] dark:border-[#2b3038]">
                      {t("chapters.visuals.placeholderBadge")}
                    </span>
                  </div>

                  <div className="my-auto text-center space-y-2.5 z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto border-2 border-[#111111] dark:border-[#2b3038] bg-[#0047ff] text-[#f4f3ef] flex items-center justify-center shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#d4ff00]">
                      <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4ff00]" />
                    </div>
                    <h5 className="font-black text-sm sm:text-base text-[#111111] dark:text-[#f2f1ec]">
                      GRAPHNEXT INTERACTIVE DEMO CANVAS
                    </h5>
                    <p className="text-xs font-medium text-[#555555] dark:text-[#9fa4ab] max-w-[40ch] mx-auto">
                      {t("chapters.visuals.placeholderDesc")}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#111111] dark:border-[#2b3038] flex items-center justify-between text-[10px] font-mono text-[#555555] dark:text-[#9fa4ab] z-10">
                    <span>ASSET_RATIO: 16:9</span>
                    <span>MEDIA_SLOT_READY</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 05 — UI & State Machines */}
          {activeChapterId === "designSystem" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] dark:border-[#2b3038] pb-3">
                <span className="text-xl font-black text-[#0047ff] dark:text-[#d4ff00]">{activeChapterNumber}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider">
                  CHAPTER &#47;&#47; {activeChapterEngTitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] dark:text-[#f2f1ec]">
                {t("chapters.designSystem.subTitle")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs font-semibold">
                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1.5">
                  <div className="font-mono font-bold text-[#0047ff] dark:text-[#d4ff00]">
                    {t("chapters.designSystem.boxes.loading")}
                  </div>
                  <p className="text-[#555555] dark:text-[#9fa4ab]">
                    {t("chapters.designSystem.boxes.loadingText")}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1.5">
                  <div className="font-mono font-bold text-[#0047ff] dark:text-[#d4ff00]">
                    {t("chapters.designSystem.boxes.ready")}
                  </div>
                  <p className="text-[#555555] dark:text-[#9fa4ab]">
                    {t("chapters.designSystem.boxes.readyText")}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-1.5">
                  <div className="font-mono font-bold text-[#0047ff] dark:text-[#d4ff00]">
                    {t("chapters.designSystem.boxes.empty")}
                  </div>
                  <p className="text-[#555555] dark:text-[#9fa4ab]">
                    {t("chapters.designSystem.boxes.emptyText")}
                  </p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] space-y-2 text-xs">
                <div className="font-mono font-bold text-[#0047ff] dark:text-[#d4ff00]">
                  {t("chapters.designSystem.customNodes")}
                </div>
                <p className="text-[#111111] dark:text-[#f2f1ec] font-semibold leading-relaxed">
                  {t("chapters.designSystem.customNodesText")}
                </p>
              </div>
            </div>
          )}

          {/* 06 — ELK Layout & Binary Decoding */}
          {activeChapterId === "engineering" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] dark:border-[#2b3038] pb-3">
                <span className="text-xl font-black text-[#0047ff] dark:text-[#d4ff00]">{activeChapterNumber}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider">
                  CHAPTER &#47;&#47; {activeChapterEngTitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] dark:text-[#f2f1ec]">
                {t("chapters.engineering.subTitle")}
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {(t.raw("chapters.engineering.items") as Array<{ tag: string; desc: string }>).map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-[#111111] dark:bg-[#1b1e22] text-[#f4f3ef] border border-[#111111] dark:border-[#2b3038] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="text-[#cccccc] dark:text-[#9fa4ab]">{item.tag}</span>
                    <span className="text-[#d4ff00] font-bold">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 07 — Performance Outcome */}
          {activeChapterId === "outcome" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] dark:border-[#2b3038] pb-3">
                <span className="text-xl font-black text-[#0047ff] dark:text-[#d4ff00]">{activeChapterNumber}</span>
                <span className="font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider">
                  CHAPTER &#47;&#47; {activeChapterEngTitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] dark:text-[#f2f1ec]">
                {t("chapters.outcome.subTitle")}
              </h3>

              <div className="p-5 sm:p-6 bg-[#d4ff00] dark:bg-[#0047ff] text-[#111111] dark:text-[#ffffff] border-2 border-[#111111] dark:border-[#2b3038] shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#d4ff00] space-y-3">
                <h4 className="font-black text-base sm:text-lg">
                  {t("chapters.outcome.sectionTitle")}
                </h4>
                <p className="text-xs sm:text-sm font-bold leading-relaxed">
                  {t("chapters.outcome.text")}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Chapter Progress & Legal Sign-off */}
        <div className="mt-8 sm:mt-10 pt-4 border-t border-[#111111] dark:border-[#2b3038] flex items-center justify-between text-xs font-mono text-[#555555] dark:text-[#9fa4ab]">
          <span className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#f2f1ec] truncate">
            <ShieldCheck className="w-4 h-4 text-[#0047ff] dark:text-[#d4ff00] shrink-0" />
            <span className="truncate">{t("signOff")}</span>
          </span>
          <span className="font-bold text-[#0047ff] dark:text-[#d4ff00] shrink-0">
            CHAPTER {activeChapterNumber} / {isRtl ? "۰۷" : "07"}
          </span>
        </div>
      </div>
    </section>
  );
}
