"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CalendarCheck, Menu, X } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/data/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
      <Image src="/images/Logo.png" alt="الرحلة لتأجير السيارات" width={160} height={56} priority className="h-full w-auto " />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="التنقل الرئيسي">
          {NAV_LINKS.map((l) => {
            const active = l.href === pathname;
            return (
              <Link key={l.label} href={l.href}
                className={`border-b-2 py-1 text-sm transition-colors ${active ? "border-brand text-white" : "border-transparent text-white/80 hover:text-white"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cars"
            className="hidden items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-navy-deep transition-colors hover:bg-brand-dark sm:inline-flex">
            <CalendarCheck size={18} /> احجز الآن <ArrowLeft size={16} />
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="text-white lg:hidden"
            aria-label="القائمة" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-x flex flex-col gap-1 pb-4 lg:hidden">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/10">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}