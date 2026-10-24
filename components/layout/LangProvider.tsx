"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { DICT, type Lang } from "@/lib/dict";
import { SEO } from "@/data/seo";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "ar", setLang: () => {} });

function applyLang(l: Lang) {
  document.documentElement.lang = l;
  document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  document.title = SEO[l].title;
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  // الصفحة بتتبني بالعربي، ولو الزائر اختار الإنجليزي قبل كده نحوّلها
  useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((c) => c.startsWith("lang="))
      ?.split("=")[1];
    if (saved === "en") {
      applyLang("en");
      setLangState("en");
    }
  }, []);

  const setLang = (l: Lang) => {
    document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
    applyLang(l);
    setLangState(l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const { lang, setLang } = useContext(LangContext);
  return { lang, setLang, t: DICT[lang] };
}