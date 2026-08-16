"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ variant = "desktop", className = "" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const t = useTranslations("ThemeToggle");

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div
        className={`inline-flex items-center border border-[#111111] dark:border-[#2b3038] bg-[#ffffff] dark:bg-[#141618] p-0.5 shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#0047ff] ${
          variant === "mobile" ? "h-11 w-full justify-between px-3" : "h-7 w-8"
        } ${className}`}
      >
        <span className="opacity-0">theme</span>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div
        className={`flex items-center justify-between p-3 border border-[#111111] dark:border-[#2b3038] bg-[#ffffff] dark:bg-[#141618] shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#0047ff] ${className}`}
        role="group"
        aria-label={t("ariaLabel")}
      >
        <span className="font-mono text-xs font-bold text-[#111111] dark:text-[#f2f1ec] uppercase tracking-wider flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
          {t("label")}:
        </span>
        <div className="flex items-center gap-1.5 bg-[#f4f3ef] dark:bg-[#1b1e22] p-1 border border-[#111111] dark:border-[#2b3038]">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`px-3 py-1 text-xs font-bold transition-all flex items-center gap-1.5 ${
              !isDark
                ? "bg-[#111111] text-[#ffffff] shadow-[1px_1px_0px_0px_#0047ff]"
                : "text-[#555555] dark:text-[#9fa4ab] hover:text-[#111111] dark:hover:text-[#f2f1ec]"
            }`}
            aria-pressed={!isDark}
          >
            <Sun className="w-3.5 h-3.5 text-[#ff3b00]" />
            <span>{t("light")}</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`px-3 py-1 text-xs font-bold transition-all flex items-center gap-1.5 ${
              isDark
                ? "bg-[#0047ff] text-[#ffffff] shadow-[1px_1px_0px_0px_#d4ff00]"
                : "text-[#555555] dark:text-[#9fa4ab] hover:text-[#111111] dark:hover:text-[#f2f1ec]"
            }`}
            aria-pressed={isDark}
          >
            <Moon className="w-3.5 h-3.5 text-[#d4ff00]" />
            <span>{t("dark")}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center p-1.5 border border-[#111111] dark:border-[#2b3038] bg-[#ffffff] dark:bg-[#141618] hover:bg-[#e9e7e1] dark:hover:bg-[#1b1e22] text-[#111111] dark:text-[#f2f1ec] shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_#0047ff] transition-all cursor-pointer ${className}`}
      title={isDark ? t("switchToLight") : t("switchToDark")}
      aria-label={isDark ? t("switchToLight") : t("switchToDark")}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#d4ff00] hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-[#0047ff] hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
