"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ExternalLink,
  Phone,
  Send,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionGeometry } from "./SectionGeometry";

export function ContactFooter() {
  const t = useTranslations("Contact");
  const cursorT = useTranslations("Cursor");
  const locale = useLocale();
  const isRtl = locale === "fa";

  const containerRef = useRef<HTMLElement>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const phoneNumber = "09379012568";
  const telegramHandle = "@MHgh0st_13";
  const instagramHandle = "@mhgh0st_13";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  // Scroll Progress Translations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const statementY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [30, -15]
  );
  const mainBoxScale = useTransform(scrollYProgress, [0.1, 0.5], [0.98, 1]);

  const ArrowActionIcon = isRtl ? ArrowDownLeft : ArrowDownRight;

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="py-14 sm:py-24 lg:py-32 bg-[#111111] dark:bg-[#070809] text-[#f4f3ef] relative overflow-hidden border-t-2 border-[#111111] dark:border-[#2b3038]"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 3.5rem)" }}
    >
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="contact" scrollYProgress={scrollYProgress} />

      {/* Background Kinetic Swiss CAD Grid */}
      <div className="absolute inset-0 bg-swiss-grid opacity-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16 relative z-10">
        {/* Top Tag & Status Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#333333] dark:border-[#2b3038] pb-4 sm:pb-6 font-mono text-xs text-[#888888] dark:text-[#9fa4ab]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#d4ff00] animate-pulse shrink-0" />
            <span className="font-extrabold text-[#f4f3ef]">
              {t("stamp")}
            </span>
          </div>
          <div className="text-[11px] sm:text-xs">
            {t("locationStatus")}
          </div>
        </div>

        {/* Oversized Kinetic Typographic Statement */}
        <motion.div style={{ y: statementY }} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#d4ff00] font-bold uppercase tracking-wider">
              {t("eyebrow")}
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-[#f4f3ef]">
              {isRtl ? (
                <>
                  بیا با هم یک محصول <br />
                  <span className="text-[#d4ff00]">استثنایی و ماندگار</span> بسازیم.
                </>
              ) : (
                <>
                  Let&apos;s architect something <br />
                  <span className="text-[#d4ff00]">extraordinary and enduring</span> together.
                </>
              )}
            </h2>
          </div>

          <p className="text-sm sm:text-lg md:text-xl text-[#cccccc] dark:text-[#9fa4ab] font-semibold leading-relaxed max-w-[55ch]">
            {t("paragraph")}
          </p>
        </motion.div>

        {/* Primary Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Primary Box: Phone Number */}
          <motion.div
            style={{ scale: mainBoxScale }}
            className="lg:col-span-6 bg-[#f4f3ef] dark:bg-[#141618] text-[#111111] dark:text-[#f2f1ec] border-2 border-[#111111] dark:border-[#2b3038] p-5 sm:p-8 shadow-[6px_6px_0px_#0047ff] sm:shadow-[8px_8px_0px_#0047ff] flex flex-col justify-between space-y-6 origin-center"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0047ff] dark:text-[#d4ff00]">
                <Phone className="w-4 h-4 text-[#ff3b00] shrink-0" />
                <span>{t("phone.tag")}</span>
              </div>
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#111111] dark:text-[#f2f1ec] text-left" dir="ltr">
                {phoneNumber}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#555555] dark:text-[#9fa4ab]">
                {t("phone.desc")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${phoneNumber}`}
                data-cursor="interactive"
                data-cursor-label={cursorT("callNow")}
                className="min-h-[48px] flex-1 px-6 py-3.5 bg-[#0047ff] hover:bg-[#111111] dark:hover:bg-[#070809] text-[#f4f3ef] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#111111] dark:border-[#2b3038] shadow-[3px_3px_0px_#111111] dark:shadow-[3px_3px_0px_#d4ff00] active:translate-y-0.5"
              >
                <span>{t("phone.callBtn")}</span>
                <Phone className="w-4 h-4 text-[#d4ff00]" />
              </a>

              <button
                onClick={() => handleCopy(phoneNumber, "phone")}
                data-cursor="interactive"
                data-cursor-label={cursorT("copy")}
                className="min-h-[48px] px-5 py-3.5 bg-[#e9e7e1] dark:bg-[#1b1e22] hover:bg-[#111111] dark:hover:bg-[#070809] hover:text-[#f4f3ef] text-[#111111] dark:text-[#f2f1ec] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#111111] dark:border-[#2b3038] active:translate-y-0.5 cursor-pointer"
              >
                {copiedItem === "phone" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t("phone.copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#0047ff] dark:text-[#d4ff00]" />
                    <span>{t("phone.copyBtn")}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Social Channels: Telegram & Instagram */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Telegram Card */}
            <div className="bg-[#1a1a1a] dark:bg-[#141618] border-2 border-[#333333] dark:border-[#2b3038] hover:border-[#0047ff] dark:hover:border-[#0047ff] p-5 sm:p-6 shadow-[5px_5px_0px_#111111] dark:shadow-[5px_5px_0px_#0047ff] flex flex-col justify-between space-y-5 sm:space-y-6 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-[#0047ff] dark:text-[#d4ff00] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-[#d4ff00]" />
                    {t("telegram.title")}
                  </span>
                  <span className="text-[#888888] dark:text-[#6e747e]">{t("telegram.tag")}</span>
                </div>

                <div className="text-lg sm:text-xl font-black font-mono text-[#f4f3ef] group-hover:text-[#d4ff00] transition-colors">
                  {telegramHandle}
                </div>
                <p className="text-xs text-[#888888] dark:text-[#9fa4ab] font-medium leading-relaxed">
                  {t("telegram.desc")}
                </p>
              </div>

              <a
                href="https://t.me/MHgh0st_13"
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                data-cursor-label={cursorT("telegram")}
                className="min-h-[46px] w-full px-4 py-3 bg-[#0047ff] hover:bg-[#d4ff00] text-[#f4f3ef] hover:text-[#111111] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#111111] dark:border-[#2b3038] active:translate-y-0.5"
              >
                <span>{t("telegram.cta")}</span>
                <ArrowActionIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Instagram Card */}
            <div className="bg-[#1a1a1a] dark:bg-[#141618] border-2 border-[#333333] dark:border-[#2b3038] hover:border-[#ff3b00] dark:hover:border-[#ff3b00] p-5 sm:p-6 shadow-[5px_5px_0px_#111111] dark:shadow-[5px_5px_0px_#ff3b00] flex flex-col justify-between space-y-5 sm:space-y-6 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-[#ff3b00] font-bold">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-[#d4ff00]" />
                    {t("instagram.title")}
                  </span>
                  <span className="text-[#888888] dark:text-[#6e747e]">{t("instagram.tag")}</span>
                </div>

                <div className="text-lg sm:text-xl font-black font-mono text-[#f4f3ef] group-hover:text-[#d4ff00] transition-colors">
                  {instagramHandle}
                </div>
                <p className="text-xs text-[#888888] dark:text-[#9fa4ab] font-medium leading-relaxed">
                  {t("instagram.desc")}
                </p>
              </div>

              <a
                href="https://instagram.com/mhgh0st_13"
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                data-cursor-label={cursorT("instagram")}
                className="min-h-[46px] w-full px-4 py-3 bg-[#ff3b00] hover:bg-[#d4ff00] text-[#f4f3ef] hover:text-[#111111] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#111111] dark:border-[#2b3038] active:translate-y-0.5"
              >
                <span>{t("instagram.cta")}</span>
                <ArrowActionIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Editorial Footer */}
        <div className="pt-8 sm:pt-12 border-t border-[#333333] dark:border-[#2b3038] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-[#888888] dark:text-[#9fa4ab] font-mono text-xs">
          <div className="flex items-center gap-2 text-center sm:text-start">
            <span className="w-2 h-2 bg-[#0047ff] dark:bg-[#d4ff00] shrink-0" />
            <span>
              © {new Date().getFullYear()} MOHAMMAD HOSSEIN GHOLAMI (MHGH0ST)
            </span>
          </div>

          <div className="flex items-center gap-6 font-bold text-[#f4f3ef]">
            <a
              href="https://github.com/MHgh0st"
              target="_blank"
              rel="noreferrer"
              data-cursor="interactive"
              className="min-h-[40px] px-3 py-2 bg-[#1a1a1a] dark:bg-[#141618] sm:bg-transparent border border-[#333333] dark:border-[#2b3038] sm:border-transparent hover:text-[#d4ff00] flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#0047ff] dark:text-[#d4ff00]" />
              <span>{t("githubLink")}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
