import { Car, Headset, ShieldCheck } from "lucide-react";
import Photo from "@/components/ui/Photo";

const FEATURES = [
  { icon: Car, title: "أسطول حديث", sub: "ومتنوع" },
  { icon: ShieldCheck, title: "تأمين شامل", sub: "وواطمئنان" },
  { icon: Headset, title: "دعم متواصل", sub: "على مدار الساعة" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-l from-white via-amber-100 to-navy pb-24 pt-12 md:pb-32 md:pt-16">
      <Photo src="/images/hero.jpg" alt="سيارة تويوتا أمام أفق المدينة" priority
        className="absolute inset-0 -z-10 !bg-transparent" />

      <div className="container-x">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold leading-tight text-ink md:text-6xl">
            سيارتك جاهزة
            <span className="block text-brand-ink">لأي وجهة</span>
          </h1>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-ink/90">
            تأجير سيارات بأفضل الأسعار وخدمة موثوقة
            <br /> لتجربة سفر مريحة وآمنة
          </p>

          <ul className="mt-10 grid grid-cols-3 gap-4 text-center text-ink">
            {FEATURES.map(({ icon: Icon, title, sub }) => (
              <li key={title} className="flex flex-col items-center gap-2">
                <Icon size={34} strokeWidth={1.5} />
                <span className="text-sm font-semibold leading-snug">{title}<br />{sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}