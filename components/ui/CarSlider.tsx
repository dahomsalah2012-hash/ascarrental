"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SWIPE_THRESHOLD = 40; // أقل مسافة سحب (بالبكسل) تتحسب swipe

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
  const count = list.length;

  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [touching, setTouching] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  const paused = hover || touching;
  const current = count ? index % count : 0;

  const go = (i: number) => {
    if (!count) return;
    setIndex(((i % count) + count) % count);
  };

  // التبديل التلقائي: timeout بيتعاد ضبطه مع كل تغيير في index (يدوي أو تلقائي)
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearTimeout(t);
  }, [count, paused, interval, index]);

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    setTouching(true);
  }

  function onPointerUp(e: React.PointerEvent) {
    const start = startX.current;
    startX.current = null;
    setTouching(false);
    if (start === null || count < 2) return;

    const dx = e.clientX - start;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    // في RTL السحب لليمين هو "التالي"، وفي LTR السحب لليسار
    const rtl = rootRef.current ? getComputedStyle(rootRef.current).direction === "rtl" : false;
    const forward = rtl ? dx > 0 : dx < 0;
    go(current + (forward ? 1 : -1));
  }

  function onPointerCancel() {
    startX.current = null;
    setTouching(false);
  }

  if (count === 0) {
    return <div className={`relative overflow-hidden bg-slate-100 ${className}`} />;
  }

  const next = (current + 1) % count;
  const prev = (current - 1 + count) % count;

  return (
    <div
      ref={rootRef}
      className={`relative touch-pan-y select-none overflow-hidden bg-white ${className}`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHover(false);
        onPointerCancel();
      }}
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
            draggable={false}
            className={`pointer-events-none object-contain transition-opacity duration-500 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null,
      )}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-1 flex justify-center">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              aria-label={`الصورة ${i + 1} من ${count}`}
              aria-current={i === current}
              className="p-2"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === current ? "w-5 bg-emerald-700" : "w-2 bg-slate-300"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}