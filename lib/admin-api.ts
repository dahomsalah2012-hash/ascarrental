import { supabase } from "./supabase";
import { carToRow, getCars, getCategories } from "./queries";
import type { Category } from "@/data/categories";
import type { Car } from "@/data/cars";

/* ---------- الفئات ---------- */
export const adminGetCategories = () => getCategories();

export async function saveCategory(c: Category, isNew: boolean): Promise<string | null> {
  const { error } = isNew
    ? await supabase.from("categories").insert(c)
    : await supabase.from("categories").update(c).eq("slug", c.slug);
  if (!error) return null;
  return error.message.includes("duplicate") ? "الـ slug مستخدم قبل كده" : error.message;
}

export async function deleteCategory(slug: string): Promise<string | null> {
  const { error } = await supabase.from("categories").delete().eq("slug", slug);
  return error ? "مش هينفع تحذف الفئة وفيها سيارات. احذف السيارات أو انقلها لفئة تانية الأول." : null;
}

/* ---------- السيارات ---------- */
export const adminGetCars = () => getCars(false);

export async function saveCar(car: Car): Promise<string | null> {
  const row = carToRow(car);
  const { error } = car.id
    ? await supabase.from("cars").update(row).eq("id", car.id)
    : await supabase.from("cars").insert(row);
  return error ? error.message : null;
}

export async function deleteCar(id: string): Promise<string | null> {
  const { error } = await supabase.from("cars").delete().eq("id", id);
  return error ? error.message : null;
}

export async function toggleCar(car: Car): Promise<void> {
  await supabase.from("cars").update({ is_active: !car.isActive }).eq("id", car.id);
}

/* ---------- الصور: بنصغّرها وبنحوّلها webp قبل الرفع عشان الموقع يفضل سريع ---------- */
async function compressImage(file: File, maxWidth: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("تعذر معالجة الصورة"))),
      "image/webp",
      0.82,
    );
  });
}

export async function uploadImage(
  file: File,
  folder: "categories" | "cars",
): Promise<{ url?: string; error?: string }> {
  try {
    const blob = await compressImage(file, folder === "cars" ? 1400 : 900);
    const path = `${folder}/${crypto.randomUUID()}.webp`;
    const { error } = await supabase.storage
      .from("media")
      .upload(path, blob, { contentType: "image/webp", cacheControl: "31536000" });
    if (error) return { error: error.message };
    return { url: supabase.storage.from("media").getPublicUrl(path).data.publicUrl };
  } catch (e) {
    return { error: (e as Error).message };
  }
}