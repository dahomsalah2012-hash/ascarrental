"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  className?: string; // لازم يحدد الحجم، مثلًا "aspect-[16/10] w-full"
  sizes?: string;
  interval?: number;
  priority?: boolean;
};

export default function CarSlider({
  images,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  interval = 4000,
  priority,
}: Props) {
  const list = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (list.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % list.length), interval);
    return () => clearInterval(t);
  }, [list.length, paused, interval]);

  if (list.length === 0) {
    return <div className={`relative overflow-hidden bg-slate-100 ${className}`} />;
  }

  const current = index % list.length;
  const next = (current + 1) % list.length;
  const prev = (current - 1 + list.length) % list.length;

  return (
    <div
      className={`relative overflow-hidden bg-white ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {list.map((src, i) =>
        i === current || i === next || i === prev ? (
          <Image
            key={`${src}-${i}`}
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority && i === 0}
            className={`object-contain transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          />
        ) : null,
      )}

      {list.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1.5" aria-hidden>
          {list.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-4 bg-emerald-700" : "w-1.5 bg-slate-300"}`} />
          ))}
        </div>
      )}
    </div>
  );
}