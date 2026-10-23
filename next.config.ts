import type { NextConfig } from "next";

// ادمجها مع إعداداتك الحالية لو عندك غيرها
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;
