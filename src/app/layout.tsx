import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kalameh = localFont({
  src: [
    {
      path: "./fonts/Kalameh(FaNum)-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Kalameh(FaNum)-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Kalameh(FaNum)-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Kalameh(FaNum)-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Kalameh(FaNum)-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Kalameh(FaNum)-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Kalameh(FaNum)-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Kalameh(FaNum)-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Kalameh(FaNum)-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-kalameh",
  display: "swap",
});

export const metadata: Metadata = {
  title: "محمدحسین غلامی (MHgh0st) // مهندس ارشد فرانت‌اند",
  description: "پورتفولیو مهندسی فرانت‌اند ارشد محمدحسین غلامی. توسعه سیستم‌های تعاملی گراف، تایپوگرافی سوئیسی، و معماری وب با کارایی بالا.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${kalameh.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f3ef] text-[#111111] font-sans selection:bg-[#d4ff00] selection:text-[#111111]">
        {/* Impeccable Direction Contract - Persian RTL Edition */}
        {/* 
          THESIS: A Persian-first senior frontend developer portfolio adopting a Swiss Editorial × Neo-Brutalism × Y2K technical blueprint aesthetic on a warm paper-white ground (#F4F3EF), utilizing local Kalameh (FaNum) typography, strict RTL grid alignment, hairline borders, and interactive architectural node graph inspection.
          OWN-WORLD: Warm paper-white ground (#F4F3EF), deep charcoal text (#111111), electric cobalt blue (#0047FF), acidic lime (#D4FF00), saturated red-orange (#FF3B00), 1px solid hairline borders, bold Kalameh display typography, and RTL metadata markers.
          STORY: Engineering leaders and technical reviewers immediately recognize high-craft Persian frontend engineering mastery, system design depth, and Web Vitals precision within 3 seconds.
          FIRST VIEWPORT: Asymmetric full-bleed typographic identity in Kalameh, technical positioning in Persian, live node graph inspector, and hairline grid-aligned RTL navigation.
          FORM: Experience mode developer portfolio / Persian Swiss-Y2K Editorial Blueprint.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        {children}
      </body>
    </html>
  );
}
