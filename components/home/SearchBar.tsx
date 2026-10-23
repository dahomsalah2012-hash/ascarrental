"use client";
import { useState } from "react";
import { Calendar, CarFront, ChevronDown, MapPin, Search, User } from "lucide-react";
import type { Category } from "@/data/categories";
import { pick } from "@/lib/dict";
import { useI18n } from "@/components/layout/LangProvider";
import { useBooking, type Driver } from "@/components/booking/BookingProvider";

const BOX = "flex h-12 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm";

export default function SearchBar({ categories }: { categories: Category[] }) {
  const { lang, t } = useI18n();
  const { trip, setTrip, runSearch } = useBooking();
  const [cat, setCat] = useState("");
  const s = t.search;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    runSearch(cat);
  }

  return (
    <form onSubmit={submit} className="container-x relative z-10 -mt-14">
      <div className="grid items-end gap-4 rounded-2xl bg-white p-5 shadow-xl sm:grid-cols-2 lg:grid-cols-6">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{s.pickup}</span>
          <span className={BOX}>
            <MapPin size={18} className="shrink-0 text-slate-500" />
            <select value={trip.city} onChange={(e) => setTrip({ city: e.target.value })}
              className="w-full appearance-none bg-transparent outline-none">
              <option value="">{s.selectCity}</option>
              {s.cities.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="shrink-0 text-slate-400" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{s.from}</span>
          <span className={BOX}>
            <Calendar size={18} className="shrink-0 text-slate-500" />
            <input type="date" value={trip.from} onChange={(e) => setTrip({ from: e.target.value })}
              className="w-full bg-transparent outline-none" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{s.to}</span>
          <span className={BOX}>
            <Calendar size={18} className="shrink-0 text-slate-500" />
            <input type="date" min={trip.from || undefined} value={trip.to}
              onChange={(e) => setTrip({ to: e.target.value })}
              className="w-full bg-transparent outline-none" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{s.carType}</span>
          <span className={BOX}>
            <CarFront size={18} className="shrink-0 text-slate-500" />
            <select value={cat} onChange={(e) => setCat(e.target.value)}
              className="w-full appearance-none bg-transparent outline-none">
              <option value="">{s.allCars}</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{pick(lang, c.name, c.name_en)}</option>)}
            </select>
            <ChevronDown size={16} className="shrink-0 text-slate-400" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{s.driver}</span>
          <span className={BOX}>
            <User size={18} className="shrink-0 text-slate-500" />
            <select value={trip.driver} onChange={(e) => setTrip({ driver: e.target.value as Driver })}
              className="w-full appearance-none bg-transparent outline-none">
              <option value="">{s.selectDriver}</option>
              <option value="with">{t.booking.withDriver}</option>
              <option value="without">{t.booking.withoutDriver}</option>
            </select>
            <ChevronDown size={16} className="shrink-0 text-slate-400" />
          </span>
        </label>

        <button type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-bold text-navy-deep transition-colors hover:bg-brand-dark">
          <Search size={18} /> {s.submit}
        </button>
      </div>
    </form>
  );
}