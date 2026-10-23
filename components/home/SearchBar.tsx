import { Calendar, CarFront, ChevronDown, MapPin, Search } from "lucide-react";
import type { Category } from "@/data/categories";

const CITIES = ["القاهرة", "الجيزة", "الإسكندرية", "شرم الشيخ", "الغردقة"];
const BOX = "flex h-12 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm";

export default function SearchBar({ categories }: { categories: Category[] }) {
  return (
    <form action="/cars" method="get" className="container-x relative z-10 -mt-14">
      <div className="grid items-end gap-4 rounded-2xl bg-white p-5 shadow-xl md:grid-cols-[repeat(4,1fr)_auto]">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">مكان الاستلام</span>
          <span className={BOX}>
            <MapPin size={18} className="text-slate-500" />
            <select name="city" defaultValue="" className="w-full appearance-none bg-transparent outline-none">
              <option value="" disabled>اختر المدينة</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="text-slate-400" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">تاريخ الاستلام</span>
          <span className={BOX}>
            <Calendar size={18} className="text-slate-500" />
            <input type="date" name="from" className="w-full bg-transparent outline-none" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">تاريخ الإعادة</span>
          <span className={BOX}>
            <Calendar size={18} className="text-slate-500" />
            <input type="date" name="to" className="w-full bg-transparent outline-none" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">نوع السيارة</span>
          <span className={BOX}>
            <CarFront size={18} className="text-slate-500" />
            <select name="category" defaultValue="" className="w-full appearance-none bg-transparent outline-none">
              <option value="">جميع السيارات</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <ChevronDown size={16} className="text-slate-400" />
          </span>
        </label>

        <button type="submit"
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-8 font-bold text-navy-deep transition-colors hover:bg-brand-dark">
          <Search size={18} /> ابحث عن سيارة
        </button>
      </div>
    </form>
  );
}
