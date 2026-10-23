"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { LABEL } from "./styles";

type Props = { value: string; onChange: (url: string) => void; folder: "categories" | "cars" };

export default function ImageUpload({ value, onChange, folder }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000" });
    if (error) setError(error.message);
    else onChange(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    setBusy(false);
  }

  return (
    <div>
      <span className={LABEL}>الصورة</span>
      <div className="flex items-center gap-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-20 w-32 rounded-xl object-cover ring-1 ring-black/10" />
        ) : (
          <div className="flex h-20 w-32 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">لا توجد صورة</div>
        )}
        <input type="file" accept="image/*" onChange={onFile} disabled={busy}
          className="text-sm file:me-3 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:font-bold file:text-navy-deep" />
      </div>
      {busy && <p className="mt-1 text-xs text-slate-500">جاري الرفع...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
