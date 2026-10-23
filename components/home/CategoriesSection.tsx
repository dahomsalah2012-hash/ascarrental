"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Briefcase, CalendarDays, Fuel, Settings2, User, X } from "lucide-react";
import type { Category } from "@/data/categories";
import type { Car } from "@/data/cars";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import SectionTitle from "@/components/ui/SectionTitle";

type Props = {
  categories: Category[];
  cars: Car[];
  initialCategory?: string | null;
};

export default function CategoriesSection({ categories, cars: allCars, initialCategory = null }: Props) {
  const [selected, setSelected] = useState<string | null>(initialCategory);
  const outletRef = useRef<HTMLDivElement>(null);

  const isAll = selected === "all";
  const category = categories.find((c) => c.slug === selected);
  const cars = isAll ? allCars : allCars.filter((c) => c.category === selected);
  const showOutlet = isAll || !!category;

  useEffect(() => {
    if (showOutlet) outletRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected, showOutlet]);

  return (
    <section id="categories" className="container-x scroll-mt-24 py-14">
      <div className="flex items-end justify-between">
        <SectionTitle title="فئات السيارات" />
        <button onClick={() => setSelected("all")}
          className="flex items-center gap-1 text-sm font-semibold text-navy hover:underline">
          عرض جميع السيارات <ArrowLeft size={16} />
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const active = c.slug === selected;
          return (
            <article key={c.slug}
              className={`overflow-hidden rounded-2xl bg-white/60 pb-5 text-center shadow-sm ring-1 transition-shadow ${active ? "ring-2 ring-brand" : "ring-black/5"}`}>
              <Photo src={c.image} alt={c.name} className="h-36 w-full" sizes="(min-width:1024px) 25vw, 50vw" />
              <h3 className="mt-4 text-lg font-extrabold">{c.name}</h3>
              <p className="mt-2 flex items-center justify-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1"><User size={14} /> {c.seats} ركاب</span>
                <span className="flex items-center gap-1"><Briefcase size={14} /> {c.bags} حقائب</span>
              </p>
              <div className="px-5">
                <button onClick={() => setSelected(c.slug)} aria-pressed={active}
                  className={`mt-4 w-full rounded-xl border border-brand px-5 py-2.5 text-sm font-bold transition-colors ${active ? "bg-brand text-navy-deep" : "text-navy hover:bg-brand hover:text-navy-deep"}`}>
                  استعرض السيارات
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* الـ outlet */}
      <div ref={outletRef} className="scroll-mt-24">
        {showOutlet && (
          <div className="mt-10 rounded-3xl bg-emerald-50 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h3 className="border-b-[3px] border-brand pb-1 text-2xl font-extrabold">
                {isAll ? "جميع السيارات" : category?.name}
              </h3>
              <button onClick={() => setSelected(null)}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-navy hover:bg-white">
                <X size={16} /> إغلاق
              </button>
            </div>

            {cars.length === 0 ? (
              <p className="mt-6 text-slate-600">لا توجد سيارات متاحة في هذه الفئة حالياً.</p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                  <article key={car.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                    <Photo src={car.image} alt={car.name} className="h-48 w-full" sizes="(min-width:1024px) 33vw, 50vw" />
                    <div className="p-5">
                      <h3 className="text-lg font-extrabold">{car.name}</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <span className="flex items-center gap-1"><User size={14} /> {car.seats} ركاب</span>
                        <span className="flex items-center gap-1"><Settings2 size={14} /> {car.transmission}</span>
                        {car.year && <span className="flex items-center gap-1"><CalendarDays size={14} /> {car.year}</span>}
                        {car.fuel && <span className="flex items-center gap-1"><Fuel size={14} /> {car.fuel}</span>}
                      </p>
                      {car.features.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {car.features.map((f) => (
                            <li key={f} className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-navy">{f}</li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <p>
                          <span className="text-xl font-extrabold text-brand-ink">{car.pricePerDay.toLocaleString("ar-EG")}</span>{" "}
                          <span className="text-xs text-slate-500">ج.م / اليوم</span>
                        </p>
                        <Button href="/#contact">احجز الآن</Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
