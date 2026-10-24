"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { hasSupabase, supabase } from "@/lib/supabase";
import LoginForm from "@/components/admin/LoginForm";
import CategoriesManager from "@/components/admin/CategoriesManager";
import CarsManager from "@/components/admin/CarsManager";

type Tab = "categories" | "cars";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("categories");

  useEffect(() => {
    if (!hasSupabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!hasSupabase) {
    return <p className="p-8 text-center text-slate-600">مفاتيح Supabase غير مضافة في إعدادات المشروع.</p>;
  }
  if (!ready) return null;
  if (!session) return <LoginForm />;

  const tabs: { id: Tab; label: string }[] = [
    { id: "categories", label: "الفئات" },
    { id: "cars", label: "السيارات" },
  ];

  return (
    <>
      <header className="bg-navy text-white">
        <div className="container-x flex h-16 items-center justify-between">
          <h1 className="text-lg font-extrabold">لوحة تحكم الرحلة</h1>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-white/80 hover:text-white">عرض الموقع</Link>
            <button onClick={() => supabase.auth.signOut()} className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-8">
        <div className="flex gap-2 border-b border-slate-200">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`-mb-px border-b-[3px] px-5 py-2.5 text-sm font-bold transition-colors ${tab === t.id ? "border-brand text-navy" : "border-transparent text-slate-500 hover:text-navy"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-6">{tab === "categories" ? <CategoriesManager /> : <CarsManager />}</div>
      </main>
    </>
  );
}