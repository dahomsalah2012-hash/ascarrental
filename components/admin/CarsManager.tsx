"use client";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { adminGetCars, adminGetCategories, deleteCar, saveCar, toggleCar } from "@/lib/admin-api";
import type { Category } from "@/data/categories";
import type { Car } from "@/data/cars";
import ImageUpload from "./ImageUpload";
import { BTN, BTN_GHOST, INPUT, LABEL } from "./styles";

const FUELS = ["بنزين", "ديزل", "هايبرد", "كهرباء"];
const EMPTY: Car = {
  id: "", name: "", nameEn: null, category: "", seats: 5, transmission: "أوتوماتيك",
  image: "", year: null, fuel: null, features: [], isActive: true,
};

export default function CarsManager() {
  const [cars, setCars] = useState<Car[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [form, setForm] = useState<Car | null>(null);
  const [featuresText, setFeaturesText] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => adminGetCars().then(setCars);
  useEffect(() => {
    load();
    adminGetCategories().then(setCats);
  }, []);

  const set = <K extends keyof Car>(k: K, v: Car[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));
  const catName = (slug: string) => cats.find((c) => c.slug === slug)?.name ?? slug;

  function open(car: Car) {
    setForm(car);
    setFeaturesText(car.features.join("، "));
    setError("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    if (!form.image) return setError("ارفع صورة للسيارة");
    const features = featuresText.split(/[,،]/).map((s) => s.trim()).filter(Boolean);
    setBusy(true);
    setError("");
    const err = await saveCar({ ...form, features });
    setBusy(false);
    if (err) return setError(err);
    setForm(null);
    load();
  }

  async function remove(car: Car) {
    if (!confirm(`حذف "${car.name}"؟`)) return;
    const err = await deleteCar(car.id);
    if (err) return alert(err);
    load();
  }

  async function toggle(car: Car) {
    await toggleCar(car);
    load();
  }

  const shown = filter ? cars.filter((c) => c.category === filter) : cars;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold">السيارات ({shown.length})</h2>
        <div className="flex gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={`${INPUT} w-48`}>
            <option value="">كل الفئات</option>
            {cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
          <button onClick={() => open({ ...EMPTY, category: filter || cats[0]?.slug || "" })} className={BTN}>
            <Plus size={18} /> إضافة سيارة
          </button>
        </div>
      </div>

      {form && (
        <form onSubmit={save} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:grid-cols-2">
          <label className="block">
            <span className={LABEL}>اسم السيارة بالعربي</span>
            <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>اسم السيارة بالإنجليزي</span>
            <input dir="ltr" value={form.nameEn ?? ""} onChange={(e) => set("nameEn", e.target.value || null)} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>الفئة</span>
            <select required value={form.category} onChange={(e) => set("category", e.target.value)} className={INPUT}>
              {cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={LABEL}>الموديل (سنة الصنع)</span>
            <input type="number" required min={1990} max={2100} placeholder="2024" value={form.year ?? ""}
              onChange={(e) => set("year", e.target.value ? Number(e.target.value) : null)} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>عدد الركاب</span>
            <input type="number" min={1} required value={form.seats} onChange={(e) => set("seats", Number(e.target.value))} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>ناقل الحركة</span>
            <select value={form.transmission} onChange={(e) => set("transmission", e.target.value as Car["transmission"])} className={INPUT}>
              <option>أوتوماتيك</option>
              <option>يدوي</option>
            </select>
          </label>
          <label className="block">
            <span className={LABEL}>نوع الوقود</span>
            <select value={form.fuel ?? ""} onChange={(e) => set("fuel", e.target.value || null)} className={INPUT}>
              <option value="">—</option>
              {FUELS.map((f) => <option key={f}>{f}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={LABEL}>المميزات (افصل بينها بفاصلة)</span>
            <input value={featuresText} onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="تكييف / A/C، بلوتوث / Bluetooth" className={INPUT} />
          </label>
          <div className="md:col-span-2">
            <ImageUpload folder="cars" value={form.image} onChange={(url) => set("image", url)} />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold md:col-span-2">
            <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} className="size-4 accent-emerald-700" />
            ظاهرة في الموقع
          </label>
          {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
          <div className="flex gap-2 md:col-span-2">
            <button type="submit" disabled={busy} className={BTN}>{busy ? "جاري الحفظ..." : "حفظ"}</button>
            <button type="button" onClick={() => setForm(null)} className={BTN_GHOST}>إلغاء</button>
          </div>
        </form>
      )}

      <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {shown.map((car) => (
          <li key={car.id} className="flex items-center gap-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={car.image} alt="" className="h-14 w-24 rounded-lg bg-slate-200 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{car.name}{car.nameEn && <span className="font-normal text-slate-500"> · <bdi dir="ltr">{car.nameEn}</bdi></span>}</p>
              <p className="text-xs text-slate-500">
                {catName(car.category)}{car.year ? ` · موديل ${car.year}` : ""}
              </p>
            </div>
            <button onClick={() => toggle(car)}
              className={`rounded-full px-3 py-1 text-xs font-bold ${car.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
              {car.isActive ? "ظاهرة" : "مخفية"}
            </button>
            <button onClick={() => open(car)} aria-label="تعديل" className="rounded-lg p-2 text-navy hover:bg-slate-100"><Pencil size={18} /></button>
            <button onClick={() => remove(car)} aria-label="حذف" className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={18} /></button>
          </li>
        ))}
        {shown.length === 0 && <li className="p-6 text-center text-sm text-slate-500">لا توجد سيارات.</li>}
      </ul>
    </div>
  );
}