import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import { LangProvider } from "@/components/layout/LangProvider";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { SEO } from "@/data/seo";
import { SITE_URL } from "@/lib/site";
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_TEL, TIKTOK_URL } from "@/data/contact";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SEO.ar.title,
  description: SEO.ar.description,
  keywords: [...SEO.ar.keywords, ...SEO.en.keywords],
  applicationName: SEO.ar.siteName,
  alternates: { canonical: "/" },
  icons: { icon: "/images/Logo.png", apple: "/images/Logo.png" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SEO.ar.siteName,
    title: SEO.ar.title,
    description: SEO.ar.description,
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    images: [{ url: "/images/Logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.ar.title,
    description: SEO.ar.description,
    images: ["/images/Logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b3b2e" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: SEO.ar.siteName,
  alternateName: SEO.en.siteName,
  url: SITE_URL,
  image: `${SITE_URL}/images/Logo.png`,
  logo: `${SITE_URL}/images/Logo.png`,
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sheikh Zayed City",
    addressRegion: "Giza",
    addressCountry: "EG",
  },
  areaServed: ["Cairo", "Giza", "Alexandria", "Sharm El Sheikh", "Hurghada"],
  sameAs: [FACEBOOK_URL, INSTAGRAM_URL, TIKTOK_URL].filter((url) => url !== "#"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <GoogleTagManager gtmId="GTM-P89KGBP2" />
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider>
          <BookingProvider>
            <SiteChrome>{children}</SiteChrome>
          </BookingProvider>
        </LangProvider>
        
      </body>
    </html>
  );
}