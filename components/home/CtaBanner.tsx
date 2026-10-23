"use client";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { useI18n } from "@/components/layout/LangProvider";

export default function CtaBanner() {
  const { t } = useI18n();
  return (
    <section className="container-x relative z-10 -mt-24">
      <div className="grid items-center gap-6 overflow-hidden rounded-3xl bg-cream shadow-xl md:grid-cols-[1.4fr_auto_1fr]">
        <div className="p-8 md:pe-0">
          <h2 className="text-2xl font-extrabold">{t.cta.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{t.cta.text}</p>
        </div>
        <Button href="/cars" className="mx-8 md:mx-0">
          <ArrowLeft size={16} className="ltr:rotate-180" /> {t.bookNow}
        </Button>
        <Photo src="/images/cta-keys.jpg" alt={t.cta.alt} className="h-32 w-full md:h-full md:min-h-28" sizes="33vw" />
      </div>
    </section>
  );
}