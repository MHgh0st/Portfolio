"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Code2, Terminal, Layers, Cpu, Smartphone, Database, Palette } from "lucide-react";
import { SectionGeometry } from "./SectionGeometry";

type Pillar = {
  number: string;
  id: string;
  title: string;
  englishTitle: string;
  statement: string;
  manifesto: string;
  evidenceStack: string[];
  repos: string[];
  icon: typeof Compass;
};

const PILLARS: Pillar[] = [
  {
    number: "۰۱",
    id: "visualization-data",
    title: "تصویرسازی داده‌های حجیم و موتورهای گراف",
    englishTitle: "HIGH-PERFORMANCE GRAPH & DATA VISUALIZATION",
    statement: "معماری رندرینگ زیر ۱۶ms برای داده‌های چند ده‌هزار نودی با حذف کامل افت فریم و پردازش موازی در Web Worker.",
    manifesto: "در سامانه‌های تحلیل داده مانند سامانه فکر (GraphNext) و Graph، چالش اصلی جلوگیری از بلاک شدن ترد UI است. با انتقال محاسبات سنگین چیدمان فضایی به Web Worker با موتور ELK.js و استفاده از استریم باینری Apache Arrow، دکامپرشن fzstd و دیاگرام‌های D3-Sankey، سنگین‌ترین داده‌ها با فریم‌ریت ۶۰FPS رندر می‌شوند.",
    evidenceStack: [
      "رندرینگ تعاملی نودها و جریان‌های Sankey با xyflow/react، D3.js و ApexCharts",
      "محاسبات الگوریتمی چیدمان خودکار در ترد پس‌زمینه با Web Worker و ELK.js",
      "استریم و انکودینگ ستونی داده‌های شبکه با Apache Arrow، MsgPack و Zstandard",
    ],
    repos: ["سامانه فکر (GraphNext)", "Graph"],
    icon: Layers,
  },
  {
    number: "۰۲",
    id: "fullstack-data-engineering",
    title: "مهندسی فول‌استک و خطوط لوله داده‌ای پرسرعت",
    englishTitle: "FULL-STACK & HIGH-SPEED DATA PIPELINES",
    statement: "توسعه اندپوینت‌های سریع با پایتون و Polars، پایگاه داده PostgreSQL و معماری کانتینری داکر.",
    manifesto: "تسلط من فراتر از لایه ظاهر است؛ در سامانه فکر و پروژه‌های بک‌اند، خطوط پردازش داده را با Python (FastAPI) و فریم‌ورک فوق‌سریع Polars به جای Pandas پیاده‌سازی می‌کنم تا استخراج ماتریس‌های گراف، تحلیل لاگ‌های فرآیندی و کوئری‌های دیتابیس با کمترین زمان تاخیر و مصرف حافظه انجام شوند.",
    evidenceStack: [
      "طراحی سرویس‌های پردازش داده و ماتریس DFG با FastAPI و موتور چندنخی Polars",
      "اتصال بهینه به دیتابیس PostgreSQL با درایورهای پرسرعت ConnectorX و PyArrow",
      "زیرساخت داکرایز شده کامل و هماهنگ سرویس‌ها با Docker Compose",
    ],
    repos: ["سامانه فکر (BackEnd)", "nextjsRepositoryPattern"],
    icon: Database,
  },
  {
    number: "۰۳",
    id: "cross-platform-native",
    title: "توسعه کراس‌پلتفرم و موبایل نیتیو با Skia",
    englishTitle: "CROSS-PLATFORM & NATIVE MOBILE ARCHITECTURE",
    statement: "خلق اپلیکیشن‌های موبایل همگام با استانداردهای نیتیو، گرافیک ۲ بعدی Skia و انیمیشن‌های ۶۰ فریم.",
    manifesto: "تجربه کاربری واقعی موبایل نیازمند درک عمیق از ترد گرافیکی و انیمیشن‌های نیتیو است. در اپلیکیشن‌های پیشرفته‌ای مانند Salma_app، با ترکیب React Native 0.86، Expo Router SDK 57، رندرهای گرافیکی Shopify Skia و Reanimated 4، رابط‌های کاربری‌ای خلق می‌کنم که دقیقاً حس نرمی یک اپلیکیشن بومی را منتقل می‌کنند.",
    evidenceStack: [
      "معماری مدرن اپلیکیشن‌های موبایل بر بستر New Architecture در Expo 57 و React Native",
      "رندرهای گرافیکی پیشرفته، بلورهای بلادرنگ و شیدرهای بصری با Shopify Skia",
      "ژستورهای لمسی، دراورهای شیشه‌ای و انیمیشن‌های ۶۰ فریم با Reanimated 4 و Bottom-Sheet",
    ],
    repos: ["Salma_app", "salma_admin_panel", "SalmaLanding"],
    icon: Smartphone,
  },
  {
    number: "۰۴",
    id: "design-systems-architecture",
    title: "سیستم‌های دیزاین اختصاصی و وب تعاملی مدرن",
    englishTitle: "ZERO-DEPENDENCY DESIGN SYSTEMS & MODERN WEB",
    statement: "معماری پاک فرانت‌اند، ساخت دیزاین‌سیستم‌های ۱۰۰٪ دست‌ساز و ادیتورهای متن غنی.",
    manifesto: "اعتقاد من بر این است که یک مهندس ارشد نباید وابسته به پکیج‌های آماده UI باشد. در پروژه‌هایی مانند ticketing-system، تمام اجزا (حباب‌های چت، دراورها، جداول صفحه‌بندی‌شده) از صفر به صورت کاملاً مستقل پیاده شده است. همچنین در Karzar و Salma Admin از ادیتورهای پیشرفته Tiptap و HeroUI v3 با کامپایلر رسمی React 19 استفاده شده است.",
    evidenceStack: [
      "توسعه صفر تا صد دیزاین‌سیستم و کامپوننت‌های Reusable بدون وابستگی به کتابخانه‌های متفرقه",
      "پیاده‌سازی ادیتورهای متن غنی (Rich-Text Editor) با اکوسیستم Tiptap در Next.js",
      "معماری دشبوردهای سازمانی مدرن با HeroUI v3، استیت‌های اتمیک Zustand و احراز هویت NextAuth",
    ],
    repos: ["ticketing-system", "Karzar", "salma_admin_panel", "ASCVD"],
    icon: Palette,
  },
];

export function WhatIDoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} id="what-i-do" className="py-16 sm:py-24 border-b border-[#111111] bg-swiss-grid relative select-none overflow-hidden">
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="what-i-do" scrollYProgress={scrollYProgress} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Banner */}
        <div className="mb-14 border-b border-[#111111] pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] p-5 border shadow-[4px_4px_0px_#111111]">
          <div>
            <div className="text-xs font-bold text-[#0047ff] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Terminal className="w-4 h-4 text-[#ff3b00]" />
              <span>[بخش ۰۲ // رویکرد مهندسی و حوزه‌های تخصصی]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight uppercase">
              طرز فکر، معماری و نحوه خلق محصول
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555]">
            EVIDENCE-BASED ENGINEERING MINDSET
          </div>
        </div>

        {/* Editorial Sub-Manifesto Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-6 sm:p-8 bg-[#111111] text-[#f4f3ef] border-2 border-[#111111] shadow-[8px_8px_0px_#0047ff] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-[65ch]">
            <span className="text-xs font-mono text-[#d4ff00] font-bold uppercase tracking-wider">
              // PHILOSOPHY & SYSTEM ARCHITECTURE
            </span>
            <p className="text-base sm:text-xl font-bold leading-relaxed text-[#f4f3ef]">
              تلاقی مهندسی سیستم‌های فول‌استک، مصورسازی داده‌های پرحجم، توسعه اپلیکیشن‌های بومی موبایل با Skia و خلق دیزاین‌سیستم‌های اختصاصی بدون وابستگی زائد.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-[#cccccc] border-t md:border-t-0 md:border-r border-[#333333] pt-4 md:pt-0 md:pr-6">
            <div>ارزیابی شده در: ۱۶ ریپازیتوری</div>
            <div className="text-[#d4ff00] font-bold mt-1">FULL_STACK_CRAFT // VERIFIED</div>
          </div>
        </motion.div>

        {/* 3 Open Editorial Pillars Stack */}
        <div className="space-y-12">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#f4f3ef] border-2 border-[#111111] shadow-[6px_6px_0px_#111111] overflow-hidden group hover:shadow-[10px_10px_0px_#0047ff] transition-all duration-300"
              >
                {/* Pillar Header Bar */}
                <div className="px-6 py-4 bg-[#111111] text-[#f4f3ef] flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#111111]">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-[#d4ff00]">
                      {pillar.number}
                    </span>
                    <span className="font-bold tracking-wider">
                      PILLAR // {pillar.englishTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-[#d4ff00]" />
                    <span className="text-[11px] text-[#cccccc] font-sans">ثبت شده در: {pillar.repos.join(" • ")}</span>
                  </div>
                </div>

                {/* Pillar Main Editorial Content Grid */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left (RTL Start): Title & Statement Quote */}
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-[#111111] leading-relaxed border-r-4 border-[#0047ff] pr-4 py-1">
                      "{pillar.statement}"
                    </p>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-medium">
                      {pillar.manifesto}
                    </p>
                  </div>

                  {/* Right (RTL End): 3 Structured Evidence Stack Cards */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="text-xs font-mono text-[#0047ff] font-bold uppercase mb-2">
                      // شواهد و اثبات معماری در سورس‌کدها:
                    </div>
                    <div className="space-y-2.5">
                      {pillar.evidenceStack.map((evidence, eIdx) => (
                        <div
                          key={eIdx}
                          className="p-3.5 bg-[#e9e7e1] border border-[#111111] flex items-start gap-3 text-xs font-semibold text-[#111111] group-hover:border-[#0047ff] transition-colors"
                        >
                          <span className="font-mono text-[#0047ff] font-bold shrink-0 text-sm">
                            ۰{eIdx + 1}.
                          </span>
                          <span className="leading-relaxed">{evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Decorative Line Indicator */}
                <div className="h-1.5 w-full bg-[#111111] group-hover:bg-[#0047ff] transition-colors" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
