"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, Locale } from "@/i18n/routing";
import { useTransition } from "react";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function LanguageSwitcher({ variant = "desktop", className = "" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("LanguageSwitcher");

  const toggleLanguage = (nextLocale: Locale) => {
    if (nextLocale === locale || isPending) return;

    startTransition(() => {
      // Preserve hash if user is at specific section
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      router.replace(
        `${pathname}${hash}` as unknown as Parameters<typeof router.replace>[0],
        { locale: nextLocale, scroll: false }
      );
    });
  };

  if (variant === "mobile") {
    return (
      <div
        className={`flex items-center justify-between p-3 border border-[#111111] dark:border-[#2b3038] bg-[#ffffff] dark:bg-[#141618] shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#0047ff] ${className}`}
        role="group"
        aria-label={t("ariaLabel")}
      >
        <span className="font-mono text-xs font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#0047ff] animate-pulse" />
          {t("ariaLabel")}:
        </span>
        <div className="flex items-center gap-1.5 bg-[#f4f3ef] dark:bg-[#1b1e22] p-1 border border-[#111111] dark:border-[#2b3038]">
          <button
            type="button"
            onClick={() => toggleLanguage("fa")}
            disabled={isPending}
            className={`px-3 py-1 text-xs font-bold transition-all ${
              locale === "fa"
                ? "bg-[#111111] dark:bg-[#0047ff] text-[#ffffff] shadow-[1px_1px_0px_0px_#0047ff] dark:shadow-[1px_1px_0px_0px_#d4ff00]"
                : "text-[#555555] dark:text-[#9fa4ab] hover:text-[#111111] dark:hover:text-[#f2f1ec] hover:bg-[#e9e7e1] dark:hover:bg-[#2b3038]"
            }`}
            aria-pressed={locale === "fa"}
          >
            {t("persian")}
          </button>
          <button
            type="button"
            onClick={() => toggleLanguage("en")}
            disabled={isPending}
            className={`px-3 py-1 text-xs font-bold transition-all ${
              locale === "en"
                ? "bg-[#111111] dark:bg-[#0047ff] text-[#ffffff] shadow-[1px_1px_0px_0px_#0047ff] dark:shadow-[1px_1px_0px_0px_#d4ff00]"
                : "text-[#555555] dark:text-[#9fa4ab] hover:text-[#111111] dark:hover:text-[#f2f1ec] hover:bg-[#e9e7e1] dark:hover:bg-[#2b3038]"
            }`}
            aria-pressed={locale === "en"}
          >
            {t("english")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center border border-[#111111] dark:border-[#2b3038] bg-[#ffffff] dark:bg-[#141618] p-0.5 shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#0047ff] ${className}`}
      role="group"
      aria-label={t("ariaLabel")}
    >
      <button
        type="button"
        onClick={() => toggleLanguage("fa")}
        disabled={isPending}
        className={`px-2 py-0.5 text-[11px] font-mono font-bold transition-all ${
          locale === "fa"
            ? "bg-[#111111] dark:bg-[#0047ff] text-[#d4ff00] dark:text-[#ffffff]"
            : "text-[#555555] dark:text-[#9fa4ab] hover:text-[#111111] dark:hover:text-[#f2f1ec] hover:bg-[#f4f3ef] dark:hover:bg-[#1b1e22]"
        }`}
        aria-pressed={locale === "fa"}
        title={t("persian")}
      >
        FA
      </button>
      <span className="w-px h-3 bg-[#e9e7e1] dark:bg-[#2b3038]" />
      <button
        type="button"
        onClick={() => toggleLanguage("en")}
        disabled={isPending}
        className={`px-2 py-0.5 text-[11px] font-mono font-bold transition-all ${
          locale === "en"
            ? "bg-[#111111] dark:bg-[#0047ff] text-[#d4ff00] dark:text-[#ffffff]"
            : "text-[#555555] dark:text-[#9fa4ab] hover:text-[#111111] dark:hover:text-[#f2f1ec] hover:bg-[#f4f3ef] dark:hover:bg-[#1b1e22]"
        }`}
        aria-pressed={locale === "en"}
        title={t("english")}
      >
        EN
      </button>
    </div>
  );
}
