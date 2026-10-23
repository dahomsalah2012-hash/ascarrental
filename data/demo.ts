import type { Category } from "@/data/categories";
import type { Car } from "@/data/cars";

export const DEMO_CATEGORIES: Category[] = [
  { slug: "family", name: "سيارات عائلية", seats: 7, bags: 4, image: "/images/categories/family.jpg", sort_order: 1 },
  { slug: "economy", name: "سيارات اقتصادية", seats: 5, bags: 2, image: "/images/categories/economy.jpg", sort_order: 2 },
  { slug: "luxury", name: "سيارات فاخرة", seats: 5, bags: 3, image: "/images/categories/luxury.jpg", sort_order: 3 },
  { slug: "offroad", name: "سيارات الدفع الرباعي", seats: 7, bags: 5, image: "/images/categories/offroad.jpg", sort_order: 4 },
];

const car = (id: string, name: string, category: string, seats: number, pricePerDay: number): Car => ({
  id, name, category, seats, pricePerDay,
  transmission: "أوتوماتيك",
  image: `/images/cars/${id}.jpg`,
  year: null, fuel: null, features: [], isActive: true,
});

export const DEMO_CARS: Car[] = [
  car("kia-carens", "كيا كارنز", "family", 7, 1500),
  car("toyota-innova", "تويوتا إنوفا", "family", 7, 1800),
  car("hyundai-accent", "هيونداي أكسنت", "economy", 5, 900),
  car("toyota-corolla", "تويوتا كورولا", "economy", 5, 1100),
  car("mercedes-e", "مرسيدس E-Class", "luxury", 5, 3500),
  car("bmw-5", "بي إم دبليو الفئة الخامسة", "luxury", 5, 3200),
  car("land-cruiser", "تويوتا لاند كروزر", "offroad", 7, 4200),
  car("toyota-fortuner", "تويوتا فورتشنر", "offroad", 7, 2800),
];