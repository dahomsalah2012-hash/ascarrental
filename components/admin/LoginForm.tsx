"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { BTN, INPUT, LABEL } from "./styles";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="text-xl font-extrabold">تسجيل الدخول</h1>
        <label className="block">
          <span className={LABEL}>البريد الإلكتروني</span>
          <input type="email" required dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} />
        </label>
        <label className="block">
          <span className={LABEL}>كلمة المرور</span>
          <input type="password" required dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} className={INPUT} />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={busy} className={`${BTN} w-full`}>
          {busy ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}
