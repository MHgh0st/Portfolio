"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Layers, Activity, ShieldCheck, FileCode, Image as ImageIcon, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SectionGeometry } from "./SectionGeometry";

type CaseChapter = {
  number: string;
  id: string;
  title: string;
  englishTitle: string;
};

const CHAPTERS: CaseChapter[] = [
  { number: "۰۱", id: "overview", title: "نگاه کلی به محصول", englishTitle: "OVERVIEW" },
  { number: "۰۲", id: "challenge", title: "چالش‌های اصلی", englishTitle: "THE CHALLENGE" },
  { number: "۰۳", id: "approach", title: "رویکرد فکری و تفکر محصولی", englishTitle: "THE APPROACH" },
  { number: "۰۴", id: "visuals", title: "پیش‌نمایش بصری و ویدیوها", englishTitle: "VISUALS & DEMO" },
  { number: "۰۵", id: "design-system", title: "سیستم دیزاین و واکاو UI", englishTitle: "DESIGN SYSTEM & UI" },
  { number: "۰۶", id: "engineering", title: "پیاده‌سازی و معماری فنی", englishTitle: "ENGINEERING & EXECUTION" },
  { number: "۰۷", id: "outcome", title: "نتایج و دستاوردها", englishTitle: "OUTCOME & IMPACT" },
];

export function FeaturedCaseStudySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapterId, setActiveChapterId] = useState<string>("overview");
  const [images] = useState<string[]>([]);

  // Scroll Progress Animations for Story Unfolding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerX = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const heroCardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.96, 1]);
  const chapterTranslateY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  return (
    <section ref={containerRef} id="featured-case-study" className="py-16 sm:py-24 border-b border-[#111111] bg-[#f4f3ef] relative select-none overflow-hidden">
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="case-study-salma" scrollYProgress={scrollYProgress} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Banner with Continuous Scroll Horizontal Translation */}
        <motion.div style={{ x: headerX }} className="mb-12 border-b border-[#111111] pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] p-5 border shadow-[4px_4px_0px_#111111]">
          <div>
            <div className="text-xs font-bold text-[#0047ff] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Activity className="w-4 h-4 text-[#ff3b00]" />
              <span>[کیس‌استدی اختصاصی // FEATURED CASE STUDY]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight uppercase">
              پلتفرم مدیریت سلامت و معماری برنامه‌های سلما
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555]">
            SALMA ADMIN PANEL // CASE_STUDY_01
          </div>
        </motion.div>

        {/* Hero Banner for the Featured Product with Scroll Expansion */}
        <motion.div style={{ scale: heroCardScale }} className="mb-12 bg-[#111111] text-[#f4f3ef] border-2 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_#0047ff] relative overflow-hidden origin-center">
          <div className="absolute inset-0 bg-swiss-grid opacity-10 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0047ff] text-[#d4ff00] text-xs font-mono font-bold border border-[#111111]">
                <Terminal className="w-3.5 h-3.5" />
                <span>SALMA_ADMIN_PANEL // REPO_EVIDENCE</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-[#f4f3ef]">
                معماری فرانت‌اند و مهندسی پنل مدیریت برنامه‌های بالینی و سلامت سلما
              </h3>

              <p className="text-xs sm:text-sm text-[#cccccc] font-medium leading-relaxed max-w-[65ch]">
                پنل ادمین سلما یک زیرساخت مقیاس‌پذیر فرانت‌اند برای کادر درمانی و اپراتورهای سلامت است؛ طراحی شده جهت پیکربندی ساختار چندسطحی برنامه‌ها (Plan Structure)، دسته‌بندی بیماری‌ها، سیستم پرسش‌وپاسخ پویا و مدیریت مکمل‌های غذایی با تکیه بر HeroUI v3 و کامپایلر رسمی React 19.
              </p>
            </div>

            {/* Quick Tech Specs Counter Box */}
            <div className="lg:col-span-4 bg-[#f4f3ef] text-[#111111] p-5 border-2 border-[#111111] shadow-[4px_4px_0px_#d4ff00] font-mono text-xs space-y-2.5">
              <div className="flex justify-between border-b border-[#111111] pb-1">
                <span className="text-[#555555]">فریم‌ورک:</span>
                <span className="font-bold text-[#0047ff]">Next.js 16 (React 19)</span>
              </div>
              <div className="flex justify-between border-b border-[#111111] pb-1">
                <span className="text-[#555555]">سیستم دیزاین:</span>
                <span className="font-bold text-[#111111]">HeroUI v3 + Tailwind v4</span>
              </div>
              <div className="flex justify-between border-b border-[#111111] pb-1">
                <span className="text-[#555555]">بهینه‌ساز رندر:</span>
                <span className="font-bold text-[#111111]">React Compiler (Babel)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555555]">مدیریت وضعیت:</span>
                <span className="font-bold text-[#ff3b00]">Zustand + Motion</span>
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
                <span className={`font-mono font-bold ml-1.5 ${isSelected ? "text-[#d4ff00]" : "text-[#0047ff]"}`}>
                  {chap.number}
                </span>
                <span>{chap.title}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Dynamic Editorial Content with Scroll Parallax */}
        <motion.div style={{ y: chapterTranslateY }} className="bg-[#f4f3ef] border-2 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_#111111] min-h-[420px]">
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
                معرفی محصول، اهداف و دامنه کاربرد
              </h3>

              <p className="text-sm sm:text-base text-[#111111] font-semibold leading-relaxed">
                سامانه <strong className="text-[#0047ff]">Salma Admin Panel</strong> هاب مرکزی و بازوی اجرایی کادر پزشکی برای تعریف دوره‌های درمانی، تنظیم پرسشنامه‌های ارزیابی سلامت، تعریف پروفایل بیماری‌ها، تخصیص مکمل‌ها و سازمان‌دهی پلن‌های ورزشی و تغذیه‌ای کاربران در اپلیکیشن سلما است. این پروژه با تفکیک دقیق دامنه‌ها و ماژولار بودن بخش‌های CRUD پیاده‌سازی شده تا اضافه کردن هر قابلیت جدید بدون تداخل در منطق قبلی انجام پذیرد.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 font-mono text-xs">
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <span className="text-[#555555]">نقش فنی:</span>
                  <div className="font-bold text-[#111111]">Lead Frontend Architect</div>
                </div>
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <span className="text-[#555555]">دامین محصول:</span>
                  <div className="font-bold text-[#0047ff]">Clinical Health & Nutrition</div>
                </div>
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <span className="text-[#555555]">پرفورمنس و معماری:</span>
                  <div className="font-bold text-[#ff3b00]">React Compiler + معماری ماژولار</div>
                </div>
              </div>
            </div>
          )}

          {/* 02 — The Challenge */}
          {activeChapterId === "challenge" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۲</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // THE TECHNICAL CHALLENGES
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                چالش‌های اصلی مهندسی و مدیریت ساختار تودرتو
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#111111] font-semibold leading-relaxed">
                <p className="p-4 bg-[#e9e7e1] border border-[#111111] border-r-4 border-r-[#ff3b00]">
                  <strong>۱. مدیریت فرم‌های عمیق و پیچیده (Deep Form State):</strong> در ماژول‌های <code className="font-mono text-[#0047ff]">planStructure.tsx</code> و <code className="font-mono text-[#0047ff]">questions.tsx</code>، هر برنامه شامل مراحل متعدد، شروط وابستگی بین سوالات و تخصیص داینامیک مکمل‌ها است. کنترل اعتبارسنجی همزمان و حفظ روانی UI بدون ری‌رندرهای ناخواسته چالش اصلی معماری بود.
                </p>
                <p className="p-4 bg-[#e9e7e1] border border-[#111111] border-r-4 border-r-[#0047ff]">
                  <strong>۲. انسجام رابط کاربری در بخش‌های متعدد:</strong> طراحی و استقرار کامپوننت‌های پایه و مشترک CRUD برای مدیریت یکپارچه جدول‌ها، اکشن‌های سطری و هدر صفحات در تمام بخش‌های سیستم.
                </p>
                <p className="p-4 bg-[#e9e7e1] border border-[#111111] border-r-4 border-r-[#d4ff00]">
                  <strong>۳. حفظ سرعت ۶۰ فریم در فرم‌های حجیم:</strong> استفاده هوشمندانه از کامپایلر رسمی React 19 برای مموایز خودکار کامپوننت‌ها و بهینه‌سازی بار رندرینگ بدون نیاز به استفاده دستی و مکرر از <code className="font-mono text-[#111111]">useMemo</code>.
                </p>
              </div>
            </div>
          )}

          {/* 03 — The Approach */}
          {activeChapterId === "approach" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۳</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // ARCHITECTURAL APPROACH
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                معماری لایه‌بندی شده و تفکیک دامنه‌ها
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <h4 className="font-bold text-[#0047ff] text-xs font-mono">// معماری ماژولار مبتنی بر نماها (View-Based Modular Architecture)</h4>
                  <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                    تقسیم کامل سیستم به ماژول‌های مستقل: <code className="font-mono text-[#0047ff]">planStructure</code> (ساختار پلن)، <code className="font-mono text-[#0047ff]">questions</code> (سیستم پرسش و پاسخ)، <code className="font-mono text-[#0047ff]">sickness</code> (مدیریت بیماری‌ها)، <code className="font-mono text-[#0047ff]">supplementals</code> (مکمل‌ها) و <code className="font-mono text-[#0047ff]">education</code> (آموزش‌ها).
                  </p>
                </div>

                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <h4 className="font-bold text-[#0047ff] text-xs font-mono">// کامپوننت‌های عمومی CRUD و جداسازی Logic از UI</h4>
                  <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                    ایجاد کامپوننت‌های هسته مانند <code className="font-mono text-[#0047ff]">entityTable.tsx</code>، <code className="font-mono text-[#0047ff]">crudPageHeader.tsx</code> و <code className="font-mono text-[#0047ff]">rowActions.tsx</code> که رفتار جدول‌ها و دکمه‌های عملیاتی را در سراسر پنل استاندارد و منسجم کرده‌اند.
                  </p>
                </div>

                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-1">
                  <h4 className="font-bold text-[#0047ff] text-xs font-mono">// مدیریت وضعیت سبک با Zustand</h4>
                  <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                    کنترل باز و بسته بودن سایدبار، تب‌های فعال و وضعیت‌های اشتراکی بین صفحات بدون تحمیل بار اضافی بر رندرهای React.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 04 — Visuals & Demo */}
          {activeChapterId === "visuals" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۴</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // VISUALS & MEDIA DEMO
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                پیش‌نمایش بصری و ویدیوهای تعاملی
              </h3>

              {images && images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((imgSrc, idx) => (
                    <div key={idx} className="relative w-full aspect-video border-2 border-[#111111] overflow-hidden bg-[#e9e7e1]">
                      <Image src={imgSrc} alt={`Salma Admin Screenshot ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full aspect-video border-2 border-[#111111] bg-[#e9e7e1] p-6 flex flex-col justify-between relative overflow-hidden group shadow-[6px_6px_0px_#111111]">
                  <div className="absolute inset-0 bg-swiss-grid opacity-40 pointer-events-none" />

                  <div className="flex justify-between items-center font-mono text-[11px] text-[#111111] z-10 border-b border-[#111111] pb-2">
                    <span className="font-bold">// SOURCE_DOCS // SALMA_ADMIN</span>
                    <span className="bg-[#111111] text-[#d4ff00] font-bold px-2 py-0.5 border border-[#111111]">
                      GITHUB_EVIDENCE
                    </span>
                  </div>

                  <div className="my-auto text-center space-y-3 z-10 px-4">
                    <div className="w-14 h-14 mx-auto border-2 border-[#111111] bg-[#111111] text-[#f4f3ef] flex items-center justify-center shadow-[4px_4px_0px_#0047ff]">
                      <Terminal className="w-7 h-7 text-[#d4ff00]" />
                    </div>
                    <h5 className="font-black text-base text-[#111111]">
                      مستندات و ساختار پنل مدیریت در مخزن گیت‌هاب
                    </h5>
                    <p className="text-xs font-semibold text-[#555555] max-w-[48ch] mx-auto leading-relaxed">
                      برای بررسی لایه‌بندی کامپوننت‌ها، سیستم روتینگ و معماری برنامه سلامت سلما به ریپازیتوری سورس‌کد مراجعه فرمایید.
                    </p>

                    <div className="pt-2">
                      <a
                        href="https://github.com/MHgh0st/salma_admin_panel"
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="interactive"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#0047ff] hover:bg-[#111111] text-[#f4f3ef] text-xs font-bold border border-[#111111] shadow-[3px_3px_0px_#111111] transition-all"
                      >
                        <span>مشاهده مخزن در گیت‌هاب</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#d4ff00]" />
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#111111] flex items-center justify-between text-[10px] font-mono text-[#555555] z-10">
                    <span>REPOSITORY: MHgh0st/salma_admin_panel</span>
                    <span className="text-[#0047ff] font-bold">NEXT.js 16 // VERIFIED</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 05 — Design System / Interface */}
          {activeChapterId === "design-system" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۵</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // DESIGN SYSTEM & UI PATTERNS
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                پیاده‌سازی HeroUI v3 و ادغام با Tailwind CSS v4
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-2">
                  <div className="font-mono font-bold text-[#0047ff]">// HEROUI V3 + @HEROUI/STYLES</div>
                  <p className="text-[#555555] leading-relaxed">
                    استفاده از معماری نوین کامپوننت‌های HeroUI v3 بر پایه React Aria Components جهت تامین بالاترین سطح استاندارد دسترسی‌پذیری (A11y)، کیبورد نویگیشن و کامپوننت‌های Compound (مثل دکمه‌ها، دراپ‌داون‌ها، مودال‌ها و تب‌ها).
                  </p>
                </div>

                <div className="p-4 bg-[#e9e7e1] border border-[#111111] space-y-2">
                  <div className="font-mono font-bold text-[#0047ff]">// آیکون‌های عملکردی SOLAR ICONS</div>
                  <p className="text-[#555555] leading-relaxed">
                    استفاده از پکیج بهینه‌شده <code className="font-mono text-[#111111]">@solar-icons/react-perf</code> برای داشتن استروک‌های یکدست و بارگذاری آنی آیکون‌ها بدون افزایش حجم باندل خروجی.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 06 — Building The Product */}
          {activeChapterId === "engineering" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۶</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // ENGINEERING & EXECUTION
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                معماری کامپایلر React 19 و یکپارچگی انیمیشن‌ها
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-[#111111] text-[#f4f3ef] border border-[#111111] flex items-center justify-between">
                  <span>REACT 19 COMPILER (BABEL PLUGIN):</span>
                  <span className="text-[#d4ff00] font-bold">کامپایل خودکار و حذف محاسبات رندرینگ تکراری</span>
                </div>

                <div className="p-3.5 bg-[#111111] text-[#f4f3ef] border border-[#111111] flex items-center justify-between">
                  <span>ZUSTAND ATOMIC STATE:</span>
                  <span className="text-[#d4ff00] font-bold">استیت‌منیجمنت ایزوله بدون سربار بر رندرهای سراسری</span>
                </div>

                <div className="p-3.5 bg-[#111111] text-[#f4f3ef] border border-[#111111] flex items-center justify-between">
                  <span>MOTION REACT (FRAMER MOTION V12):</span>
                  <span className="text-[#d4ff00] font-bold">ترنزیشن‌های روان مودال‌ها و صفحات مدیریتی</span>
                </div>
              </div>
            </div>
          )}

          {/* 07 — Outcome */}
          {activeChapterId === "outcome" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs border-b border-[#111111] pb-3">
                <span className="text-xl font-black text-[#0047ff]">۰۷</span>
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  CHAPTER // OUTCOME & VALUE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#111111]">
                نتایج عملی و ارزش خلق‌شده در محصول
              </h3>

              <div className="p-6 bg-[#d4ff00] text-[#111111] border-2 border-[#111111] shadow-[6px_6px_0px_#111111] space-y-3">
                <h4 className="font-black text-lg">// محصول نهایی و دستاورد کاری</h4>
                <p className="text-xs sm:text-sm font-bold leading-relaxed">
                  ایجاد یک دشبورد مدیریتی فوق‌العاده سریع، منسجم و روان برای کادر سلامت سلما که ساخت، ویرایش و تخصیص برنامه‌های پزشکی، تغذیه و مکمل‌ها را کاملاً ساده، سازمان‌یافته و بدون لگ کرده است.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Chapter Progress & Legal Sign-off */}
        <div className="mt-10 pt-4 border-t border-[#111111] flex items-center justify-between text-xs font-mono text-[#555555]">
          <span className="flex items-center gap-1.5 font-bold text-[#111111]">
            <ShieldCheck className="w-4 h-4 text-[#0047ff]" />
            استخراج شده مستقیم از ریپازیتوری salma_admin_panel
          </span>
          <span className="font-bold text-[#0047ff]">CHAPTER {activeChapter.number} OF ۰۷</span>
        </div>

      </div>
    </section>
  );
}
