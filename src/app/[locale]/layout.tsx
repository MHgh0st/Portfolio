import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, Locale } from "@/i18n/routing";
import "../globals.css";

const kalameh = localFont({
  src: [
    {
      path: "../fonts/Kalameh(FaNum)-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Kalameh(FaNum)-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Kalameh(FaNum)-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Kalameh(FaNum)-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Kalameh(FaNum)-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Kalameh(FaNum)-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Kalameh(FaNum)-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Kalameh(FaNum)-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Kalameh(FaNum)-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-kalameh",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  const isFa = locale === "fa";
  const url = isFa ? "https://mhgh0st.dev" : "https://mhgh0st.dev/en";

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: t("author"), url: "https://github.com/MHgh0st" }],
    creator: t("author"),
    alternates: {
      canonical: url,
      languages: {
        fa: "https://mhgh0st.dev",
        en: "https://mhgh0st.dev/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: url,
      siteName: t("ogSiteName"),
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@MHgh0st_13",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

import { ThemeProvider } from "@/components/ThemeProvider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const isRtl = locale === "fa";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${kalameh.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#f4f3ef] dark:bg-[#0c0d0e] text-[#111111] dark:text-[#f2f1ec] font-sans selection:bg-[#d4ff00] selection:text-[#111111] dark:selection:bg-[#0047ff] dark:selection:text-[#d4ff00]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
