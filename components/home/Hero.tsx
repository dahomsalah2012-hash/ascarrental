"use client";
import { Car, Headset, ShieldCheck } from "lucide-react";
import Photo from "@/components/ui/Photo";
import { useI18n } from "@/components/layout/LangProvider";

const ICONS = [Car, ShieldCheck, Headset];

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pb-24 pt-12 md:pb-32 md:pt-16">
      <Photo src="/images/home-hero.jpg" alt={t.hero.alt} priority
        className="absolute inset-0 -z-20 !bg-transparent" />
      {/* طبقة تغميق ناحية الكلام عشان يبان على أي صورة */}
      <div className="absolute inset-0 -z-10 bg-linear-to-l from-black/85 via-black/55 to-black/10 ltr:bg-linear-to-r" />

      <div className="container-x">
        <div className="max-w-xl [text-shadow:0_2px_12px_rgb(0_0_0/0.6)]">
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl">
            {t.hero.title1}
            <span className="block text-brand">{t.hero.title2}</span>
          </h1>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-white/90">
            {t.hero.sub1}
            <br /> {t.hero.sub2}
          </p>

          <ul className="mt-10 grid grid-cols-3 gap-4 text-center text-white">
            {t.hero.features.map(({ title, sub }, i) => {
              const Icon = ICONS[i];
              return (
                <li key={title} className="flex flex-col items-center gap-2">
                  <Icon size={34} strokeWidth={1.5} className="text-brand" />
                  <span className="text-sm font-semibold leading-snug">{title}<br />{sub}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}