"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Phone, X } from "lucide-react";
import type { Car } from "@/data/cars";
import { pick } from "@/lib/dict";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "@/data/contact";
import { useI18n } from "@/components/layout/LangProvider";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export type Driver = "with" | "without" | "";
export type Trip = { city: string; from: string; to: string; driver: Driver };

type Ctx = {
  trip: Trip;
  setTrip: (patch: Partial<Trip>) => void;
  category: string | null;
  setCategory: (c: string | null) => void;
  searchTick: number;
  runSearch: (category: string) => void;
  openBooking: (car?: Car) => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const { lang, t } = useI18n();
  const b = t.booking;

  const [trip, setTripState] = useState<Trip>({ city: "", from: "", to: "", driver: "" });
  const [category, setCategory] = useState<string | null>(null);
  const [searchTick, setSearchTick] = useState(0);
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car | null>(null);

  const setTrip = useCallback((patch: Partial<Trip>) => setTripState((p) => ({ ...p, ...patch })), []);
  const runSearch = useCallback((cat: string) => {
    setCategory(cat || "all");
    setSearchTick((n) => n + 1);
  }, []);
  const openBooking = useCallback((c?: Car) => {
    setCar(c ?? null);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const driver: "with" | "without" = trip.driver || "without";

  const message = useMemo(() => {
    const m = b.msg;
    const lines = [m.hello];
    if (car) {
      lines.push(`• ${m.car}: ${pick(lang, car.name, car.nameEn)}`);
      if (car.year) lines.push(`• ${m.model}: ${car.year}`);
    }
    lines.push(`• ${m.service}: ${driver === "with" ? b.withDriver : b.withoutDriver}`);
    if (trip.city) lines.push(`• ${m.city}: ${trip.city}`);
    if (trip.from) lines.push(`• ${m.from}: ${trip.from}`);
    if (trip.to) lines.push(`• ${m.to}: ${trip.to}`);
    return lines.join("\n");
  }, [b, car, driver, lang, trip]);

  const value = useMemo(
    () => ({ trip, setTrip, category, setCategory, searchTick, runSearch, openBooking }),
    [trip, setTrip, category, searchTick, runSearch, openBooking],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 sm:items-center"
          onClick={close} role="presentation">
          <div role="dialog" aria-modal="true" aria-label={b.title} onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold">{b.title}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {car ? (
                    <>
                      {pick(lang, car.name, car.nameEn)}
                      {car.year ? ` · ${t.categories.model} ${car.year}` : ""}
                    </>
                  ) : (
                    b.anyCar
                  )}
                </p>
              </div>
              <button onClick={close} aria-label={b.close} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>

            <p className="mb-2 mt-5 text-sm font-semibold">{b.service}</p>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={b.service}>
              {(["with", "without"] as const).map((d) => (
                <button key={d} type="button" role="radio" aria-checked={driver === d}
                  onClick={() => setTrip({ driver: d })}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-bold transition-colors ${driver === d ? "border-brand bg-brand/15 text-navy" : "border-slate-200 text-slate-600 hover:border-brand/60"}`}>
                  {d === "with" ? b.withDriver : b.withoutDriver}
                </button>
              ))}
            </div>

            <p className="mb-2 mt-5 text-sm font-semibold">{b.how}</p>
            <div className="space-y-3">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
                target="_blank" rel="noopener noreferrer" onClick={close}
                className="flex items-center gap-3 rounded-xl bg-[#25D366] px-4 py-3 text-white transition-opacity hover:opacity-90">
                <WhatsAppIcon size={28} />
                <span>
                  <span className="block font-bold">{b.whatsapp}</span>
                  <span className="block text-xs text-white/90">{b.whatsappHint}</span>
                </span>
              </a>
              <a href={`tel:${PHONE_TEL}`} onClick={close}
                className="flex items-center gap-3 rounded-xl bg-brand px-4 py-3 text-navy-deep transition-colors hover:bg-brand-dark">
                <Phone size={26} />
                <span>
                  <span className="block font-bold">{b.call}</span>
                  <span className="block text-xs"><bdi dir="ltr">{PHONE_DISPLAY}</bdi></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}