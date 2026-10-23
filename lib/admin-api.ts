import { hasSupabase, supabase } from "./supabase";
import { carToRow, getCars, getCategories } from "./queries";
import { DEMO_CARS, DEMO_CATEGORIES } from "@/data/demo";
import type { Category } from "@/data/categories";
import type { Car } from "@/data/cars";

const CAT_KEY = "demo_categories";
const CAR_KEY = "demo_cars";

function read<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return seed;
}
function write<T>(key: string, value: T[]) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

/* ---------- الفئات ---------- */
export async function adminGetCategories(): Promise<Category[]> {
  if (hasSupabase) return getCategories();
  return read(CAT_KEY, DEMO_CATEGORIES).sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveCategory(c: Category, isNew: boolean): Promise<string | null> {
  if (!hasSupabase) {
    const list = read(CAT_KEY, DEMO_CATEGORIES);
    if (isNew && list.some((x) => x.slug === c.slug)) return "الـ slug مستخدم قبل كده";
    write(CAT_KEY, isNew ? [...list, c] : list.map((x) => (x.slug === c.slug ? c : x)));
    return null;
  }
  const { error } = isNew
    ? await supabase.from("categories").insert(c)
    : await supabase.from("categories").update(c).eq("slug", c.slug);
  if (!error) return null;
  return error.message.includes("duplicate") ? "الـ slug مستخدم قبل كده" : error.message;
}

export async function deleteCategory(slug: string): Promise<string | null> {
  const blocked = "مش هينفع تحذف الفئة وفيها سيارات. احذف السيارات أو انقلها لفئة تانية الأول.";
  if (!hasSupabase) {
    if (read(CAR_KEY, DEMO_CARS).some((c) => c.category === slug)) return blocked;
    write(CAT_KEY, read(CAT_KEY, DEMO_CATEGORIES).filter((c) => c.slug !== slug));
    return null;
  }
  const { error } = await supabase.from("categories").delete().eq("slug", slug);
  return error ? blocked : null;
}

/* ---------- السيارات ---------- */
export async function adminGetCars(): Promise<Car[]> {
  return hasSupabase ? getCars(false) : read(CAR_KEY, DEMO_CARS);
}

export async function saveCar(car: Car): Promise<string | null> {
  if (!hasSupabase) {
    const list = read(CAR_KEY, DEMO_CARS);
    write(CAR_KEY, car.id ? list.map((x) => (x.id === car.id ? car : x)) : [...list, { ...car, id: crypto.randomUUID() }]);
    return null;
  }
  const row = carToRow(car);
  const { error } = car.id
    ? await supabase.from("cars").update(row).eq("id", car.id)
    : await supabase.from("cars").insert(row);
  return error ? error.message : null;
}

export async function deleteCar(id: string): Promise<string | null> {
  if (!hasSupabase) {
    write(CAR_KEY, read(CAR_KEY, DEMO_CARS).filter((c) => c.id !== id));
    return null;
  }
  const { error } = await supabase.from("cars").delete().eq("id", id);
  return error ? error.message : null;
}

export async function toggleCar(car: Car): Promise<void> {
  if (!hasSupabase) {
    write(CAR_KEY, read(CAR_KEY, DEMO_CARS).map((c) => (c.id === car.id ? { ...c, isActive: !c.isActive } : c)));
    return;
  }
  await supabase.from("cars").update({ is_active: !car.isActive }).eq("id", car.id);
}

/* ---------- الصور ---------- */
function toDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, 800 / img.width);
      const c = document.createElement("canvas");
      c.width = img.width * s;
      c.height = img.height * s;
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => reject(new Error("تعذر قراءة الصورة"));
    img.src = url;
  });
}

export async function uploadImage(file: File, folder: "categories" | "cars"): Promise<{ url?: string; error?: string }> {
  try {
    if (!hasSupabase) return { url: await toDataUrl(file) };
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000" });
    if (error) return { error: error.message };
    return { url: supabase.storage.from("media").getPublicUrl(path).data.publicUrl };
  } catch (e) {
    return { error: (e as Error).message };
  }
}