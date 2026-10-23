import type { Category } from "@/data/categories";
import type { Car } from "@/data/cars";

export const DEMO_CATEGORIES: Category[] = [
  { slug: "family", name: "سيارات عائلية", name_en: "Family cars", seats: 7, bags: 4, image: "/images/categories/family.jpg", sort_order: 1 },
  { slug: "economy", name: "سيارات اقتصادية", name_en: "Economy cars", seats: 5, bags: 2, image: "/images/categories/economy.jpg", sort_order: 2 },
  { slug: "luxury", name: "سيارات فاخرة", name_en: "Luxury cars", seats: 5, bags: 3, image: "/images/categories/luxury.jpg", sort_order: 3 },
  { slug: "offroad", name: "سيارات الدفع الرباعي", name_en: "4x4 cars", seats: 7, bags: 5, image: "/images/categories/offroad.jpg", sort_order: 4 },
];

const car = (id: string, name: string, nameEn: string, category: string, seats: number, year: number): Car => ({
  id, name, nameEn, category, seats, year,
  transmission: "أوتوماتيك",
  image: `/images/cars/${id}.jpg`,
  fuel: null, features: [], isActive: true,
});

export const DEMO_CARS: Car[] = [
  car("kia-carens", "كيا كارنز", "Kia Carens", "family", 7, 2023),
  car("toyota-innova", "تويوتا إنوفا", "Toyota Innova", "family", 7, 2024),
  car("hyundai-accent", "هيونداي أكسنت", "Hyundai Accent", "economy", 5, 2022),
  car("toyota-corolla", "تويوتا كورولا", "Toyota Corolla", "economy", 5, 2024),
  car("mercedes-e", "مرسيدس E-Class", "Mercedes E-Class", "luxury", 5, 2024),
  car("bmw-5", "بي إم دبليو الفئة الخامسة", "BMW 5 Series", "luxury", 5, 2023),
  car("land-cruiser", "تويوتا لاند كروزر", "Toyota Land Cruiser", "offroad", 7, 2024),
  car("toyota-fortuner", "تويوتا فورتشنر", "Toyota Fortuner", "offroad", 7, 2023),
];