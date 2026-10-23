import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "الرحلة لتأجير السيارات",
  description: "تأجير سيارات بأفضل الأسعار وخدمة موثوقة لتجربة سفر مريحة وآمنة",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
