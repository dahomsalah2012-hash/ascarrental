import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabase = Boolean(url && key);

// قيم مؤقتة عشان الموقع ما يقعش لو الـ env مش موجود
export const supabase = createClient(url ?? "https://placeholder.supabase.co", key ?? "placeholder");