"use client";
import Image from "next/image";
import { useI18n } from "@/components/layout/LangProvider";

export default function Logo() {
  const { t } = useI18n();
  return <Image src="/images/Logo.png" alt={t.brand} width={160} height={56} className="h-12 w-auto" />;
}