"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, ShieldCheck, Wrench, MoveLeft } from "lucide-react";
import { SectionGeometry } from "./SectionGeometry";

type StackCategory = {
  number: string;
  id: string;
  title: string;
  englishTitle: string;
  tagline: string;
  coreTools: string[];
  workflowMindset: string;
};

const CATEGORIES: StackCategory[] = [
  {
    number: "۰۱",
    id: "frontend-architecture",
    title: "معماری فرانت‌اند و سیستم‌های دیزاین",
    englishTitle: "FRONTEND ARCHITECTURE & DESIGN SYSTEMS",
    tagline:
      "ساخت رابط‌های کاربری مدرن با تمرکز بر پرفورمنس، تایپ‌سیفتی کامل و معماری کامپوننت‌های مستقل.",
    coreTools: [
      "Next.js 16 (App Router)",
      "React 19 / Compiler",
      "TypeScript 5",
      "Tailwind CSS v4",
      "HeroUI v3 / Aria",
      "Zustand / Motion",
    ],
    workflowMindset:
      "توسعه کدهای ساختاریافته، کامپوننت‌های دست‌ساز بدون وابستگی‌های زائد و بهینه‌سازی رندرینگ با کامپایلر رسمی React 19.",
  },
  {
    number: "۰۲",
    id: "visualization-graphics",
    title: "تصویرسازی داده‌های حجیم و موتورهای گراف",
    englishTitle: "HIGH-SCALE DATA VISUALIZATION & DFG ENGINES",
    tagline:
      "رندر تعاملی هزاران نود و دیاگرام‌های جریان داده در فرانت‌اند با نرخ پایدار ۶۰ فریم بر ثانیه.",
    coreTools: [
      "@xyflow/react",
      "D3.js (Sankey / Scale)",
      "elkjs (Auto Layout)",
      "Web Workers",
      "Apache Arrow / MsgPack",
      "ApexCharts",
    ],
    workflowMindset:
      "انتقال محاسبات سنگین چیدمان گرافیکی به ترد پس‌زمینه (Web Worker) و استریم داده‌ها با فرمت‌های باینری برای حذف لگ مرورگر.",
  },
  {
    number: "۰۳",
    id: "cross-platform-native",
    title: "توسعه موبایل نیتیو و گرافیک پیشرفته Skia",
    englishTitle: "CROSS-PLATFORM & NATIVE MOBILE ARCHITECTURE",
    tagline:
      "توسعه اپلیکیشن‌های موبایل همگام با استانداردهای بومی، گرافیک ۲ بعدی و انیمیشن‌های روان.",
    coreTools: [
      "React Native 0.86",
      "Expo SDK 57 / Router",
      "Shopify Skia (2D Graphics)",
      "Reanimated 4 / Worklets",
      "Uniwind (Tailwind for RN)",
      "@gorhom/bottom-sheet",
    ],
    workflowMindset:
      "خلق تجربه کاربری بومی روی موبایل با تلفیق موتور گرافیکی Skia، انیمیشن‌های ۶۰ فریم Reanimated و مدیریت آفلاین داده‌ها.",
  },
  {
    number: "۰۴",
    id: "backend-data-pipelines",
    title: "بک‌اند پرسرعت، پایگاه داده و زیرساخت داکر",
    englishTitle: "BACKEND PIPELINES, DATABASES & DEVOPS",
    tagline:
      "طراحی سرویس‌های سریع پردازش داده با پایتون، اتصال به دیتابیس و مدیریت کانتینرها.",
    coreTools: [
      "Python 3 (FastAPI)",
      "Polars (High-Speed DataFrames)",
      "PostgreSQL / Supabase",
      "Docker / Docker Compose",
      "ConnectorX / PyArrow",
      "NextAuth.js / JWT",
    ],
    workflowMindset:
      "استفاده از Polars و پایتون برای محاسبات سریع آماری و ماتریس‌های گراف و اتصال مستقیم به کلاینت از طریق داکر.",
  },
];

export function ExperienceStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const bannerScale = useTransform(scrollYProgress, [0.1, 0.4], [0.96, 1]);

  return (
    <section
      ref={containerRef}
      id="experience-stack"
      className="py-16 sm:py-24 border-b border-[#111111] bg-swiss-grid relative select-none overflow-hidden"
    >
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="stack" scrollYProgress={scrollYProgress} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Banner with Continuous Scroll Horizontal Translation */}
        <motion.div
          style={{ x: headerX }}
          className="mb-14 border-b border-[#111111] pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] p-5 border shadow-[4px_4px_0px_#111111]"
        >
          <div>
            <div className="text-xs font-bold text-[#0047ff] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Wrench className="w-4 h-4 text-[#ff3b00]" />
              <span>[بخش ۰۴ // پشته ابزارها و تجربه عملی]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight uppercase">
              پشته ابزارها و پل دیزاین تا پیاده‌سازی
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555]">
            WORKFLOW & TECHNICAL TOOLKIT
          </div>
        </motion.div>

        {/* Conceptual Manifesto with Scroll Expansion */}
        <motion.div
          style={{ scale: bannerScale }}
          className="mb-16 p-6 sm:p-8 bg-[#111111] text-[#f4f3ef] border-2 border-[#111111] shadow-[8px_8px_0px_#0047ff] grid grid-cols-1 md:grid-cols-4 gap-6 items-center origin-center"
        >
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono text-[#d4ff00] font-bold uppercase tracking-wider">
              // THE WORKFLOW BRIDGE
            </span>
            <h3 className="text-lg flex gap-x-2 items-center sm:text-2xl font-black text-[#f4f3ef]">
              ایده <MoveLeft /> دیزاین سیستم <MoveLeft /> پیاده‌سازی فنی{" "}
              <MoveLeft />
              محصول نهایی
            </h3>
            <p className="text-xs sm:text-sm text-[#cccccc] font-medium leading-relaxed max-w-[60ch]">
              من ابزارها را فقط لیست نمی‌کنم؛ بلکه از هر یک به عنوان وسیله‌ای
              برای حل مسأله، حفظ سرعت لود و ساخت یک سیستم زنده، روان و زیبا
              استفاده می‌کنم.
            </p>
          </div>
          {/*<div className="md:col-span-1 border-t md:border-t-0 md:border-r border-[#333333] pt-4 md:pt-0 md:pr-6 font-mono text-xs text-[#cccccc] space-y-1">
            <div className="text-[#d4ff00] font-bold">TOOLKIT_VERIFIED</div>
            <div>بر اساس سورس کدهای واقعی</div>
          </div>*/}
        </motion.div>

        {/* 4 Architectural Stack Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#f4f3ef] border-2 border-[#111111] p-6 sm:p-8 shadow-[6px_6px_0px_#111111] hover:shadow-[10px_10px_0px_#0047ff] transition-all space-y-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Category Header Bar */}
                <div className="flex items-center justify-between border-b border-[#111111] pb-3 font-mono text-xs">
                  <span className="text-xl font-black text-[#0047ff] group-hover:text-[#ff3b00] transition-colors">
                    {category.number}
                  </span>
                  <span className="font-bold text-[#111111]">
                    {category.englishTitle}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#111111] tracking-tight">
                  {category.title}
                </h3>

                <p className="text-xs text-[#555555] font-semibold leading-relaxed">
                  {category.tagline}
                </p>

                {/* Core Tools Badges */}
                <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                  {category.coreTools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 bg-[#e9e7e1] text-[#111111] font-bold border border-[#111111] group-hover:border-[#0047ff] group-hover:bg-[#111111] group-hover:text-[#f4f3ef] transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workflow Mindset Footer */}
              <div className="pt-4 border-t border-[#111111] text-[11px] text-[#555555] font-semibold flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0047ff] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {category.workflowMindset}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
