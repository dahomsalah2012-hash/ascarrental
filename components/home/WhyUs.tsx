"use client";
import { BadgeCheck, MapPin, Tag, Users } from "lucide-react";
import Photo from "@/components/ui/Photo";
import { useI18n } from "@/components/layout/LangProvider";

const ICONS = [Users, MapPin, BadgeCheck, Tag];

export default function WhyUs() {
  const { t } = useI18n();
  return (
    <section id="why-us" className="relative isolate bg-navy pb-36 pt-14 text-white">
      <Photo src="/images/why-us.jpg" alt="" className="absolute inset-0 -z-20 !bg-transparent" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-navy/70 to-navy-deep" />

      <div className="container-x">
        <h2 className="text-center text-3xl font-extrabold">{t.why.title}</h2>
        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          {t.why.reasons.map(({ title, text }, i) => {
            const Icon = ICONS[i];
            return (
              <li key={title} className="flex flex-col items-center gap-2">
                <Icon size={36} strokeWidth={1.5} className="text-brand" />
                <h3 className="font-bold">{title}</h3>
                <p className="text-xs text-white/70">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}