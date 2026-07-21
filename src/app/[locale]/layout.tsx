import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "../globals.css";
import {
  dictionaries,
  locales,
  person,
  type Locale,
} from "@/lib/dictionaries";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = dictionaries[locale as Locale] ?? dictionaries.tr;
  return {
    metadataBase: new URL(`https://${person.site}`),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: person.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = dictionaries[locale as Locale];

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="bg-bg font-sans text-fg">
        <SmoothScroll />
        <Cursor />
        <Preloader name={person.name} />
        <Navbar dict={dict.nav} locale={locale as Locale} />
        {children}
        <Footer dict={dict.footer} locale={locale as Locale} />
      </body>
    </html>
  );
}
