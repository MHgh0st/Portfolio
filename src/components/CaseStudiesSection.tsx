"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  Layers,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionGeometry } from "./SectionGeometry";
import { useLightbox } from "./ImageLightboxProvider";

interface ProjectMeta {
  id: string;
  repoName: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  images?: string[];
}

const PROJECT_CONFIGS: ProjectMeta[] = [
  {
    id: "graphnext",
    repoName: "MHgh0st/GraphNext",
    githubUrl: "https://github.com/MHgh0st/GraphNext",
    techStack: [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "Polars",
      "PostgreSQL",
      "Docker",
      "@xyflow/react",
      "D3-Sankey",
      "Apache Arrow",
      "elkjs (Web Worker)",
      "Zustand",
    ],
    images: [
      "/Projects/GraphNext/1.png",
      "/Projects/GraphNext/2.png",
      "/Projects/GraphNext/3.png",
      "/Projects/GraphNext/4.png",
      "/Projects/GraphNext/5.png",
      "/Projects/GraphNext/6.png",
    ],
  },
  {
    id: "ascvd",
    repoName: "MHgh0st/ASCVD",
    githubUrl: "https://github.com/MHgh0st/ASCVD",
    liveUrl: "https://ascvdupdates.vercel.app",
    techStack: [
      "TypeScript",
      "Next.js 15",
      "React 19",
      "Tailwind v4",
      "Supabase",
      "Prisma ORM",
      "NextAuth.js",
      "HeroUI",
      "Framer Motion",
      "React Gauge",
    ],
    images: [],
  },
  {
    id: "salma-admin",
    repoName: "MHgh0st/salma_admin_panel",
    githubUrl: "https://github.com/MHgh0st/salma_admin_panel",
    techStack: [
      "TypeScript",
      "Next.js 16.2",
      "React 19.2",
      "Tailwind v4",
      "HeroUI v3",
      "React Compiler",
      "Motion",
      "Zustand",
      "Solar Icons",
    ],
    images: [],
  },
  {
    id: "salma-app",
    repoName: "MHgh0st/Salma_app",
    githubUrl: "https://github.com/MHgh0st/Salma_app",
    techStack: [
      "React Native 0.86",
      "React 19",
      "Expo SDK 57",
      "TypeScript",
      "HeroUI Native",
      "Shopify Skia",
      "Reanimated 4",
      "Uniwind",
      "TanStack Query",
      "Zustand",
    ],
    images: [],
  },
  {
    id: "ticketing-system",
    repoName: "MHgh0st/ticketing-system",
    githubUrl: "https://github.com/MHgh0st/ticketing-system",
    techStack: [
      "Vue.js 3",
      "Nuxt.js",
      "TypeScript",
      "Tailwind CSS",
      "Custom Design System",
      "REST API Services",
      "Dynamic Routing",
    ],
    images: [],
  },
];

export function CaseStudiesSection() {
  const t = useTranslations("CaseStudies");
  const commonT = useTranslations("Common");
  const cursorT = useTranslations("Cursor");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const containerRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const { openImage } = useLightbox();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    PROJECT_CONFIGS[0].id
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "architecture" | "visuals"
  >("overview");
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const selectedConfig =
    PROJECT_CONFIGS.find((p) => p.id === selectedProjectId) || PROJECT_CONFIGS[0];

  const selectedProject = {
    ...selectedConfig,
    name: t(`projects.${selectedConfig.id}.name`),
    category: t(`projects.${selectedConfig.id}.category`),
    tagline: t(`projects.${selectedConfig.id}.tagline`),
    overview: t(`projects.${selectedConfig.id}.overview`),
    architectureDetails: t(`projects.${selectedConfig.id}.architectureDetails`),
    keyHighlights: t.raw(`projects.${selectedConfig.id}.keyHighlights`) as string[],
    visualPlaceholderSubtitle: t(`projects.${selectedConfig.id}.visualPlaceholderSubtitle`),
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentSlideIndex(0);

    // Smooth scroll to detail panel on small viewports
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        if (detailPanelRef.current) {
          const top =
            detailPanelRef.current.getBoundingClientRect().top +
            window.scrollY -
            64;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 50);
    }
  };

  const handleNextSlide = () => {
    if (!selectedConfig.images || selectedConfig.images.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % selectedConfig.images!.length);
  };

  const handlePrevSlide = () => {
    if (!selectedConfig.images || selectedConfig.images.length === 0) return;
    setCurrentSlideIndex((prev) =>
      prev === 0 ? selectedConfig.images!.length - 1 : prev - 1
    );
  };

  // Touch Swipe Handler with Direction Awareness
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    if (isRtl) {
      if (info.offset.x > swipeThreshold) {
        handlePrevSlide();
      } else if (info.offset.x < -swipeThreshold) {
        handleNextSlide();
      }
    } else {
      if (info.offset.x < -swipeThreshold) {
        handleNextSlide();
      } else if (info.offset.x > swipeThreshold) {
        handlePrevSlide();
      }
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-12 sm:py-20 border-b border-[#111111] dark:border-[#2b3038] bg-[#f4f3ef] dark:bg-[#0c0d0e] relative"
    >
      {/* Section-Integrated Geometry Component */}
      <SectionGeometry
        variant="selected-work"
        scrollYProgress={scrollYProgress}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 border-b border-[#111111] dark:border-[#2b3038] pb-4 sm:pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] dark:bg-[#141618] p-4 sm:p-5 border-2 border-[#111111] dark:border-[#2b3038] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#0047ff]">
          <div>
            <div className="text-xs font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-[#ff3b00]" />
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] dark:text-[#f2f1ec] tracking-tight uppercase">
              {t("heading")}
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555] dark:text-[#9fa4ab]">
            {t("stamp")}
          </div>
        </div>

        {/* Grid Layout: Selection Column (Start) & Deep-Dive Panel (End) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Project Selection Cards (Start) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="text-xs font-mono font-bold text-[#555555] dark:text-[#9fa4ab] px-1 flex items-center justify-between">
              <span>{t("listHeader")}</span>
              <span className="text-[#0047ff] dark:text-[#d4ff00] text-[11px]">{t("listHint")}</span>
            </div>

            {PROJECT_CONFIGS.map((config) => {
              const isSelected = selectedProjectId === config.id;
              const name = t(`projects.${config.id}.name`);
              const category = t(`projects.${config.id}.category`);
              const tagline = t(`projects.${config.id}.tagline`);

              return (
                <motion.div
                  key={config.id}
                  onClick={() => handleSelectProject(config.id)}
                  data-cursor="project"
                  data-cursor-label={cursorT("inspect")}
                  whileHover={{ x: isRtl ? -4 : 4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className={`w-full text-start p-4 sm:p-5 border-2 transition-all cursor-pointer relative group overflow-hidden ${
                    isSelected
                      ? "bg-[#111111] dark:bg-[#0047ff] text-[#f4f3ef] dark:text-[#ffffff] border-[#111111] dark:border-[#2b3038] shadow-[5px_5px_0px_#0047ff] dark:shadow-[5px_5px_0px_#d4ff00]"
                      : "bg-[#f4f3ef] dark:bg-[#141618] text-[#111111] dark:text-[#f2f1ec] border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#0047ff] hover:shadow-[5px_5px_0px_#111111] hover:bg-[#e9e7e1] dark:hover:bg-[#1b1e22] active:shadow-[1px_1px_0px_#111111]"
                  }`}
                >
                  {/* Directional Accent Clip Reveal */}
                  <div
                    className={`absolute inset-y-0 start-0 w-2.5 transition-transform duration-300 ${
                      isSelected
                        ? "bg-[#d4ff00] scale-y-100"
                        : "bg-[#0047ff] dark:bg-[#d4ff00] scale-y-0 group-hover:scale-y-100"
                    }`}
                  />

                  <div className="flex items-center justify-between mb-2 ps-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isSelected
                          ? "text-[#d4ff00] dark:text-[#d4ff00]"
                          : "text-[#0047ff] dark:text-[#3b82f6]"
                      }`}
                    >
                      {category}
                    </span>

                    <span
                      className={`font-mono text-[11px] px-2 py-0.5 border ${
                        isSelected
                          ? "bg-[#0047ff] dark:bg-[#111111] text-[#f4f3ef] dark:text-[#d4ff00] border-[#0047ff] dark:border-[#2b3038]"
                          : "bg-[#e9e7e1] dark:bg-[#1b1e22] text-[#111111] dark:text-[#f2f1ec] border-[#111111] dark:border-[#2b3038]"
                      }`}
                    >
                      {isSelected ? t("statusSelected") : t("statusInspect")}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black tracking-tight mb-2 ps-2 group-hover:text-[#0047ff] dark:group-hover:text-[#d4ff00] transition-colors">
                    {name}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed line-clamp-2 ps-2 ${
                      isSelected ? "text-[#cccccc] dark:text-[#e0e7ff]" : "text-[#555555] dark:text-[#9fa4ab]"
                    }`}
                  >
                    {tagline}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Case Study Deep-Dive Panel (End) */}
          <div
            ref={detailPanelRef}
            className="lg:col-span-7 bg-[#f4f3ef] dark:bg-[#141618] border-2 border-[#111111] dark:border-[#2b3038] shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#0047ff] sm:shadow-[8px_8px_0px_#111111] sm:dark:shadow-[8px_8px_0px_#0047ff] overflow-hidden scroll-mt-20"
          >
            {/* Panel Titlebar & Tabs */}
            <div className="p-3.5 sm:px-5 sm:py-3.5 bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b-2 border-[#111111] dark:border-[#2b3038]">
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <span className="w-2.5 h-2.5 bg-[#d4ff00] animate-pulse shrink-0" />
                <GitBranch className="w-4 h-4 text-[#0047ff] dark:text-[#d4ff00] shrink-0" />
                <span className="text-[#f4f3ef] font-bold tracking-wide truncate">
                  {selectedProject.repoName}
                </span>
              </div>

              {/* Horizontal Scrollable Tab Bar */}
              <div className="flex items-center bg-[#222222] dark:bg-[#141618] p-1 border border-[#444444] dark:border-[#2b3038] gap-1 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === "overview"
                      ? "bg-[#0047ff] text-[#f4f3ef] shadow-[2px_2px_0px_#d4ff00]"
                      : "text-[#cccccc] hover:text-[#f4f3ef] hover:bg-[#333333] dark:hover:bg-[#1b1e22]"
                  }`}
                >
                  {t("tabs.overview")}
                </button>
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shrink-0 font-mono ${
                    activeTab === "architecture"
                      ? "bg-[#0047ff] text-[#f4f3ef] shadow-[2px_2px_0px_#d4ff00]"
                      : "text-[#cccccc] hover:text-[#f4f3ef] hover:bg-[#333333] dark:hover:bg-[#1b1e22]"
                  }`}
                >
                  {t("tabs.architecture")}
                </button>
                <button
                  onClick={() => setActiveTab("visuals")}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === "visuals"
                      ? "bg-[#0047ff] text-[#f4f3ef] shadow-[2px_2px_0px_#d4ff00]"
                      : "text-[#cccccc] hover:text-[#f4f3ef] hover:bg-[#333333] dark:hover:bg-[#1b1e22]"
                  }`}
                >
                  {t("tabs.visuals")}
                </button>
              </div>
            </div>

            {/* Panel Body Content */}
            <motion.div
              key={`${selectedProject.id}-${activeTab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-4 sm:p-6 space-y-6 min-h-[360px]"
            >
              {/* Content Tab: Overview & Features */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase mb-2">
                      {t("overviewHeading")}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#f2f1ec] leading-relaxed p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038]">
                      {selectedProject.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase mb-3">
                      {t("highlightsHeading")}
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#111111] dark:text-[#f2f1ec]">
                      {selectedProject.keyHighlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: isRtl ? 8 : -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="flex items-start gap-2.5 p-3 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038] hover:border-[#0047ff] dark:hover:border-[#d4ff00] transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-[#0047ff] dark:text-[#d4ff00] shrink-0 mt-0.5" />
                          <span className="font-bold leading-relaxed">
                            {highlight}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Content Tab: Architecture & Tech Stack */}
              {activeTab === "architecture" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase mb-2">
                      {t("architectureHeading")}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#f2f1ec] leading-relaxed p-3.5 sm:p-4 bg-[#e9e7e1] dark:bg-[#1b1e22] border border-[#111111] dark:border-[#2b3038]">
                      {selectedProject.architectureDetails}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#0047ff] dark:text-[#d4ff00] uppercase mb-2">
                      {t("techStackHeading")}
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      {selectedProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-[#111111] dark:bg-[#1b1e22] text-[#f4f3ef] dark:text-[#d4ff00] border border-[#111111] dark:border-[#2b3038] font-bold shadow-[2px_2px_0px_#0047ff]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Content Tab: Visual Showcase */}
              {activeTab === "visuals" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#555555] dark:text-[#9fa4ab]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0047ff] dark:bg-[#d4ff00]" />
                      <span className="font-bold">
                        {t("visualsHeading")}
                      </span>
                    </div>
                    {selectedProject.images &&
                      selectedProject.images.length > 0 && (
                        <span className="bg-[#111111] dark:bg-[#070809] text-[#d4ff00] px-2.5 py-0.5 font-mono font-bold border border-[#111111] dark:border-[#2b3038]">
                          {currentSlideIndex + 1} /{" "}
                          {selectedProject.images.length}
                        </span>
                      )}
                  </div>

                  {selectedProject.images &&
                  selectedProject.images.length > 0 ? (
                    <div className="space-y-3">
                      {/* Main Touch-Swipable Frame */}
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        onClick={() =>
                          openImage({
                            src: selectedProject.images![currentSlideIndex],
                            title: `${selectedProject.name} — [${currentSlideIndex + 1}]`,
                            alt: selectedProject.name,
                          })
                        }
                        className="relative w-full aspect-video border-2 border-[#111111] dark:border-[#2b3038] overflow-hidden bg-[#111111] dark:bg-[#070809] shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#0047ff] group cursor-pointer touch-pan-y"
                        title={t("zoomTooltip")}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentSlideIndex}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="relative w-full h-full pointer-events-none"
                          >
                            <Image
                              src={selectedProject.images[currentSlideIndex]}
                              alt={`${selectedProject.name} slide ${currentSlideIndex + 1}`}
                              fill
                              className="object-contain"
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Top End Badge Overlay with Zoom Trigger */}
                        <div className="absolute top-2.5 end-2.5 z-20 flex items-center gap-2">
                          <div className="bg-[#111111]/90 dark:bg-[#070809]/90 text-[#f4f3ef] text-[10px] font-mono font-bold px-2 py-1 border border-[#f4f3ef]/30 backdrop-blur-sm flex items-center gap-1.5 group-hover:bg-[#0047ff] transition-colors">
                            <ZoomIn className="w-3 h-3 text-[#d4ff00]" />
                            <span>{commonT("zoom")}</span>
                          </div>
                        </div>

                        {/* Prev/Next Overlay Buttons */}
                        {selectedProject.images.length > 1 && (
                          <div className="absolute inset-y-0 inset-x-0 flex items-center justify-between px-2 sm:px-3 pointer-events-none z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrevSlide();
                              }}
                              aria-label={commonT("prevSlide")}
                              className="pointer-events-auto w-11 h-11 bg-[#f4f3ef] dark:bg-[#141618] hover:bg-[#0047ff] text-[#111111] dark:text-[#f2f1ec] hover:text-[#f4f3ef] border-2 border-[#111111] dark:border-[#2b3038] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#0047ff] active:translate-y-0.5 flex items-center justify-center transition-all cursor-pointer"
                            >
                              <PrevIcon className="w-5 h-5" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNextSlide();
                              }}
                              aria-label={commonT("nextSlide")}
                              className="pointer-events-auto w-11 h-11 bg-[#f4f3ef] dark:bg-[#141618] hover:bg-[#0047ff] text-[#111111] dark:text-[#f2f1ec] hover:text-[#f4f3ef] border-2 border-[#111111] dark:border-[#2b3038] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#0047ff] active:translate-y-0.5 flex items-center justify-center transition-all cursor-pointer"
                            >
                              <NextIcon className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </motion.div>

                      {/* Thumbnail Strip */}
                      {selectedProject.images.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
                          {selectedProject.images.map((imgSrc, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentSlideIndex(idx)}
                              className={`relative min-w-[72px] sm:min-w-[88px] aspect-video border-2 transition-all cursor-pointer shrink-0 overflow-hidden ${
                                currentSlideIndex === idx
                                  ? "border-[#0047ff] dark:border-[#d4ff00] ring-2 ring-[#0047ff] dark:ring-[#d4ff00] shadow-[2px_2px_0px_#111111] scale-105"
                                  : "border-[#111111] dark:border-[#2b3038] opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={imgSrc}
                                alt={`Thumb ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-video border-2 border-[#111111] dark:border-[#2b3038] bg-[#e9e7e1] dark:bg-[#1b1e22] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#0047ff]">
                      <div className="absolute inset-0 bg-swiss-grid opacity-40 pointer-events-none" />

                      <div className="flex justify-between items-center font-mono text-[11px] text-[#111111] dark:text-[#f2f1ec] z-10 border-b border-[#111111] dark:border-[#2b3038] pb-2">
                        <span className="font-bold">
                          &#47;&#47; SOURCE_DOCS &#47;&#47; {selectedProject.id.toUpperCase()}
                        </span>
                        <span className="bg-[#111111] dark:bg-[#070809] text-[#d4ff00] font-bold px-2 py-0.5 border border-[#111111] dark:border-[#2b3038]">
                          GITHUB_EVIDENCE
                        </span>
                      </div>

                      <div className="my-auto text-center space-y-2.5 z-10 px-2">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto border-2 border-[#111111] dark:border-[#2b3038] bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] flex items-center justify-center shadow-[4px_4px_0px_#0047ff]">
                          <GitBranch className="w-6 h-6 text-[#d4ff00]" />
                        </div>
                        <h5 className="font-black text-sm sm:text-base text-[#111111] dark:text-[#f2f1ec]">
                          {t("noVisualsHeading")}
                        </h5>
                        <p className="text-xs font-semibold text-[#555555] dark:text-[#9fa4ab] max-w-[48ch] mx-auto leading-relaxed">
                          {t("noVisualsDesc")}
                        </p>

                        <div className="pt-1.5">
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 bg-[#0047ff] hover:bg-[#111111] dark:hover:bg-[#070809] text-[#f4f3ef] text-xs font-bold border border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#111111] active:translate-y-0.5 transition-all"
                          >
                            <span>{t("viewRepoImages")}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#d4ff00]" />
                          </a>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#111111] dark:border-[#2b3038] flex items-center justify-between text-[10px] font-mono text-[#555555] dark:text-[#9fa4ab] z-10">
                        <span>REPOSITORY: {selectedProject.repoName}</span>
                        <span className="text-[#0047ff] dark:text-[#d4ff00] font-bold">
                          VERIFIED_SOURCE_CODE
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Links */}
              <div className="pt-4 border-t border-[#111111] dark:border-[#2b3038] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-bold">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[46px] px-5 py-2.5 bg-[#111111] dark:bg-[#1b1e22] text-[#f4f3ef] hover:bg-[#0047ff] dark:hover:bg-[#0047ff] transition-all flex items-center justify-center gap-2 border border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#0047ff] active:translate-y-0.5"
                >
                  <span>{t("btnGithub")}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4ff00]" />
                </a>

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[46px] px-5 py-2.5 bg-[#d4ff00] text-[#111111] hover:bg-[#0047ff] hover:text-[#f4f3ef] font-black transition-all flex items-center justify-center gap-2 border border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#0047ff] active:translate-y-0.5"
                  >
                    <span>{t("btnLiveDemo")}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
