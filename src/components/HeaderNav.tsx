"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDownLeft, Clock, MapPin, UserCheck, Sparkles } from "lucide-react";
import { SparkleStar } from "./SectionGeometry";

export function HeaderNav() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Smooth Reading / Page Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("fa-IR", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "#projects", label: "پروژه‌ها", always: true },
    { href: "#featured-case-study", label: "کیس‌استدی‌ها", responsive: "hidden sm:inline-block" },
    { href: "#what-i-do", label: "رویکرد کاری", responsive: "hidden md:inline-block" },
    { href: "#about-philosophy", label: "فلسفه فردی", responsive: "hidden lg:inline-block" },
    { href: "#experience-stack", label: "پشته ابزارها", responsive: "hidden xl:inline-block" },
  ];

  return (
    <header
      className={`w-full border-b border-[#111111] sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f4f3ef]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-[#f4f3ef]"
      }`}
    >
      {/* Top Precision Scroll Progress Bar (Neobrutal High-contrast Cyan / Neon Lime) */}
      <motion.div
        className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-[#ff3b00] via-[#0047ff] to-[#d4ff00] origin-right z-50"
        style={{ scaleX }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between font-sans text-xs text-[#111111] relative">
        {/* Right (RTL Start): Identity / Name & Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          {/* Animated Mini Neo-Brutal Gem / Badge */}
          <motion.div
            whileHover={{ rotate: 90, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-3.5 h-3.5 bg-[#0047ff] border border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 bg-[#d4ff00]" />
          </motion.div>

          <span className="font-extrabold tracking-tight text-sm sm:text-base group-hover:text-[#0047ff] transition-colors">
            محمدحسین غلامی
          </span>
          <span className="text-[#888888] font-mono text-[11px] hidden sm:inline group-hover:text-[#111111] transition-colors">
            // MHGH0ST
          </span>
        </motion.div>

        {/* Center: Live Time & Availability Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-4 text-xs text-[#555555]"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0047ff]" />
            <span>موقعیت: قم</span>
          </span>

          <span className="text-[#cccccc]">|</span>

          {/* Live Digital Clock with Monospace Precision */}
          <div className="flex items-center gap-1.5 bg-[#e9e7e1] px-2 py-0.5 border border-[#111111]/30">
            <Clock className="w-3.5 h-3.5 text-[#0047ff]" />
            <span className="text-[11px] text-[#555555]">زمان:</span>
            <span className="text-[#111111] font-bold font-mono text-xs tracking-wider">
              {timeStr || "۱۲:۰۰:۰۰"}
            </span>
          </div>

          <span className="text-[#cccccc]">|</span>

          {/* Availability Status Badge with Pulsing Ping */}
          <div className="inline-flex items-center gap-2 bg-[#d4ff00]/40 px-2.5 py-0.5 border border-[#111111] shadow-[2px_2px_0px_#111111]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="text-[#111111] font-bold text-[11px]">آماده همکاری ارشد</span>
          </div>
        </motion.div>

        {/* Left (RTL End): Kinetic Interactive Navigation Links */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-1.5 sm:gap-2 font-bold text-xs"
        >
          {navLinks.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`px-3 py-1.5 text-[#111111] hover:bg-[#0047ff] hover:text-[#f4f3ef] border border-transparent hover:border-[#111111] hover:shadow-[3px_3px_0px_#111111] transition-all ${
                item.responsive || ""
              }`}
            >
              {item.label}
            </motion.a>
          ))}

          {/* Primary CTA Contact Action Button with Spring Bounce */}
          <motion.a
            href="#contact"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ y: 1, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="bg-[#111111] text-[#f4f3ef] hover:bg-[#0047ff] px-3.5 py-1.5 transition-colors flex items-center gap-1.5 border border-[#111111] shadow-[3px_3px_0px_#0047ff] hover:shadow-[4px_4px_0px_#111111] mr-1"
          >
            <span>ارتباط</span>
            <ArrowDownLeft className="w-3.5 h-3.5 text-[#d4ff00]" />
          </motion.a>
        </motion.nav>
      </div>
    </header>
  );
}
