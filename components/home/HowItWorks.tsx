"use client";
import { Fragment } from "react";
import { CalendarDays, Car, ChevronLeft, FileText, KeyRound } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useI18n } from "@/components/layout/LangProvider";

const ICONS = [Car, CalendarDays, FileText, KeyRound];

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = t.how.steps;

  return (
    <section id="how-it-works" className="bg-emerald-50 py-14">
      <div className="container-x">
        <SectionTitle title={t.how.title} subtitle={t.how.subtitle} />

        <ol className="mt-10 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {steps.map(({ title, text }, i) => {
            const Icon = ICONS[i];
            return (
              <Fragment key={title}>
                <li className="flex max-w-[220px] flex-col items-center text-center">
                  <span className="flex size-[72px] items-center justify-center rounded-full border-2 border-brand text-brand-ink">
                    <Icon size={30} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-3 font-extrabold">{i + 1}. {title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                </li>
                {i < steps.length - 1 && (
                  <ChevronLeft aria-hidden className="mt-6 hidden shrink-0 text-slate-400 ltr:rotate-180 md:block" />
                )}
              </Fragment>
            );
          })}
        </ol>
      </div>
    </section>
  );
}