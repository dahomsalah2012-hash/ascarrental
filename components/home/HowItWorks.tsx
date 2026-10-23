import { Fragment } from "react";
import { CalendarDays, Car, ChevronLeft, FileText, KeyRound } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

const STEPS = [
  { icon: Car, title: "اختر السيارة", text: "حدد نوع السيارة التي تناسب احتياجك" },
  { icon: CalendarDays, title: "حدد المواعيد", text: "اختر تاريخ ووقت الاستلام والإعادة" },
  { icon: FileText, title: "أكمل الحجز", text: "أدخل بياناتك وأكمل الحجز بسهولة" },
  { icon: KeyRound, title: "استلم سيارتك", text: "استلم سيارتك في الموعد وانطلق في رحلتك" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-emerald-50 py-14">
      <div className="container-x">
        <SectionTitle title="كيف تعمل؟" subtitle="خطوات بسيطة لتبدأ رحلتك" />

        <ol className="mt-10 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Fragment key={title}>
              <li className="flex max-w-[220px] flex-col items-center text-center">
                <span className="flex size-[72px] items-center justify-center rounded-full border-2 border-brand text-brand-ink">
                  <Icon size={30} strokeWidth={1.6} />
                </span>
                <h3 className="mt-3 font-extrabold">{i + 1}. {title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
              {i < STEPS.length - 1 && (
                <ChevronLeft aria-hidden className="mt-6 hidden shrink-0 text-slate-400 md:block" />
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}