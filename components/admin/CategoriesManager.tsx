"use client";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { adminGetCategories, deleteCategory, saveCategory } from "@/lib/admin-api";
import type { Category } from "@/data/categories";
import ImageUpload from "./ImageUpload";
import { BTN, BTN_GHOST, INPUT, LABEL } from "./styles";

const EMPTY: Category = { slug: "", name: "", name_en: null, seats: 5, bags: 2, image: "", sort_order: 0 };

export default function CategoriesManager() {
  const [items, setItems] = useState<Category[]>([]);
  const [form, setForm] = useState<Category | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => adminGetCategories().then(setItems);
  useEffect(() => { load(); }, []);

  const set = <K extends keyof Category>(k: K, v: Category[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  function openNew() {
    setForm({ ...EMPTY, sort_order: items.length + 1 });
    setIsNew(true);
    setError("");
  }
  function openEdit(c: Category) {
    setForm(c);
    setIsNew(false);
    setError("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    if (!form.image) return setError("ارفع صورة للفئة");
    setBusy(true);
    setError("");
    const err = await saveCategory(form, isNew);
    setBusy(false);
    if (err) return setError(err);
    setForm(null);
    load();
  }

  async function remove(c: Category) {
    if (!confirm(`حذف فئة "${c.name}"؟`)) return;
    const err = await deleteCategory(c.slug);
    if (err) return alert(err);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold">فئات السيارات ({items.length})</h2>
        <button onClick={openNew} className={BTN}><Plus size={18} /> إضافة فئة</button>
      </div>

      {form && (
        <form onSubmit={save} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:grid-cols-2">
          <label className="block">
            <span className={LABEL}>الاسم بالعربي</span>
            <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>الاسم بالإنجليزي</span>
            <input dir="ltr" value={form.name_en ?? ""} onChange={(e) => set("name_en", e.target.value || null)} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>Slug (إنجليزي صغير وشرطات)</span>
            <input required dir="ltr" pattern="[a-z0-9\-]+" disabled={!isNew} value={form.slug}
              onChange={(e) => set("slug", e.target.value)} className={`${INPUT} disabled:bg-slate-100`} />
          </label>
          <label className="block">
            <span className={LABEL}>الترتيب</span>
            <input type="number" required value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>عدد الركاب</span>
            <input type="number" min={1} required value={form.seats} onChange={(e) => set("seats", Number(e.target.value))} className={INPUT} />
          </label>
          <label className="block">
            <span className={LABEL}>عدد الحقائب</span>
            <input type="number" min={0} required value={form.bags} onChange={(e) => set("bags", Number(e.target.value))} className={INPUT} />
          </label>
          <div className="md:col-span-2">
            <ImageUpload folder="categories" value={form.image} onChange={(url) => set("image", url)} />
          </div>
          {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
          <div className="flex gap-2 md:col-span-2">
            <button type="submit" disabled={busy} className={BTN}>{busy ? "جاري الحفظ..." : "حفظ"}</button>
            <button type="button" onClick={() => setForm(null)} className={BTN_GHOST}>إلغاء</button>
          </div>
        </form>
      )}

      <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {items.map((c) => (
          <li key={c.slug} className="flex items-center gap-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt="" className="h-14 w-24 rounded-lg bg-slate-200 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{c.name}{c.name_en && <span className="font-normal text-slate-500"> · <bdi dir="ltr">{c.name_en}</bdi></span>}</p>
              <p className="text-xs text-slate-500">
                <bdi dir="ltr">{c.slug}</bdi> · {c.seats} ركاب · {c.bags} حقائب
              </p>
            </div>
            <button onClick={() => openEdit(c)} aria-label="تعديل" className="rounded-lg p-2 text-navy hover:bg-slate-100"><Pencil size={18} /></button>
            <button onClick={() => remove(c)} aria-label="حذف" className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={18} /></button>
          </li>
        ))}
        {items.length === 0 && <li className="p-6 text-center text-sm text-slate-500">لا توجد فئات بعد.</li>}
      </ul>
    </div>
  );
}