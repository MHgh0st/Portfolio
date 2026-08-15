"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, ShieldCheck, Compass, Sparkles, Feather, UserRoundCheck, Lightbulb } from "lucide-react";
import { SectionGeometry } from "./SectionGeometry";

type Principle = {
  number: string;
  title: string;
  statement: string;
};

const PRINCIPLES: Principle[] = [
  {
    number: "۰۱",
    title: "معماری داده و حل مسأله پیش از دیزاین",
    statement: "یک محصول ممتاز با تزیینات سطحی شروع نمی‌شود؛ با درک دقیق مسأله، معماری مقیاس‌پذیر داده‌ها و سادگی ساختاری جان می‌گیرد.",
  },
  {
    number: "۰۲",
    title: "ظرافت مهندسی، سرعت و احترام به کاربر",
    statement: "سرعت رندرینگ بالا، عدم وجود Layout Shift و روان بودن فریم‌ها نوعی احترام به وقت کاربر است. کیفیت واقعی در جزییاتی است که دیده نمی‌شوند اما حس می‌شوند.",
  },
  {
    number: "۰۳",
    title: "استقلال، پایداری و دیزاین‌سیستم‌های دست‌ساز",
    statement: "کدنویسی تمیز، ساختار قابل نگهداری و کامپوننت‌های مستقل از پکیج‌های آماده، تفاوت بین یک پروژه موقت و یک محصول ماندگار است.",
  },
];

export function AboutPhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bannerX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const quoteScale = useTransform(scrollYProgress, [0.1, 0.4], [0.96, 1]);

  return (
    <section ref={containerRef} id="about-philosophy" className="py-16 sm:py-24 border-b border-[#111111] bg-[#f4f3ef] relative select-none overflow-hidden">
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="about" scrollYProgress={scrollYProgress} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Banner with Continuous Scroll Horizontal Translation */}
        <motion.div style={{ x: bannerX }} className="mb-14 border-b border-[#111111] pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] p-5 border shadow-[4px_4px_0px_#111111]">
          <div>
            <div className="text-xs font-bold text-[#0047ff] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Feather className="w-4 h-4 text-[#ff3b00]" />
              <span>[بخش ۰۳ // فلسفه فردی و رویکرد فکری]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight uppercase">
              انگیزه خلق، ارزش‌ها و دیدگاه فردی
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555]">
            PERSONAL PERSPECTIVE & PHILOSOPHY
          </div>
        </motion.div>

        {/* Editorial Personal Narrative Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Right Column (RTL Start): Main Personal Narrative Quote with Scroll Expansion */}
          <motion.div
            style={{ scale: quoteScale }}
            className="lg:col-span-7 bg-[#111111] text-[#f4f3ef] border-2 border-[#111111] p-8 sm:p-10 shadow-[8px_8px_0px_#0047ff] space-y-6 relative overflow-hidden origin-center"
          >
            <div className="absolute inset-0 bg-swiss-grid opacity-10 pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0047ff] text-[#d4ff00] text-xs font-mono font-bold border border-[#111111]">
              <UserRoundCheck className="w-3.5 h-3.5 text-[#d4ff00]" />
              <span>WHO IS BEHIND THE CODE?</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black leading-tight text-[#f4f3ef]">
              من مهندسی نرم‌افزار را تلاقی «حل مسائل پیچیده سیستمی» و «ظرافت بصری ۶۰ فریم» می‌دانم.
            </h3>

            <p className="text-xs sm:text-sm text-[#cccccc] font-medium leading-relaxed max-w-[60ch]">
              جذابیت توسعه نرم‌افزار برای من فراتر از نوشتن کد است؛ تبدیل الگوهای داده‌ای پیچیده، پردازش‌های مقیاس‌پذیر و ایده‌های انتزاعی به یک سیستم زنده، سریع و بی‌نقص. یک محصول استثنایی زمانی متولد می‌شود که معماری پاک و مهندسی داده‌ها با وسواس روی تجربه کاربری، تعاملات روان و هویت بصری متمایز پیوند بخورد.
            </p>

            <div className="pt-4 border-t border-[#333333] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#888888]">
              <span>محمدحسین غلامی // MHGH0ST</span>
              <span className="text-[#d4ff00] font-bold">FOCUS: HIGH_CRAFT_ENGINEERING</span>
            </div>
          </motion.div>

          {/* Left Column (RTL End): Personal Approach & Mindset Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-[#f4f3ef] border-2 border-[#111111] p-6 sm:p-8 shadow-[6px_6px_0px_#111111] space-y-6"
          >
            <div className="border-b border-[#111111] pb-3 flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-[#0047ff]">MY_APPROACH // روند فکری</span>
              <Lightbulb className="w-4 h-4 text-[#ff3b00]" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#111111] font-semibold leading-relaxed">
              <p className="p-3.5 bg-[#e9e7e1] border border-[#111111]">
                <strong>گام اول (معماری و ریشه‌یابی):</strong> درک عمیق ماهیت مسأله، طراحی خطوط لوله داده و استخراج الگوهای سیستمی پیش از نوشتن اولین خط کد.
              </p>
              <p className="p-3.5 bg-[#e9e7e1] border border-[#111111]">
                <strong>گام دوم (خلق مستقل و ماژولار):</strong> ساخت سیستم‌های دیزاین مستقل، فرم‌های چندسطحی مستحکم و کامپوننت‌های دست‌ساز بدون وابستگی‌های زائد.
              </p>
              <p className="p-3.5 bg-[#e9e7e1] border border-[#111111]">
                <strong>گام سوم (پرفورمنس پایدار):</strong> بهینه‌سازی دقیق در سطح باینری، انتقال محاسبات سنگین به Web Worker و تضمین روانی ۶۰ فریم در ثانیه.
              </p>
            </div>
          </motion.div>

        </div>

        {/* 3 Core Philosophical Principles Stack */}
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-[#0047ff] uppercase tracking-wider mb-2">
            // اصول سه گانه حاکم بر کار من (PHILOSOPHICAL PRINCIPLES):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#f4f3ef] border-2 border-[#111111] p-6 shadow-[5px_5px_0px_#111111] hover:shadow-[8px_8px_0px_#0047ff] transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between border-b border-[#111111] pb-3">
                  <span className="font-mono text-xl font-black text-[#0047ff] group-hover:text-[#ff3b00] transition-colors">
                    {item.number}
                  </span>
                  <Compass className="w-4 h-4 text-[#111111]" />
                </div>

                <h4 className="text-lg font-black text-[#111111]">
                  {item.title}
                </h4>

                <p className="text-xs text-[#555555] font-semibold leading-relaxed">
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
