import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";

export default function CtaBanner() {
  return (
    <section className="container-x relative z-10 -mt-24">
      <div className="grid items-center gap-6 overflow-hidden rounded-3xl bg-cream shadow-xl md:grid-cols-[1.4fr_auto_1fr]">
        <div className="p-8 md:pe-0">
          <h2 className="text-2xl font-extrabold">جاهز لرحلتك القادمة؟</h2>
          <p className="mt-2 text-sm text-slate-600">احجز الآن واستمتع بتجربة تأجير سيارات سهلة وآمنة</p>
        </div>
        <Button href="/cars" className="mx-8 md:mx-0">
          <ArrowLeft size={16} /> احجز الآن
        </Button>
        <Photo src="/images/keys.jpg" alt="مفاتيح سيارة" className="h-32 w-full md:h-full md:min-h-28" sizes="33vw" />
      </div>
    </section>
  );
}