"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownLeft,
  ExternalLink,
  Phone,
  Send,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";
import { SectionGeometry } from "./SectionGeometry";

export function ContactFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const phoneNumber = "09379012568";
  const telegramHandle = "@MHgh0st_13";
  const instagramHandle = "@mhgh0st_13";

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

  const statementY = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const mainBoxScale = useTransform(scrollYProgress, [0.1, 0.5], [0.96, 1]);

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="py-20 sm:py-32 bg-[#111111] text-[#f4f3ef] relative overflow-hidden select-none border-t-2 border-[#111111]"
    >
      {/* Integrated Section Geometry */}
      <SectionGeometry variant="contact" scrollYProgress={scrollYProgress} />

      {/* Background Kinetic Swiss CAD Grid */}
      <div className="absolute inset-0 bg-swiss-grid opacity-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Top Tag & Status Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#333333] pb-6 font-mono text-xs text-[#888888]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#d4ff00] animate-pulse" />
            <span className="font-extrabold text-[#f4f3ef]">
              END_OF_PAGE // FINAL INVITATION
            </span>
          </div>
          <div>
            موقعیت: قم [ایران] • آماده پذیرش چالش‌ها، پروژه‌ها و موقعیت‌های ارشد
          </div>
        </div>

        {/* Oversized Kinetic Typographic Statement with Scroll Translation */}
        <motion.div style={{ y: statementY }} className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#d4ff00] font-bold uppercase tracking-wider">
              // LET'S BUILD SOMETHING EXTRAORDINARY
            </div>
            <h2 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-[#f4f3ef]">
              بیا با هم یک محصول <br />
              <span className="text-[#d4ff00]">استثنایی و ماندگار</span> بسازیم.
            </h2>
          </div>

          <p className="text-base sm:text-xl text-[#cccccc] font-semibold leading-relaxed max-w-[55ch]">
            برای گفتگو درباره پروژه‌ها، موقعیت‌های شغلی ارشد فرانت‌اند و
            فول‌استک یا همکاری در توسعه سیستم‌های پیچیده می‌توانید مستقیماً از
            طریق تماس تلفنی، تلگرام یا اینستاگرام با من در ارتباط باشید.
          </p>
        </motion.div>

        {/* Primary Contact Grid: Phone (Dominant), Telegram & Instagram with Scroll Scale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Primary Dominant Box: Phone Number */}
          <motion.div
            style={{ scale: mainBoxScale }}
            className="lg:col-span-6 bg-[#f4f3ef] text-[#111111] border-2 border-[#111111] p-6 sm:p-8 shadow-[8px_8px_0px_#0047ff] flex flex-col justify-between space-y-6 origin-center"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0047ff]">
                <Phone className="w-4 h-4 text-[#ff3b00]" />
                <span>PRIMARY_CONTACT // PHONE_CALL</span>
              </div>
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#111111] dir-ltr text-right">
                {phoneNumber}
              </div>
              <p className="text-xs font-semibold text-[#555555]">
                تماس مستقیم جهت هماهنگی جلسات کاری، مشاوره تخصصی و بررسی
                موقعیت‌های همکاری.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${phoneNumber}`}
                data-cursor="interactive"
                data-cursor-label="CALL_NOW"
                className="flex-1 px-6 py-3.5 bg-[#0047ff] hover:bg-[#111111] text-[#f4f3ef] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#111111] shadow-[3px_3px_0px_#111111]"
              >
                <span>تماس تلفنی مستقیم</span>
                <Phone className="w-4 h-4 text-[#d4ff00]" />
              </a>

              <button
                onClick={() => handleCopy(phoneNumber, "phone")}
                data-cursor="interactive"
                data-cursor-label="COPY"
                className="px-4 py-3.5 bg-[#e9e7e1] hover:bg-[#111111] hover:text-[#f4f3ef] text-[#111111] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#111111]"
              >
                {copiedItem === "phone" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#0047ff]" />
                    <span>کپی شماره</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Social Channels: Telegram & Instagram */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Telegram Card */}
            <div className="bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#0047ff] p-6 shadow-[6px_6px_0px_#111111] flex flex-col justify-between space-y-6 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-[#0047ff] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-[#d4ff00]" />
                    TELEGRAM
                  </span>
                  <span className="text-[#888888]">[QUICK_MESSAGE]</span>
                </div>

                <div className="text-xl font-black font-mono text-[#f4f3ef] group-hover:text-[#d4ff00] transition-colors">
                  {telegramHandle}
                </div>
                <p className="text-xs text-[#888888] font-medium leading-relaxed">
                  ارسال پیام چت در تلگرام برای پاسخگویی سریع در طول روز.
                </p>
              </div>

              <a
                href="https://t.me/MHgh0st_13"
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                data-cursor-label="TELEGRAM"
                className="w-full px-4 py-3 bg-[#0047ff] hover:bg-[#d4ff00] text-[#f4f3ef] hover:text-[#111111] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#111111]"
              >
                <span>ارسال پیام در تلگرام</span>
                <ArrowDownLeft className="w-4 h-4" />
              </a>
            </div>

            {/* Instagram Card */}
            <div className="bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff3b00] p-6 shadow-[6px_6px_0px_#111111] flex flex-col justify-between space-y-6 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-[#ff3b00] font-bold">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-[#d4ff00]" />
                    INSTAGRAM
                  </span>
                  <span className="text-[#888888]">[DIRECT]</span>
                </div>

                <div className="text-xl font-black font-mono text-[#f4f3ef] group-hover:text-[#d4ff00] transition-colors">
                  {instagramHandle}
                </div>
                <p className="text-xs text-[#888888] font-medium leading-relaxed">
                  ارتباط دایرکت در اینستاگرام و مشاهده فعالیت‌ها.
                </p>
              </div>

              <a
                href="https://instagram.com/mhgh0st_13"
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                data-cursor-label="INSTAGRAM"
                className="w-full px-4 py-3 bg-[#ff3b00] hover:bg-[#d4ff00] text-[#f4f3ef] hover:text-[#111111] font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#111111]"
              >
                <span>مشاهده پروفایل اینستاگرام</span>
                <ArrowDownLeft className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Editorial Footer & Social Handshake */}
        <div className="pt-12 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-6 text-[#888888] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#0047ff]" />
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
              className="hover:text-[#d4ff00] flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#0047ff]" />
              <span>GITHUB: @MHGH0ST</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
