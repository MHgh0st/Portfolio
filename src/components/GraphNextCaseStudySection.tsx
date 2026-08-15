"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  Layers,
  Cpu,
  CheckCircle,
  ExternalLink,
  Activity,
  ShieldCheck,
  Share2,
  Image as ImageIcon,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { SectionGeometry } from "./SectionGeometry";
import { useLightbox } from "./ImageLightboxProvider";

type CaseChapter = {
  number: string;
  id: string;
  title: string;
  englishTitle: string;
};

const CHAPTERS: CaseChapter[] = [
  {
    number: "۰۱",
    id: "overview",
    title: "نگاه کلی و صورت مسأله",
    englishTitle: "OVERVIEW & PURPOSE",
  },
  {
    number: "۰۲",
    id: "challenge",
    title: "چالش‌های داده‌های حجیم",
    englishTitle: "BIG DATA CHALLENGES",
  },
  {
    number: "۰۳",
    id: "approach",
    title: "معماری جریان داده و Sankey",
    englishTitle: "FLOW & SANKEY ARCHITECTURE",
  },
  {
    number: "۰۴",
    id: "visuals",
    title: "پیش‌نمایش بصری و ویدیوها",
    englishTitle: "VISUALS & DEMO",
  },
  {
    number: "۰۵",
    id: "design-system",
    title: "رابط کاربری و سیستم حالت‌ها",
    englishTitle: "UI & STATE MACHINES",
  },
  {
    number: "۰۶",
    id: "engineering",
    title: "چیدمان اتوماتیک و الگوریتم ELK",
    englishTitle: "ELK LAYOUT & BINARY DECODING",
  },
  {
    number: "۰۷",
    id: "outcome",
    title: "دستاوردها و کارایی فریم‌ریت",
    englishTitle: "PERFORMANCE OUTCOME",
  },
];

export function GraphNextCaseStudySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openImage } = useLightbox();
  const [activeChapterId, setActiveChapterId] = useState<string>("overview");
  const [images] = useState<string[]>([
    "/Projects/GraphNext/1.png",
    "/Projects/GraphNext/2.png",
    "/Projects/GraphNext/3.png",
    "/Projects/GraphNext/4.png",
    "/Projects/GraphNext/5.png",
    "/Projects/GraphNext/6.png",
  ]);

  // Continuous Scroll Animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerX = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const heroCardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.96, 1]);
  const chapterTranslateY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  const activeChapter =
    CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  return (
    <section
      ref={containerRef}
      id="graphnext-case-study"
      className="py-16 sm:py-24 border-b border-[#111111] bg-swiss-grid relative select-none overflow-hidden"
    >
      {/* Integrated Section Geometry */}
      <SectionGeometry
        variant="case-study-graphnext"
        scrollYProgress={scrollYProgress}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Banner with Continuous Scroll Horizontal Translation */}
        <motion.div
          style={{ x: headerX }}
          className="mb-12 border-b border-[#111111] pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] p-5 border shadow-[4px_4px_0px_#111111]"
        >
          <div>
            <div className="text-xs font-bold text-[#0047ff] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Share2 className="w-4 h-4 text-[#ff3b00]" />
              <span>[کیس‌استدی اختصاصی // FEATURED CASE STUDY 02]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight uppercase">
              سامانه فکر / / تصویرسازی گراف و جریان داده‌های حجیم
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555]">
            SAMANEH FEKR // CASE_STUDY_02
          </div>
        </motion.div>

        {/* Hero Banner for GraphNext with Scroll Expansion */}
        <motion.div
          style={{ scale: heroCardScale }}
          className="mb-12 bg-[#111111] text-[#f4f3ef] border-2 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_#0047ff] relative overflow-hidden origin-center"
        >
          <div className="absolute inset-0 bg-swiss-grid opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0047ff] text-[#d4ff00] text-xs font-mono font-bold border border-[#111111]">
                <Terminal className="w-3.5 h-3.5" />
                <span>SAMANEH_FEKR // HIGH_PERFORMANCE_VISUALIZATION</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-[#f4f3ef]">
                معماری فول‌استک سامانه فکر / / موتور تحلیل فرآیند، گراف و
                داده‌های حجیم
              </h3>

              <p className="text-xs sm:text-sm text-[#cccccc] font-medium leading-relaxed max-w-[65ch]">
                پروژه سامانه فکر یک زیرساخت فول‌استک برای پردازش و تحلیل فرآیند
                (Process Mining) و تصویرسازی شبکه‌های بزرگ است؛ از خط لوله
                داده‌ای مبتنی بر FastAPI، Polars، PyArrow و PostgreSQL در بک‌اند
                تا رندرینگ تعاملی نودها و دیاگرام‌های جریان D3-Sankey با Web
                Worker در فرانت‌اند Next.js 16.
              </p>
            </div>

            {/* Quick Tech Specs Counter Box */}
            <div className="lg:col-span-4 bg-[#f4f3ef] text-[#111111] p-5 border-2 border-[#111111] shadow-[4px_4px_0px_#d4ff00] font-mono text-xs space-y-2.5">
              <div className="flex justify-between border-b border-[#111111] pb-1">
                <span className="text-[#555555]">فرانت‌اند:</span>
                <span className="font-bold text-[#0047ff]">
                  Next.js 16 (React 19) + XYFlow
                </span>
              </div>
              <div className="flex justify-between border-b border-[#111111] pb-1">
                <span className="text-[#555555]">بک‌اند و API:</span>
                <span className="font-bold text-[#111111]">
                  Python (FastAPI + Polars)
                </span>
              </div>
              <div className="flex justify-between border-b border-[#111111] pb-1">
                <span className="text-[#555555]">پایگاه داده و داکر:</span>
                <span className="font-bold text-[#111111]">
                  PostgreSQL + Docker Compose
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555555]">فرمت انتقال داده:</span>
                <span className="font-bold text-[#ff3b00]">
                  Apache Arrow + MsgPack + Zstd
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chapter Navigation Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-[#111111] pb-4">
          {CHAPTERS.map((chap) => {
            const isSelected = activeChapterId === chap.id;
            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapterId(chap.id)}
                data-cursor="interactive"
                data-cursor-label="CHAPTER"
                className={`px-4 py-2 text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#111111] text-[#f4f3ef] border-[#111111] shadow-[3px_3px_0px_#0047ff]"
                    : "bg-[#f4f3ef] text-[#111111] border-[#111111] hover:bg-[#e9e7e1]"
                }`}
              >
                <span
                  className={`font-mono font-bold ml-1.5 ${isSelected ? "text-[#d4ff00]" : "text-[#0047ff]"}`}
                >
                  {chap.number}
                </span>
                <span>{chap.title}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Dynamic Editorial Content with Scroll Parallax */}
        <motion.div
          style={{ y: chapterTranslateY }}
          className="bg-[#f4f3ef] border-2 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_#111111] min-h-[420px]"
        >
          {/* 01 — Overview */}
          {activeChapterId === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۱</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // OVERVIEW & PURPOSE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                نمایش و تحلیل داده‌های ساختاریافته در مقیاس بزرگ
              </h3>

              <p className="text-sm sm:text-base text-[#111111] font-semibold leading-relaxed">
                <strong className="text-[#0047ff]">سامانه فکر</strong> با هدف
                پردازش بلادرنگ و مصورسازی تعاملی شبکه‌های حجیم طراحی شده است.
                این سیستم به تحلیل‌گران امکان می‌دهد ارتباطات گرافیکی نودها،
                دیاگرام‌های جریان فرآیندی (Sankey Flow)، هیستوگرام‌های مدت‌زمان
                یال‌ها (
                <code className="font-mono text-[#0047ff]">
                  EdgeDurationChart
                </code>
                ) و توزیع کیس‌ها (
                <code className="font-mono text-[#0047ff]">
                  CaseDistributionCharts
                </code>
                ) را با سرعت ۶۰ فریم بر ثانیه بررسی و تحلیل نمایند.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 font-mono text-xs">
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <span className="text-[#555555]">مسئولیت فنی:</span>
                  <div className="font-bold text-[#111111]">
                    Full-Stack Systems Architect (Frontend & Backend)
                  </div>
                </div>
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <span className="text-[#555555]">دامنه تخصصی:</span>
                  <div className="font-bold text-[#0047ff]">
                    Process Mining & Graph Analytics
                  </div>
                </div>
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <span className="text-[#555555]">پشته فول‌استک:</span>
                  <div className="font-bold text-[#ff3b00]">
                    FastAPI + Polars + Next.js 16 + PostgreSQL
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 02 — Big Data Challenges */}
          {activeChapterId === "challenge" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۲</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // TECHNICAL CHALLENGES
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                چالش‌های محاسبات فرآیند در بک‌اند و رندرینگ در فرانت‌اند
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#111111] font-semibold leading-relaxed">
                <p className="p-4 bg-[#e9e7e1] border border-[#111111] border-r-4 border-r-[#ff3b00]">
                  <strong>
                    ۱. محاسبات سنگین گراف در بک‌اند (DFG Generation):
                  </strong>{" "}
                  استخراج گراف مستقیم (Directly Follows Graph)، واریانت‌های مسیر
                  (Variant Paths)، زمان‌های ماندگاری و ماتریس انتقال از میان
                  میلیون‌ها ردیف لاگ دیتابیس در پایتون، در صورت استفاده از
                  Pandas معمولی با کندی شدید مواجه می‌شد. این چالش با فریم‌ورک
                  فوق‌سریع <strong>Polars</strong> و بهینه‌سازی در سطح ستونی
                  برطرف گردید.
                </p>
                <p className="p-4 bg-[#e9e7e1] border border-[#111111] border-r-4 border-r-[#0047ff]">
                  <strong>۲. گلوگاه انتقال داده و انکودینگ JSON:</strong> ارسال
                  ماتریس‌های حجیم گراف با فرمت متنی JSON باعث اشغال پهنای باند و
                  قفل شدن ترد مرورگر می‌شد. با تلفیق پروتکل باینری{" "}
                  <strong>Apache Arrow</strong>، سریالایزر{" "}
                  <strong>MsgPack</strong> و الگوریتم فشرده‌سازی{" "}
                  <strong>Zstandard</strong>، حجم انتقالی تا ۹۰٪ کاهش یافت.
                </p>
                <p className="p-4 bg-[#e9e7e1] border border-[#111111] border-r-4 border-r-[#d4ff00]">
                  <strong>۳. چیدمان اتوماتیک گراف بدون کندی UI:</strong> محاسبه
                  مختصات فضایی صدها نود و یال با الگوریتم‌های ELK.js به صورت
                  کاملاً موازی در <strong>Web Worker</strong> انجام شد تا مرورگر
                  کوچکترین افت فریمی در تعاملات کاربر نداشته باشد.
                </p>
              </div>
            </div>
          )}

          {/* 03 — Flow & Sankey Architecture */}
          {activeChapterId === "approach" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۳</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // SANKEY & FLOW ARCHITECTURE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                معماری بک‌اند، پایپ‌لاین باینری و دیاگرام‌های جریان
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <h4 className="font-bold text-[#0047ff] text-xs font-mono">
                    // موتور محاسبات تحلیلی بک‌اند (FastAPI + Polars Engine)
                  </h4>
                  <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                    توسعه خط لوله پردازشی در بک‌اند پایتون شامل ماژول‌های{" "}
                    <code className="font-mono text-[#0047ff]">graph.py</code>{" "}
                    (تولید گراف DFG)،{" "}
                    <code className="font-mono text-[#0047ff]">
                      variants.py
                    </code>{" "}
                    (استخراج مسیرهای تکرارشونده)،{" "}
                    <code className="font-mono text-[#0047ff]">
                      searchCase.py
                    </code>{" "}
                    و ارتباط بهینه با پایگاه داده PostgreSQL از طریق درایور
                    باینری ADBC / ConnectorX.
                  </p>
                </div>

                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <h4 className="font-bold text-[#0047ff] text-xs font-mono">
                    // موتور جریان داده فرانت‌اند (SankeyFlow.tsx + D3)
                  </h4>
                  <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                    توسعه کامپوننت اختصاصی{" "}
                    <code className="font-mono text-[#0047ff]">
                      SankeyFlow.tsx
                    </code>{" "}
                    با بهره‌گیری از{" "}
                    <code className="font-mono text-[#111111]">d3-sankey</code>{" "}
                    و مقیاس‌گذاری دقیق{" "}
                    <code className="font-mono text-[#111111]">d3-scale</code>{" "}
                    برای به تصویر کشیدن حجم و ضخامت جریان تراکنش‌ها و گلوگاه‌های
                    فرآیندی.
                  </p>
                </div>

                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <h4 className="font-bold text-[#0047ff] text-xs font-mono">
                    // سیستم فیلتر ساختار درختی (ActivityTreeFilter.tsx)
                  </h4>
                  <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                    فیلتر چندسطحی با قابلیت جستجوی عمیق شاخه‌ها جهت انتخاب
                    زیرمجموعه‌های داده و به‌روزرسانی آنی ساختار گراف بدون وقفه
                    در رابط کاربری.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 04 — Visuals & Media Demo */}
          {activeChapterId === "visuals" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۴</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // VISUALS & DEMO CANVAS
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                پیش‌نمایش بصری و دموی گراف‌های تعاملی
              </h3>

              {images && images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      onClick={() =>
                        openImage({
                          src: imgSrc,
                          title: `سامانه فکر // نمای بصری ۰${idx + 1}`,
                          alt: `اسکرین‌شات سامانه فکر ${idx + 1}`,
                        })
                      }
                      className="relative w-full aspect-video border-2 border-[#111111] overflow-hidden bg-[#e9e7e1] cursor-zoom-in group shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#0047ff] transition-all"
                      title="کلیک برای بزرگ‌نمایی در سایز کامل"
                    >
                      <Image
                        src={imgSrc}
                        alt={`اسکرین‌شات سامانه فکر ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#111111]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-[#111111] text-[#f4f3ef] px-3 py-1.5 border border-[#111111] shadow-[2px_2px_0px_#d4ff00] text-xs font-mono font-bold flex items-center gap-1.5">
                          <ZoomIn className="w-3.5 h-3.5 text-[#d4ff00]" />
                          <span>مشاهده سایز اصلی</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* High-Craft Swiss/Neo-Brutalist Visual Canvas Frame */
                <div className="w-full aspect-video border-2 border-[#111111] bg-[#e9e7e1] p-6 flex flex-col justify-between relative overflow-hidden group shadow-[6px_6px_0px_#111111]">
                  <div className="absolute inset-0 bg-swiss-grid opacity-50 pointer-events-none" />

                  <div className="flex justify-between items-center font-mono text-[11px] text-[#111111] z-10 border-b border-[#111111] pb-2">
                    <span className="font-bold">
                      // VISUAL_CANVAS // GRAPHNEXT_DEMO
                    </span>
                    <span className="bg-[#d4ff00] text-[#111111] font-bold px-2 py-0.5 border border-[#111111]">
                      کادر جای‌گذاری عکس / ویدیو
                    </span>
                  </div>

                  <div className="my-auto text-center space-y-3 z-10">
                    <div className="w-16 h-16 mx-auto border-2 border-[#111111] bg-[#0047ff] text-[#f4f3ef] flex items-center justify-center shadow-[3px_3px_0px_#111111]">
                      <ImageIcon className="w-8 h-8 text-[#d4ff00]" />
                    </div>
                    <h5 className="font-black text-base text-[#111111]">
                      GRAPHNEXT INTERACTIVE DEMO CANVAS
                    </h5>
                    <p className="text-xs font-medium text-[#555555] max-w-[40ch] mx-auto">
                      محل قرارگیری اسکرین‌شات‌ها، ویدیوها و پیش‌نمایش گراف‌های
                      نودی و جریان SankeyFlow
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#111111] flex items-center justify-between text-[10px] font-mono text-[#555555] z-10">
                    <span>ASSET_RATIO: 16:9</span>
                    <span>MEDIA_SLOT_READY</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 05 — UI & State Machines */}
          {activeChapterId === "design-system" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۵</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // UI & EXPLICIT STATE MACHINES
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                ماشین حالت‌های صریح (Explicit State Machines) و کامپوننت‌های نود
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1.5">
                  <div className="font-mono font-bold text-[#0047ff]">
                    // LOADING STATE
                  </div>
                  <p className="text-[#555555]">
                    کامپوننت{" "}
                    <code className="font-mono text-[#111111]">
                      GraphLoadingState.tsx
                    </code>{" "}
                    با نمایش انیمیشنی پیشرفت دانلود و دیکد داده‌های باینری.
                  </p>
                </div>

                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1.5">
                  <div className="font-mono font-bold text-[#0047ff]">
                    // READY WORKBENCH
                  </div>
                  <p className="text-[#555555]">
                    کامپوننت{" "}
                    <code className="font-mono text-[#111111]">
                      GraphDataReadyState.tsx
                    </code>{" "}
                    با ابزارهای اکسپورت تصویر، کنترل زوم و سایدبار تنظیمات.
                  </p>
                </div>

                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1.5">
                  <div className="font-mono font-bold text-[#0047ff]">
                    // EMPTY / FALLBACK
                  </div>
                  <p className="text-[#555555]">
                    کامپوننت{" "}
                    <code className="font-mono text-[#111111]">
                      GraphEmptyState.tsx
                    </code>{" "}
                    جهت راهنمایی تعاملی کاربر در زمان نبود داده یا خطای واکشی.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-2 text-xs">
                <div className="font-mono font-bold text-[#0047ff]">
                  // نودها و یال‌های سفارشی (CustomNode & StyledSmoothStepEdge)
                </div>
                <p className="text-[#111111] font-semibold leading-relaxed">
                  توسعه نودهای گرافیکی با نشانگرهای متریک و یال‌های هوشمند با
                  تولتیپ‌های بلادرنگ (
                  <code className="font-mono text-[#0047ff]">NodeTooltip</code>{" "}
                  و{" "}
                  <code className="font-mono text-[#0047ff]">EdgeTooltip</code>)
                  که اطلاعات زمان‌سنجی و حجم داده عبوری را هنگام هاور نشان
                  می‌دهند.
                </p>
              </div>
            </div>
          )}

          {/* 06 — ELK Layout & Binary Decoding */}
          {activeChapterId === "engineering" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۶</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // FULL-STACK ARCHITECTURE & DATA PIPELINE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                پایپ‌لاین فول‌استک: از بک‌اند Polars تا وب‌ورکر و کامپایلر React
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-[#111111] text-[#f4f3ef] border border-[#111111] flex items-center justify-between">
                  <span>BACKEND POLARS & FASTAPI:</span>
                  <span className="text-[#d4ff00] font-bold">
                    محاسبات آماری و ماتریس DFG چندبرابر سریع‌تر از Pandas
                  </span>
                </div>

                <div className="p-3.5 bg-[#111111] text-[#f4f3ef] border border-[#111111] flex items-center justify-between">
                  <span>LAYOUT-WORKER.TS (ELKJS):</span>
                  <span className="text-[#d4ff00] font-bold">
                    انتقال محاسبات سنگین چیدمان گراف به ترد پس‌زمینه (Web
                    Worker)
                  </span>
                </div>

                <div className="p-3.5 bg-[#111111] text-[#f4f3ef] border border-[#111111] flex items-center justify-between">
                  <span>APACHE ARROW & MSGPACK & ZSTD:</span>
                  <span className="text-[#d4ff00] font-bold">
                    استریم، فشرده‌سازی و دیکد باینری در کلاینت و سرور
                  </span>
                </div>

                <div className="p-3.5 bg-[#111111] text-[#f4f3ef] border border-[#111111] flex items-center justify-between">
                  <span>CONTAINERIZATION & POSTGRESQL:</span>
                  <span className="text-[#d4ff00] font-bold">
                    زیرساخت داکرایز کامل با Docker Compose و دیتابیس پستگرس
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 07 — Performance Outcome */}
          {activeChapterId === "outcome" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۷</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // PERFORMANCE OUTCOME
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                دستاوردها، کاهش حجم ترافیک و پایداری ۶۰ فریم در ثانیه
              </h3>

              <div className="p-6 bg-[#d4ff00] text-[#111111] border-2 border-[#111111] shadow-[6px_6px_0px_#111111] space-y-3">
                <h4 className="font-black text-lg">
                  // خروجی نهایی مهندسی فرانت‌اند
                </h4>
                <p className="text-xs sm:text-sm font-bold leading-relaxed">
                  ایجاد یک موتور بصری فوق‌پیشرفته که هزاران رکورد داده را در
                  کسری از ثانیه دیکد کرده، محاسبات چیدمان را بدون قفل کردن
                  مرورگر در Web Worker انجام می‌دهد و رابط کاربری را همواره در
                  نرخ ۶۰ فریم بر ثانیه نرم و پاسخگو نگه می‌دارد.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Chapter Progress & Legal Sign-off */}
        <div className="mt-10 pt-4 border-t border-[#111111] flex items-center justify-between text-xs font-mono text-[#555555]">
          <span className="flex items-center gap-1.5 font-bold text-[#111111]">
            <ShieldCheck className="w-4 h-4 text-[#0047ff]" />
            معماری و توسعه کامل فول‌استک (بک‌اند پایتون + فرانت‌اند ری‌اکت)
          </span>
          <span className="font-bold text-[#0047ff]">
            CHAPTER {activeChapter.number} OF ۰۷
          </span>
        </div>
      </div>
    </section>
  );
}
