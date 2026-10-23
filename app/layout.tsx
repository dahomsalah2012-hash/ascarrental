import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { cookies } from "next/headers";
import SiteChrome from "@/components/layout/SiteChrome";
import { LangProvider } from "@/components/layout/LangProvider";
import { DICT, type Lang } from "@/lib/dict";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

async function getLang(): Promise<Lang> {
  return (await cookies()).get("lang")?.value === "en" ? "en" : "ar";
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: DICT[lang].brand, description: DICT[lang].metaDesc };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={cairo.variable}>
      <body className="font-sans antialiased">
        <LangProvider initial={lang}>
          <SiteChrome>{children}</SiteChrome>
        </LangProvider>
      </body>
    </html>
  );
}