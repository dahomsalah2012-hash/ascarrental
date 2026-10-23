import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyUs from "@/components/home/WhyUs";
import CtaBanner from "@/components/home/CtaBanner";
import { getCars, getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic"; // أي تعديل من الداشبورد يظهر فوراً

type Props = { searchParams: Promise<{ category?: string }> };

export default async function HomePage({ searchParams }: Props) {
  const { category } = await searchParams;
  const [categories, cars] = await Promise.all([getCategories(), getCars()]);
  return (
    <>
      <Hero />
      <SearchBar categories={categories} />
      <CategoriesSection categories={categories} cars={cars} initialCategory={category ?? null} />
      <HowItWorks />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
