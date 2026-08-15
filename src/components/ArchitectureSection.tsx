"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, ShieldCheck, Activity } from "lucide-react";

type ArchPillar = {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  description: string;
};

const PILLARS: ArchPillar[] = [
  {
    id: "vitals",
    title: "بهینه‌سازی Core Web Vitals",
    subtitle: "شاخص LCP زیر ۱۰۰ms و عدم وجود تاخیر INP",
    metric: "۱۰۰ / ۱۰۰ LIGHTHOUSE",
    description: "استراتژی بهینه‌سازی بارگذاری پیش‌فرض فونت‌های محلی، لودینگ زودهنگام فایل‌ها، استخراج CSS حیاتی و صفر کردن کامل jank لایوت (CLS < 0.01).",
  },
  {
    id: "rsc",
    title: "معماری React Server Components",
    subtitle: "حداقل حجم جاوااسکریپت در سمت کلاینت",
    metric: "حجم باندل کمتر از ۴۵KB",
    description: "جداسازی دقیق کامپوننت‌های کلاینتی از کامپوننت‌های سروری در React 19. تولید HTML استاتیک روی Edge بدون هایدریشن اضافی در سمت کلاینت.",
  },
  {
    id: "state",
    title: "مهندسی وضعیت‌های پیش‌بینی‌پذیر",
    subtitle: "استفاده از ماشین حالت و جریان‌های تغییرناپذیر",
    metric: "حذف رندرهای مجدد اضافی",
    description: "معماری فرم‌ها و جریان‌های پیچیده استریمینگ با ماشین حالت سفارشی، هوک‌های رویدادمحور و اسلایس‌های اتمیک Zustand.",
  },
];

export function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerX = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const pillarY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} id="architecture" className="py-16 sm:py-24 border-b border-[#111111] bg-swiss-grid overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Horizontal Scroll Translation */}
        <motion.div
          style={{ x: headerX }}
          className="mb-12 border-b border-[#111111] pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] p-4 border"
        >
          <div>
            <div className="text-xs font-bold text-[#0047ff] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Cpu className="w-4 h-4" />
              <span>[بخش ۰۲ // اصول و استانداردهای مهندسی]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight uppercase">
              رادار معماری فرانت‌اند
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555]">
            دقت مهندسی × عملکرد × رندرینگ
          </div>
        </motion.div>

        {/* 3 Asymmetric Architectural Pillars with Scroll Parallax */}
        <motion.div style={{ y: pillarY }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#f4f3ef] border border-[#111111] p-6 flex flex-col justify-between space-y-6 hover:border-[#0047ff] hover:shadow-[6px_6px_0px_#111111] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#0047ff] font-bold border-b border-[#111111] pb-3 mb-4">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#ff3b00] group-hover:scale-125 transition-transform" />
                    {pillar.id.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 bg-[#d4ff00] text-[#111111] text-[10px] border border-[#111111] font-mono">
                    {pillar.metric}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#111111] leading-tight mb-2 group-hover:text-[#0047ff] transition-colors">
                  {pillar.title}
                </h3>
                <div className="text-xs text-[#0047ff] font-bold mb-4 font-mono">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-[#555555] leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#111111] flex items-center justify-between text-[11px] text-[#555555]">
                <span>توانمندی تست شده</span>
                <ShieldCheck className="w-4 h-4 text-[#0047ff]" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
