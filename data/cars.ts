export type Car = {
  id: string;
  name: string;
  nameEn: string | null;
  category: string; // slug الكاتيجوري
  seats: number;
  transmission: "أوتوماتيك" | "يدوي";
  image: string;
  year: number | null; // الموديل
  fuel: string | null;
  features: string[];
  isActive: boolean;
};