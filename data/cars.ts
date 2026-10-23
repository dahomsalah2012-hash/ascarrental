export type Car = {
  id: string;
  name: string;
  category: string; // slug الكاتيجوري
  seats: number;
  transmission: "أوتوماتيك" | "يدوي";
  pricePerDay: number; // ج.م
  image: string;
  year: number | null;
  fuel: string | null;
  features: string[];
  isActive: boolean;
};
