import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyUs from "@/components/home/WhyUs";
import CtaBanner from "@/components/home/CtaBanner";
import { getCars, getCategories } from "@/lib/queries";

// الصفحة بتتخزن وتتجدد كل 60 ثانية (أسرع بكتير من force-dynamic)
export const revalidate = 60;

export default async function HomePage() {
  const [categories, cars] = await Promise.all([getCategories(), getCars()]);
  return (
    <>
      <Hero />
      <SearchBar categories={categories} />
      <CategoriesSection categories={categories} cars={cars} />
      <HowItWorks />
      <WhyUs />
      <CtaBanner />
    </>
  );
}