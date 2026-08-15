"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  Layers,
  Code,
  CheckCircle,
  Maximize2,
  X,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { SectionGeometry } from "./SectionGeometry";
import { useLightbox } from "./ImageLightboxProvider";

type ProjectCase = {
  id: string;
  name: string;
  repoName: string;
  category: string;
  tagline: string;
  overview: string;
  architectureDetails: string;
  keyHighlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  visualPlaceholderTitle: string;
  visualPlaceholderSubtitle: string;
  images?: string[];
};

const PROJECTS: ProjectCase[] = [
  {
    id: "graphnext",
    name: "سامانه فکر // تصویرسازی و تحلیل داده‌های حجیم",
    repoName: "MHgh0st/GraphNext",
    category: "تحلیل داده، گراف‌های برداری و Visual Engine",
    tagline:
      "موتور پردازش و رندرینگ گراف‌های نودی و جریان داده با فشرده‌سازی باینری در فرانت‌اند و فریم‌ریت پایدار ۶۰FPS.",
    overview:
      "سامانه فکر یک زیرساخت مدرن فول‌استک برای پردازش فرآیند (Process Mining)، تحلیل ارتباطات شبکه‌ای و رندرینگ گراف‌های نودی پرحجم است. در این پروژه، سمت بک‌اند با پایتون و ابزارهای پرسرعت FastAPI، Polars و PostgreSQL برای استخراج ماتریس‌های گراف و مسیرهای فرآیند پیاده‌سازی شده و فرانت‌اند Next.js 16 از طریق پروتکل‌های باینری Apache Arrow، MsgPack و چیدمان موازی در Web Worker به رندری فوق‌العاده سریع و پایدار در ۶۰ فریم دست می‌یابد.",
    architectureDetails:
      "معماری فول‌استک داکرایز شده با Docker Compose: بک‌اند توسعه‌یافته با Python 3 (FastAPI)، فریم‌ورک Polars، درایورهای پرسرعت ConnectorX و PyArrow روی دیتابیس PostgreSQL. فرانت‌اند پیاده‌سازی شده با Next.js 16 (App Router) و React 19، تلفیق موتور چیدمان گرافیکی elkjs در Web Worker با @xyflow/react، دیاگرام‌های تعاملی جریان D3-Sankey و چارت‌های تحلیلی ApexCharts با معماری ایزوله Zustand.",
    keyHighlights: [
      "توسعه خط لوله پردازشی در بک‌اند پایتون با FastAPI و Polars جهت استخراج سریع گراف DFG و واریانت‌ها",
      "محاسبه هندسی و چیدمان الگوریتمی موازی گراف با elkjs در محیط Web Worker بدون افت فریم UI",
      "استریم و فشرده‌سازی باینری داده‌ها در سطح کلاینت و سرور با Apache Arrow، MsgPack و Zstandard",
      "تصویرسازی شفاف جریان تراکنش‌ها و ارتباطات فرآیندی با استفاده از D3-Sankey",
      "زیرساخت داکرایز شده کامل (Docker Compose) شامل سرویس‌های Frontend، Backend و PostgreSQL",
    ],
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
    githubUrl: "https://github.com/MHgh0st/GraphNext",
    visualPlaceholderTitle: "SAMANEH FEKR ENGINE WORKBENCH",
    visualPlaceholderSubtitle:
      "نمای تعاملی گراف‌های نودی، جریان‌های D3-Sankey و چارت‌های تحلیل فرآیندی",
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
    name: "محاسبه‌گر تخصصی ریسک قلب و عروق ASCVD",
    repoName: "MHgh0st/ASCVD",
    category: "سلامت دیجیتال، محاسبات بالینی و NextAuth",
    tagline:
      "وب‌اپلیکیشن ارزیابی ریسک ۱۰ ساله بیماری‌های قلبی عروقی بر مبنای گایدلاین‌های بالینی ACC/AHA و پایگاه داده ابری.",
    overview:
      "پروژه ASCVD یک سامانه بالینی دقیق برای تخمین احتمال ابتلا به بیماری‌های قلبی عروقی آترواسکلروتیک است. این وب‌اپلیکیشن فرمول‌های رگرسیون چندمتغیره پیچیده پزشکی را به فرم‌های مرحله‌به‌مرحله با اعتبارسنجی آنی متصل کرده و ضمن تحلیل متغیرهای بیمار (فشار خون، کلسترول، دیابت و سن)، تاریخچه تست‌ها را به صورت ساختاریافته ذخیره و توصیه‌های درمانی سفارشی تولید می‌کند.",
    architectureDetails:
      "توسعه‌یافته بر پایه Next.js 15 و React 19 با تایپ‌سیفتی کامل TypeScript 5 و فریم‌ورک HeroUI. اتصال امن به پایگاه داده PostgreSQL ابری روی Supabase از طریق Prisma ORM. مدیریت نشست‌ها و احراز هویت پیامکی با NextAuth.js، هشینگ پسورد با Bcrypt و رندرینگ نمودارهای گیج تحلیلی با React Gauge.",
    keyHighlights: [
      "پیاده‌سازی دقیق الگوریتم رگرسیون ACC/AHA 2013 با تفکیک ضرایب بر اساس جنسیت و متغیرهای بالینی",
      "طراحی فرم‌های چندمرحله‌ای (Multi-step Form) هوشمند با اعتبارسنجی بلادرنگ داده‌های آزمایشگاهی",
      "احراز هویت پیامکی و مدیریت سشن‌های ایمن کاربران با NextAuth.js و Prisma ORM",
      "سیستم تحلیل خودکار و پیشنهاد گام‌های درمانی و اصلاح سبک زندگی بر اساس درصد ریسک خروجی",
      "ذخیره‌سازی پرونده و پایش روند تغییرات ریسک بیمار در طول زمان روی Supabase PostgreSQL",
    ],
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
    githubUrl: "https://github.com/MHgh0st/ASCVD",
    liveUrl: "https://ascvdupdates.vercel.app",
    visualPlaceholderTitle: "ASCVD CLINICAL DASHBOARD",
    visualPlaceholderSubtitle:
      "فرم‌های مرحله‌به‌مرحله ورود داده‌های آزمایشگاهی و گیج‌های سنجش ریسک بیمار",
    images: [],
  },
  {
    id: "salma-admin",
    name: "پنل مدیریت برنامه‌های سلامت و مکمل‌های سلما",
    repoName: "MHgh0st/salma_admin_panel",
    category: "دشبورد سازمانی، Next.js 16 و HeroUI v3",
    tagline:
      "سامانه جامع مدیریت و تخصیص ساختار برنامه‌ها (Plan Structure)، پروفایل بیماری‌ها، سیستم Q&A و مکمل‌های غذایی با React Compiler.",
    overview:
      "پروژه Salma Admin Panel یک دشبورد پیشرفته فرانت‌اند برای کادر درمانی و پزشکان است که امکان مدیریت ساختار پیچیده برنامه‌های سلامت، ایجاد رژیم‌ها و مکمل‌ها، تعریف بیماری‌ها و پاسخگویی به پرسش‌های بالینی کاربران را فراهم می‌کند. این سامانه با تمرکز بر پرفورمنس بالا، معماری ماژولار و لایه‌بندی شفاف کامپوننت‌ها در Next.js 16 پیاده‌سازی شده است.",
    architectureDetails:
      "توسعه‌یافته با Next.js 16.2 و React 19.2 با کامپایلر بهینه‌ساز React Compiler و استایل‌های نوین Tailwind CSS v4. بهره‌گیری از HeroUI v3 و ماژول جدید @heroui/styles، آیکون‌های بهینه‌شده Solar Icons، انیمیشن‌های روان با Motion و مدیریت وضعیت فرم‌ها و استیت‌های سراسری با Zustand.",
    keyHighlights: [
      "معماری ماژولار با بیش از ۳۶ کیلوبایت سورس‌کد ساختاری در لایه‌های Forms, Store و Layouts",
      "سیستم مدیریت و تفکیک ساختار برنامه‌ها (Plan Structure) و تخصیص هوشمند مکمل‌ها",
      "طراحی کامپوننت‌های پایه و مشترک CRUD (جداول داده، هدر صفحات و اکشن‌های سطری)",
      "استفاده از سیستم دیزاین مدرن HeroUI v3 در کنار کامپایلر رسمی React 19 برای رندرینگ سریع",
      "استیت منیجمنت پایدار و تفکیک‌شده با Zustand و هماهنگی تم تاریک/روشن با next-themes",
    ],
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
    githubUrl: "https://github.com/MHgh0st/salma_admin_panel",
    visualPlaceholderTitle: "SALMA HEALTH ADMIN PANEL",
    visualPlaceholderSubtitle:
      "پنل مدیریت برنامه‌ها، سیستم تخصیص مکمل‌ها، فرم‌های بالینی و دشبورد سلامت",
    images: [],
  },
  {
    id: "salma-app",
    name: "اپلیکیشن نیتیو مدیریت سلامت و سبک زندگی سلما",
    repoName: "MHgh0st/Salma_app",
    category: "موبایل کراس‌پلتفرم، React Native و HeroUI Native",
    tagline:
      "اپلیکیشن موبایل پیشرفته با معماری Expo 57، انیمیشن‌های ۶۰ فریم Reanimated 4 و رندرینگ گرافیکی Skia.",
    overview:
      "پروژه Salma App یک اپلیکیشن جامع نیتیو برای مدیریت سلامت فردی، برنامه‌های پزشکی، پایش تغذیه و تمرینات ورزشی است. این پروژه بر پایه جدیدترین استاندارد‌های React Native و اکوسیستم مدرن Expo Router توسعه یافته است. استفاده از موتور گرافیکی Shopify Skia در کنار HeroUI Native و سیستم استایلینگ Uniwind، رابط کاربری فوق‌العاده نرم، تعاملی و پرفورمنسی هم‌تراز با اپ‌های بومی خلق کرده است.",
    architectureDetails:
      "توسعه‌یافته با React Native 0.86 و React 19 بر بستر Expo SDK 57 (New Architecture). بهره‌گیری از HeroUI Native و Uniwind (Tailwind CSS برای ری‌اکت نیتیو)، انیمیشن‌های روان ۶۰ فریم با React Native Reanimated 4 و Gesture Handler، دراورهای شناور @gorhom/bottom-sheet، کشینگ و همگام‌سازی سرور با TanStack Query v5 و مدیریت وضعیت با Zustand.",
    keyHighlights: [
      "معماری ماژولار مبتنی بر Expo Router v57 و فایل‌بیس با Type Safety سخت‌گیرانه",
      "رندرهای گرافیکی پیشرفته با Shopify Skia و افکت‌های بلور بلادرنگ نیتیو",
      "استفاده از سیستم دیزاین HeroUI Native و Uniwind جهت یکپارچگی استایل‌ها با Tailwind",
      "تعاملات gesture و دراورهای شیشه‌ای روان با @gorhom/bottom-sheet و Reanimated",
      "مدیریت کش هوشمند و واکشی بهینه داده‌های آنلاین/آفلاین با TanStack Query و Zustand",
    ],
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
    githubUrl: "https://github.com/MHgh0st/Salma_app",
    visualPlaceholderTitle: "SALMA NATIVE MOBILE APP",
    visualPlaceholderSubtitle:
      "رابط کاربری نیتیو موبایل، باتم‌شیت‌های تعاملی، پلن‌های سلامتی و کامپوننت‌های Skia",
    images: [],
  },
  {
    id: "ticketing-system",
    name: "سامانه تیکتینگ و پشتیبانی سازمانی",
    repoName: "MHgh0st/ticketing-system",
    category: "معماری سازمانی، Nuxt 3 و دیزاین سیستم اختصاصی",
    tagline:
      "پلتفرم مدیریت تیکت و گفتگوی لایو شرکتی با کامپوننت‌های ۱۰۰٪ دست‌ساز بدون استفاده از پکیج‌های آماده UI.",
    overview:
      "این پروژه یک سامانه جامع ثبت و پیگیری تیکت‌های شرکتی است که فرانت‌اند آن از صفر به صورت کاملاً ماژولار پیاده‌سازی شده است. ویژگی برجسته فنی این پروژه، عدم استفاده از کتابخانه‌های متفرقه و آماده UI و خلق دستی تمام کامپوننت‌ها (حباب‌های چت پیام‌رسان با تفکیک پشتیبان/کاربر، دراورها، مودال‌ها، جداول داده با صفحه‌بندی هوشمند و سیستم لاگین دوگانه) جهت دستیابی به کمترین وزن باندل و بالاترین سرعت رندر بوده است.",
    architectureDetails:
      "طراحی شده با Vue 3 و Nuxt.js با معماری کامپوننت‌محور و استایل‌دهی ماژولار Tailwind CSS. سیستم احراز هویت دوطرفه (لاگین سنتی نام‌کاربری/رمزعبور + ورود بدون رمز OTP پیامکی)، معماری روتینگ داینامیک برای ردگیری وضعیت تیکت‌ها (`system/ticket/:id`) و قابلیت تفکیک نقش‌های دسترسی کاربران.",
    keyHighlights: [
      "توسعه ۱۰۰٪ دست‌ساز دیزاین‌سیستم و کامپوننت‌های Reusable بدون هیچ‌گونه وابستگی به پکیج‌های UI",
      "طراحی کامپوننت حباب‌های گفتگو (Chat Bubble UI) با تایم‌استمپ دقیق و مدیریت انواع پیام‌ها",
      "داشبورد مدیریت تیکت‌ها با سیستم فیلترینگ چندسطحی، جستجوی بلادرنگ و صفحه‌بندی (Pagination) بهینه",
      "احراز هویت منعطف با پشتیبانی همزمان از ورود با کلمه‌عبور و ارسال کد یکبار مصرف (OTP)",
      "ساختار روتینگ داینامیک و تمیز برای مدیریت چرخه عمر تیکت‌ها از ثبت تا پاسخگویی و بستن تیکت",
    ],
    techStack: [
      "Vue.js 3",
      "Nuxt.js",
      "TypeScript",
      "Tailwind CSS",
      "Custom Design System",
      "REST API Services",
      "Dynamic Routing",
    ],
    githubUrl: "https://github.com/MHgh0st/ticketing-system",
    visualPlaceholderTitle: "ENTERPRISE TICKETING & CHAT SYSTEM",
    visualPlaceholderSubtitle:
      "رابط کاربری حباب‌های گفتگوی پشتیبانی، جداول پایش وضعیت و داشبورد تیکت‌ها",
    images: [],
  },
];

export function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const { openImage } = useLightbox();
  const [selectedProject, setSelectedProject] = useState<ProjectCase>(
    PROJECTS[0],
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "architecture font-mono" | "visuals"
  >("overview");
  const [expandedProject, setExpandedProject] = useState<ProjectCase | null>(
    null,
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Reset slide index when selected project changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedProject.id]);

  const handleSelectProject = (project: ProjectCase) => {
    setSelectedProject(project);

    // If mobile viewport, smoothly scroll to detail panel
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        detailPanelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const handleNextSlide = () => {
    if (!selectedProject.images || selectedProject.images.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % selectedProject.images!.length);
  };

  const handlePrevSlide = () => {
    if (!selectedProject.images || selectedProject.images.length === 0) return;
    setCurrentSlideIndex((prev) =>
      prev === 0 ? selectedProject.images!.length - 1 : prev - 1,
    );
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-16 sm:py-24 border-b border-[#111111] bg-[#f4f3ef] relative select-none"
    >
      {/* Section-Integrated Geometry Component */}
      <SectionGeometry
        variant="selected-work"
        scrollYProgress={scrollYProgress}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#111111] pb-6 flex flex-wrap items-end justify-between gap-4 bg-[#f4f3ef] p-5 border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
          <div>
            <div className="text-xs font-bold text-[#0047ff] uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-[#ff3b00]" />
              <span>[بخش ۰۱ // پروژه‌ها و مهندسی سورس‌کد]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight uppercase">
              پروژه‌های شاخص و معماری‌های واقعی
            </h2>
          </div>
          <div className="font-mono text-xs text-[#555555]">
            GITHUB_REPOSITORIES // VERIFIED_CODE
          </div>
        </div>

        {/* Grid Layout: Right Project Selection Cards, Left Deep-Dive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right (RTL Start): Interactive Directional Project Cards */}
          <div className="lg:col-span-5 space-y-4">
            {PROJECTS.map((project) => {
              const isSelected = selectedProject.id === project.id;
              return (
                <motion.div
                  key={project.id}
                  layoutId={`card-container-${project.id}`}
                  onClick={() => handleSelectProject(project)}
                  data-cursor="project"
                  data-cursor-label="INSPECT"
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className={`w-full text-right p-5 border-2 transition-all cursor-pointer relative group overflow-hidden ${
                    isSelected
                      ? "bg-[#111111] text-[#f4f3ef] border-[#111111] shadow-[6px_6px_0px_#0047ff]"
                      : "bg-[#f4f3ef] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:bg-[#e9e7e1]"
                  }`}
                >
                  {/* Directional Accent Clip Reveal */}
                  <div
                    className={`absolute inset-y-0 right-0 w-2.5 transition-transform duration-300 ${
                      isSelected
                        ? "bg-[#d4ff00] scale-y-100"
                        : "bg-[#0047ff] scale-y-0 group-hover:scale-y-100"
                    }`}
                  />

                  <div className="flex items-center justify-between mb-2 pr-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${isSelected ? "text-[#d4ff00]" : "text-[#0047ff]"}`}
                    >
                      {project.category}
                    </span>

                    {/* Viewport Takeover Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedProject(project);
                      }}
                      data-cursor="interactive"
                      data-cursor-label="TAKEOVER"
                      className={`p-1.5 border transition-all ${
                        isSelected
                          ? "border-[#d4ff00] text-[#d4ff00] hover:bg-[#d4ff00] hover:text-[#111111]"
                          : "border-[#111111] text-[#111111] hover:bg-[#0047ff] hover:text-[#f4f3ef]"
                      }`}
                      title="مشاهده کامل و Takeover نمای کلی"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-black tracking-tight mb-2 pr-2 group-hover:text-[#0047ff] transition-colors">
                    {project.name}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed line-clamp-2 pr-2 ${isSelected ? "text-[#cccccc]" : "text-[#555555]"}`}
                  >
                    {project.tagline}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Left (RTL End): Case Study Deep-Dive Panel with Motion Reveal */}
          <div
            ref={detailPanelRef}
            className="lg:col-span-7 bg-[#f4f3ef] border-2 border-[#111111] shadow-[8px_8px_0px_#111111] overflow-hidden scroll-mt-20"
          >
            {/* Panel Titlebar & Tab Switcher */}
            <div className="px-5 py-3.5 bg-[#111111] text-[#f4f3ef] flex flex-wrap items-center justify-between gap-4 text-xs font-bold border-b-2 border-[#111111]">
              <div className="flex items-center gap-2.5 font-mono">
                <span className="w-2.5 h-2.5 bg-[#d4ff00] animate-pulse" />
                <GitBranch className="w-4 h-4 text-[#0047ff]" />
                <span className="text-[#f4f3ef] tracking-wide">
                  {selectedProject.repoName}
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center bg-[#222222] p-1 border border-[#444444] gap-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-[#0047ff] text-[#f4f3ef] shadow-[2px_2px_0px_#d4ff00]"
                      : "text-[#cccccc] hover:text-[#f4f3ef] hover:bg-[#333333]"
                  }`}
                >
                  چکیده و دستاوردها
                </button>
                <button
                  onClick={() => setActiveTab("architecture font-mono")}
                  className={`px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "architecture font-mono"
                      ? "bg-[#0047ff] text-[#f4f3ef] shadow-[2px_2px_0px_#d4ff00]"
                      : "text-[#cccccc] hover:text-[#f4f3ef] hover:bg-[#333333]"
                  }`}
                >
                  معماری و تک‌استک
                </button>
                <button
                  onClick={() => setActiveTab("visuals")}
                  className={`px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "visuals"
                      ? "bg-[#0047ff] text-[#f4f3ef] shadow-[2px_2px_0px_#d4ff00]"
                      : "text-[#cccccc] hover:text-[#f4f3ef] hover:bg-[#333333]"
                  }`}
                >
                  پیش‌نمایش سیستم
                </button>
              </div>
            </div>

            {/* Panel Body Content with AnimatePresence/Motion Reveal */}
            <motion.div
              key={`${selectedProject.id}-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-6 space-y-6 min-h-[380px]"
            >
              {/* Content Tab: Overview & Features */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#0047ff] uppercase mb-2">
                      // هدف و کارکرد اصلی پروژه
                    </h4>
                    <p className="text-sm font-semibold text-[#111111] leading-relaxed p-4 bg-[#e9e7e1] border border-[#111111]">
                      {selectedProject.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#0047ff] uppercase mb-3">
                      // دستاوردها و فیچرهای شاخص
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#111111]">
                      {selectedProject.keyHighlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-2.5 p-3 bg-[#e9e7e1] border border-[#111111] hover:border-[#0047ff] transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-[#0047ff] shrink-0 mt-0.5" />
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
              {activeTab === "architecture font-mono" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#0047ff] uppercase mb-2">
                      // معماری فرانت‌اند و لایه‌بندی سیستم
                    </h4>
                    <p className="text-sm font-semibold text-[#111111] leading-relaxed p-4 bg-[#e9e7e1] border border-[#111111]">
                      {selectedProject.architectureDetails}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#0047ff] uppercase mb-2">
                      // پشته ابزارها و وابستگی‌های مهندسی (Tech Stack)
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      {selectedProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-[#111111] text-[#f4f3ef] border border-[#111111] font-bold shadow-[2px_2px_0px_#0047ff]"
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
                  <div className="flex items-center justify-between text-xs font-mono text-[#555555]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0047ff]" />
                      <span className="font-bold">
                        VISUAL_SHOWCASE // SLIDESHOW VIEW
                      </span>
                    </div>
                    {selectedProject.images &&
                      selectedProject.images.length > 0 && (
                        <span className="bg-[#111111] text-[#d4ff00] px-2.5 py-0.5 font-mono font-bold border border-[#111111]">
                          {currentSlideIndex + 1} /{" "}
                          {selectedProject.images.length}
                        </span>
                      )}
                  </div>

                  {selectedProject.images &&
                  selectedProject.images.length > 0 ? (
                    <div className="space-y-3">
                      {/* Main Carousel Screen Frame */}
                      <div
                        onClick={() =>
                          openImage({
                            src: selectedProject.images![currentSlideIndex],
                            title: `${selectedProject.name} — تصویر ۰${currentSlideIndex + 1}`,
                            alt: selectedProject.name,
                          })
                        }
                        className="relative w-full aspect-video border-2 border-[#111111] overflow-hidden bg-[#111111] shadow-[6px_6px_0px_#111111] group cursor-zoom-in"
                        title="برای مشاهده سایز کامل و بزرگ کلیک کنید"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentSlideIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={selectedProject.images[currentSlideIndex]}
                              alt={`${selectedProject.name} slide ${currentSlideIndex + 1}`}
                              fill
                              className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Top-Right Badge Overlay with Zoom Trigger */}
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                          <div className="bg-[#111111]/90 text-[#f4f3ef] text-[10px] font-mono font-bold px-2 py-1 border border-[#f4f3ef]/30 backdrop-blur-sm flex items-center gap-1.5 group-hover:bg-[#0047ff] transition-colors">
                            <ZoomIn className="w-3 h-3 text-[#d4ff00]" />
                            <span>بزرگ‌نمایی</span>
                          </div>
                        </div>

                        {/* Left & Right Prev/Next Overlay Buttons */}
                        {selectedProject.images.length > 1 && (
                          <div className="absolute inset-y-0 inset-x-0 flex items-center justify-between px-3 pointer-events-none z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrevSlide();
                              }}
                              data-cursor="interactive"
                              data-cursor-label="PREV"
                              className="pointer-events-auto w-10 h-10 bg-[#f4f3ef] hover:bg-[#0047ff] text-[#111111] hover:text-[#f4f3ef] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center transition-all cursor-pointer"
                              title="اسلاید قبلی"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNextSlide();
                              }}
                              data-cursor="interactive"
                              data-cursor-label="NEXT"
                              className="pointer-events-auto w-10 h-10 bg-[#f4f3ef] hover:bg-[#0047ff] text-[#111111] hover:text-[#f4f3ef] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center transition-all cursor-pointer"
                              title="اسلاید بعدی"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Thumbnail Strip for Direct Navigation */}
                      {selectedProject.images.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          {selectedProject.images.map((imgSrc, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentSlideIndex(idx)}
                              className={`relative w-20 sm:w-24 aspect-video border-2 transition-all cursor-pointer shrink-0 overflow-hidden ${
                                currentSlideIndex === idx
                                  ? "border-[#0047ff] ring-2 ring-[#0047ff] shadow-[2px_2px_0px_#111111] scale-105"
                                  : "border-[#111111] opacity-60 hover:opacity-100"
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
                    <div className="w-full aspect-video border-2 border-[#111111] bg-[#e9e7e1] p-6 flex flex-col justify-between relative overflow-hidden group shadow-[6px_6px_0px_#111111]">
                      <div className="absolute inset-0 bg-swiss-grid opacity-40 pointer-events-none" />

                      <div className="flex justify-between items-center font-mono text-[11px] text-[#111111] z-10 border-b border-[#111111] pb-2">
                        <span className="font-bold">
                          // SOURCE_DOCS // {selectedProject.id.toUpperCase()}
                        </span>
                        <span className="bg-[#111111] text-[#d4ff00] font-bold px-2 py-0.5 border border-[#111111]">
                          GITHUB_EVIDENCE
                        </span>
                      </div>

                      <div className="my-auto text-center space-y-3 z-10 px-4">
                        <div className="w-14 h-14 mx-auto border-2 border-[#111111] bg-[#111111] text-[#f4f3ef] flex items-center justify-center shadow-[4px_4px_0px_#0047ff]">
                          <GitBranch className="w-7 h-7 text-[#d4ff00]" />
                        </div>
                        <h5 className="font-black text-base text-[#111111]">
                          مستندات، تصاویر و دمو در مخزن گیت‌هاب
                        </h5>
                        <p className="text-xs font-semibold text-[#555555] max-w-[48ch] mx-auto leading-relaxed">
                          برای مشاهده پیش‌نمایش‌های کامل، ساختار کامپوننت‌ها و
                          جزییات پیاده‌سازی این پروژه، لطفاً به مخزن سورس‌کد در
                          گیت‌هاب مراجعه کنید.
                        </p>

                        <div className="pt-2">
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="interactive"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0047ff] hover:bg-[#111111] text-[#f4f3ef] text-xs font-bold border border-[#111111] shadow-[3px_3px_0px_#111111] transition-all"
                          >
                            <span>مشاهده تصاویر و مستندات در ریپازیتوری</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#d4ff00]" />
                          </a>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#111111] flex items-center justify-between text-[10px] font-mono text-[#555555] z-10">
                        <span>REPOSITORY: {selectedProject.repoName}</span>
                        <span className="text-[#0047ff] font-bold">
                          VERIFIED_SOURCE_CODE
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Links */}
              <div className="pt-4 border-t border-[#111111] flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="interactive"
                  className="px-5 py-2.5 bg-[#111111] text-[#f4f3ef] hover:bg-[#0047ff] transition-all flex items-center gap-2 border border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#d4ff00]"
                >
                  <span>مشاهده مخزن در گیت‌هاب</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4ff00]" />
                </a>

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="interactive"
                    className="px-5 py-2.5 bg-[#d4ff00] text-[#111111] hover:bg-[#0047ff] hover:text-[#f4f3ef] font-black transition-all flex items-center gap-2 border border-[#111111] shadow-[3px_3px_0px_#111111]"
                  >
                    <span>مشاهده نسخه زنده</span>
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
