"use client";
import { useEffect, useRef } from "react";
import { ArrowLeft, Briefcase, Fuel, Settings2, User, X } from "lucide-react";
import type { Category } from "@/data/categories";
import type { Car } from "@/data/cars";
import BookButton from "@/components/booking/BookButton";
import Photo from "@/components/ui/Photo";
import SectionTitle from "@/components/ui/SectionTitle";
import { pick } from "@/lib/dict";
import { useI18n } from "@/components/layout/LangProvider";
import { useBooking } from "@/components/booking/BookingProvider";

type Props = {
  categories: Category[];
  cars: Car[];
};

export default function CategoriesSection({ categories, cars: allCars }: Props) {
  const { lang, t } = useI18n();
  const c18 = t.categories;
  const { category: selected, setCategory: setSelected, searchTick } = useBooking();
  const outletRef = useRef<HTMLDivElement>(null);

  // لو الرابط فيه ?category=... افتح الفئة دي
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    if (fromUrl) setSelected(fromUrl);
  }, [setSelected]);

  const isAll = selected === "all";
  const category = categories.find((c) => c.slug === selected);
  const cars = isAll ? allCars : allCars.filter((c) => c.category === selected);
  const showOutlet = isAll || !!category;

  useEffect(() => {
    if (showOutlet) outletRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected, showOutlet, searchTick]);

  return (
    <section id="categories" className="container-x scroll-mt-24 py-14">
      <div className="flex items-end justify-between">
        <SectionTitle title={c18.title} />
        <button onClick={() => setSelected("all")}
          className="flex items-center gap-1 text-sm font-semibold text-navy hover:underline">
          {c18.viewAll} <ArrowLeft size={16} className="ltr:rotate-180" />
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const active = c.slug === selected;
          const name = pick(lang, c.name, c.name_en);
          return (
            <article key={c.slug}
              className={`overflow-hidden rounded-2xl bg-white/60 pb-5 text-center shadow-sm ring-1 transition-shadow ${active ? "ring-2 ring-brand" : "ring-black/5"}`}>
              <Photo src={c.image} alt={name} className="h-36 w-full" sizes="(min-width:1024px) 25vw, 50vw" />
              <h3 className="mt-4 text-lg font-extrabold">{name}</h3>
              <p className="mt-2 flex items-center justify-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1"><User size={14} /> {c.seats} {c18.seats}</span>
                <span className="flex items-center gap-1"><Briefcase size={14} /> {c.bags} {c18.bags}</span>
              </p>
              <div className="px-5">
                <button onClick={() => setSelected(c.slug)} aria-pressed={active}
                  className={`mt-4 w-full rounded-xl border border-brand px-5 py-2.5 text-sm font-bold transition-colors ${active ? "bg-brand text-navy-deep" : "text-navy hover:bg-brand hover:text-navy-deep"}`}>
                  {c18.browse}
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
                {isAll ? c18.all : category ? pick(lang, category.name, category.name_en) : ""}
              </h3>
              <button onClick={() => setSelected(null)}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-navy hover:bg-white">
                <X size={16} /> {c18.close}
              </button>
            </div>

            {cars.length === 0 ? (
              <p className="mt-6 text-slate-600">{c18.empty}</p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => {
                  const carName = pick(lang, car.name, car.nameEn);
                  return (
                    <article key={car.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                      <Photo src={car.image} alt={carName} className="h-48 w-full" sizes="(min-width:1024px) 33vw, 50vw" />
                      <div className="p-5">
                        <h3 className="text-lg font-extrabold">{carName}</h3>
                        {car.year && (
                          <p className="mt-1 text-sm font-bold text-brand-ink">{c18.model} {car.year}</p>
                        )}
                        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                          <span className="flex items-center gap-1"><User size={14} /> {car.seats} {c18.seats}</span>
                          <span className="flex items-center gap-1"><Settings2 size={14} /> {t.transmission[car.transmission] ?? car.transmission}</span>
                          {car.fuel && <span className="flex items-center gap-1"><Fuel size={14} /> {t.fuels[car.fuel] ?? car.fuel}</span>}
                        </p>
                        {car.features.length > 0 && (
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {car.features.map((f) => (
                              <li key={f} className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-navy">{f}</li>
                            ))}
                          </ul>
                        )}
                        <BookButton car={car} className="mt-4 w-full">{c18.bookNow}</BookButton>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}