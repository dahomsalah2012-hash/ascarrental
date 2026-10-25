import { hasSupabase, supabase } from "./supabase";
import { DEMO_CARS, DEMO_CATEGORIES } from "@/data/demo";
import type { Category } from "@/data/categories";
import type { Car } from "@/data/cars";

/* eslint-disable @typescript-eslint/no-explicit-any */
const carFromRow = (r: any): Car => {
  const images: string[] = r.images?.length ? r.images : r.image ? [r.image] : [];
  return {
    id: r.id,
    name: r.name,
    nameEn: r.name_en ?? null,
    category: r.category,
    seats: r.seats,
    transmission: r.transmission,
    image: images[0] ?? "",
    images,
    year: r.year,
    fuel: r.fuel,
    features: r.features ?? [],
    isActive: r.is_active,
  };
};

export const carToRow = (c: Omit<Car, "id">) => ({
  name: c.name,
  name_en: c.nameEn,
  category: c.category,
  seats: c.seats,
  transmission: c.transmission,
  image: c.images[0] ?? "",
  images: c.images,
  year: c.year,
  fuel: c.fuel,
  features: c.features,
  is_active: c.isActive,
});

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabase) return DEMO_CATEGORIES;
  const { data } = await supabase.from("categories").select("*").order("sort_order").order("name");
  return data ?? [];
}

/** onlyActive=true للموقع، false للداشبورد */
export async function getCars(onlyActive = true): Promise<Car[]> {
  if (!hasSupabase) return DEMO_CARS;
  let q = supabase.from("cars").select("*").order("created_at");
  if (onlyActive) q = q.eq("is_active", true);
  const { data } = await q;
  return (data ?? []).map(carFromRow);
}