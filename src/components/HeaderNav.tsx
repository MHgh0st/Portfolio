"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowDownRight,
  Clock,
  MapPin,
  Menu,
  X,
  Layers,
  Activity,
  FileCode,
  Feather,
  Wrench,
  Phone,
  Sparkles,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function HeaderNav() {
  const t = useTranslations("HeaderNav");
  const commonT = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const [timeStr, setTimeStr] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted] = useState(true);

  // Smooth Reading / Page Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString(isRtl ? "fa-IR" : "en-US", {
          hour12: false,
          timeZone: "Asia/Tehran",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isRtl]);

  // Close mobile drawer on Escape key or resize > md
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "#projects", label: t("nav.projects"), icon: Layers, subtitle: t("nav.projectsSub") },
    { href: "#featured-case-study", label: t("nav.caseStudies"), icon: Activity, subtitle: t("nav.caseStudiesSub") },
    { href: "#what-i-do", label: t("nav.whatIDo"), icon: FileCode, subtitle: t("nav.whatIDoSub") },
    { href: "#about-philosophy", label: t("nav.aboutPhilosophy"), icon: Feather, subtitle: t("nav.aboutPhilosophySub") },
    { href: "#experience-stack", label: t("nav.experienceStack"), icon: Wrench, subtitle: t("nav.experienceStackSub") },
  ];

  const ArrowActionIcon = isRtl ? ArrowDownLeft : ArrowDownRight;

  return (
    <>
      <header
        className={`w-full border-b border-[#111111] dark:border-[#2b3038] sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "bg-[#f4f3ef]/95 dark:bg-[#0c0d0e]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            : "bg-[#f4f3ef] dark:bg-[#0c0d0e]"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        {/* Top Precision Scroll Progress Bar */}
        <motion.div
          className={`absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-[#ff3b00] via-[#0047ff] to-[#d4ff00] z-50 ${
            isRtl ? "origin-right" : "origin-left"
          }`}
          style={{ scaleX }}
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between font-sans text-xs text-[#111111] dark:text-[#f2f1ec] relative">
          {/* Start: Identity / Name & Status */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none py-1.5 focus:outline-none"
          >
            {/* Animated Mini Neo-Brutal Gem / Badge */}
            <motion.div
              whileHover={{ rotate: 90, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-4 h-4 bg-[#0047ff] border border-[#111111] dark:border-[#2b3038] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#d4ff00] flex items-center justify-center shrink-0"
            >
              <div className="w-1.5 h-1.5 bg-[#d4ff00]" />
            </motion.div>

            <span className="font-extrabold tracking-tight text-sm sm:text-base group-hover:text-[#0047ff] dark:group-hover:text-[#d4ff00] transition-colors whitespace-nowrap">
              {commonT("brandName")}
            </span>
            <span className="text-[#888888] dark:text-[#6e747e] font-mono text-[11px] hidden sm:inline group-hover:text-[#111111] dark:group-hover:text-[#f2f1ec] transition-colors">
              {commonT("brandTag")}
            </span>
          </motion.a>

          {/* Center: Live Time & Availability Indicator (Desktop & Tablet) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex items-center gap-3 text-xs text-[#555555] dark:text-[#9fa4ab]"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0047ff] dark:text-[#d4ff00]" />
              <span>{t("locationLabel")}</span>
            </span>

            <span className="text-[#cccccc] dark:text-[#323740]">|</span>

            {/* Live Digital Clock with Monospace Precision */}
            <div className="flex items-center gap-1.5 bg-[#e9e7e1] dark:bg-[#1b1e22] px-2 py-0.5 border border-[#111111]/30 dark:border-[#2b3038]">
              <Clock className="w-3.5 h-3.5 text-[#0047ff] dark:text-[#d4ff00]" />
              <span className="text-[11px] text-[#555555] dark:text-[#9fa4ab]">{t("timeLabel")}</span>
              <span className="text-[#111111] dark:text-[#f2f1ec] font-bold font-mono text-xs tracking-wider">
                {timeStr || (isRtl ? "۱۲:۰۰:۰۰" : "12:00:00")}
              </span>
            </div>

            <span className="text-[#cccccc] dark:text-[#323740]">|</span>

            {/* Availability Status Badge with Pulsing Ping */}
            <div className="inline-flex items-center gap-2 bg-[#d4ff00]/40 dark:bg-[#0047ff]/25 px-2.5 py-0.5 border border-[#111111] dark:border-[#2b3038] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#0047ff]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="text-[#111111] dark:text-[#f2f1ec] font-bold text-[11px]">{t("statusBadge")}</span>
            </div>
          </motion.div>

          {/* End: Navigation Links, Language Switcher, Theme Toggle, CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Desktop Nav Items */}
            <motion.nav
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden md:flex items-center gap-1 sm:gap-1.5 font-bold text-xs"
            >
              {navLinks.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="min-h-[38px] px-2.5 lg:px-3 py-2 text-[#111111] dark:text-[#f2f1ec] hover:bg-[#0047ff] hover:text-[#f4f3ef] border border-transparent hover:border-[#111111] dark:hover:border-[#2b3038] hover:shadow-[3px_3px_0px_#111111] dark:hover:shadow-[3px_3px_0px_#0047ff] transition-all flex items-center whitespace-nowrap"
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Desktop Language Switcher */}
              <div className="ms-1 me-1">
                <LanguageSwitcher variant="desktop" />
              </div>

              {/* Desktop Theme Toggle */}
              <div className="me-1">
                <ThemeToggle variant="desktop" />
              </div>

              {/* Primary CTA Contact Action Button with Spring Bounce */}
              <motion.a
                href="#contact"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ y: 1, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="min-h-[38px] bg-[#111111] dark:bg-[#0047ff] text-[#f4f3ef] hover:bg-[#0047ff] dark:hover:bg-[#111111] px-3.5 py-2 transition-colors flex items-center gap-1.5 border border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#0047ff] dark:shadow-[3px_3px_0px_#d4ff00] hover:shadow-[4px_4px_0px_#111111] cursor-pointer whitespace-nowrap"
              >
                <span>{t("contactCta")}</span>
                <ArrowActionIcon className="w-3.5 h-3.5 text-[#d4ff00]" />
              </motion.a>
            </motion.nav>

            {/* Mobile Actions: Theme Toggle + Language Switcher + Quick CTA + Hamburger Trigger */}
            <div className="flex md:hidden items-center gap-1.5">
              <ThemeToggle variant="desktop" />
              <LanguageSwitcher variant="desktop" />

              <a
                href="#contact"
                className="min-h-[36px] px-2.5 py-1.5 bg-[#0047ff] text-[#f4f3ef] font-bold text-xs border border-[#111111] dark:border-[#2b3038] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#0047ff] active:translate-y-0.5 flex items-center gap-1"
              >
                <span>{t("contactCta")}</span>
                <ArrowActionIcon className="w-3 h-3 text-[#d4ff00]" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
                aria-expanded={mobileMenuOpen}
                className="min-h-[36px] min-w-[36px] p-2 bg-[#111111] dark:bg-[#1b1e22] text-[#f4f3ef] active:bg-[#0047ff] border border-[#111111] dark:border-[#2b3038] shadow-[2px_2px_0px_#d4ff00] flex items-center justify-center transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Portal */}
      {mounted && typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[999] bg-[#111111]/80 dark:bg-[#000000]/85 backdrop-blur-sm md:hidden flex flex-col"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  top: "calc(3.5rem + env(safe-area-inset-top, 0px))",
                  height: "calc(100dvh - 3.5rem - env(safe-area-inset-top, 0px))",
                }}
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#f4f3ef] dark:bg-[#141618] border-b-2 border-[#111111] dark:border-[#2b3038] shadow-[0_12px_30px_rgba(0,0,0,0.4)] p-5 space-y-3.5 max-h-[85dvh] overflow-y-auto w-full"
                >
                  {/* Drawer Header Badge */}
                  <div className="flex items-center justify-between border-b border-[#111111] dark:border-[#2b3038] pb-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-[#0047ff] dark:text-[#d4ff00] font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#ff3b00]" />
                      <span>{t("quickAccessTitle")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#d4ff00]/40 dark:bg-[#0047ff]/30 px-2 py-0.5 border border-[#111111] dark:border-[#2b3038] font-bold text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                      <span>{commonT("statusAvailableShort")}</span>
                    </div>
                  </div>

                  {/* Controls Row: Theme Toggle + Language Switcher in Mobile Drawer */}
                  <div className="space-y-2.5">
                    <ThemeToggle variant="mobile" />
                    <LanguageSwitcher variant="mobile" />
                  </div>

                  {/* Navigation Destination Cards */}
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {navLinks.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="min-h-[52px] p-3 bg-[#e9e7e1] dark:bg-[#1b1e22] hover:bg-[#0047ff] dark:hover:bg-[#0047ff] hover:text-[#f4f3ef] text-[#111111] dark:text-[#f2f1ec] border-2 border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#0047ff] active:shadow-[1px_1px_0px_#111111] active:translate-y-0.5 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#111111] dark:bg-[#0c0d0e] text-[#d4ff00] group-hover:bg-[#f4f3ef] dark:group-hover:bg-[#141618] group-hover:text-[#0047ff] dark:group-hover:text-[#d4ff00] border border-[#111111] dark:border-[#2b3038] flex items-center justify-center transition-colors shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-extrabold text-sm tracking-tight">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-[#555555] dark:text-[#9fa4ab] group-hover:text-[#cccccc] font-sans">
                                {item.subtitle}
                              </div>
                            </div>
                          </div>
                          <ArrowActionIcon className="w-4 h-4 text-[#0047ff] dark:text-[#d4ff00] group-hover:text-[#d4ff00] transition-colors shrink-0" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Bottom Quick Contact Strip inside Drawer */}
                  <div className="pt-3 border-t border-[#111111] dark:border-[#2b3038] flex flex-col gap-2">
                    <a
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[48px] w-full py-3 bg-[#111111] dark:bg-[#0047ff] text-[#f4f3ef] hover:bg-[#0047ff] dark:hover:bg-[#111111] border-2 border-[#111111] dark:border-[#2b3038] shadow-[4px_4px_0px_#d4ff00] font-bold text-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-[#d4ff00]" />
                      <span>{t("mobileCtaButton")}</span>
                    </a>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#555555] dark:text-[#9fa4ab] px-1 pt-1">
                      <span>{t("mobileLocation")}</span>
                      <span>{commonT("domain")}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
