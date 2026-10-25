"use client";
import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedBlob } from "@/lib/crop-image";
import { BTN, BTN_GHOST } from "./styles";

type Props = {
  file: File;
  onDone: (blob: Blob) => void | Promise<void>;
  onCancel: () => void;
  busy?: boolean;
  remaining?: number; // كام صورة لسه مستنية بعد دي
};

// 0 = نسبة الصورة الأصلية (من غير قص للأطراف)
const RATIOS = [
  { label: "16:10 (مناسب للكارد)", value: 16 / 10 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1", value: 1 },
  { label: "الأصلية", value: 0 },
];

export default function ImageCropper({ file, onDone, onCancel, busy, remaining = 0 }: Props) {
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [ratio, setRatio] = useState(16 / 10);
  const [natural, setNatural] = useState(16 / 10);
  const [area, setArea] = useState<Area | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onComplete = useCallback((_: Area, pixels: Area) => setArea(pixels), []);

  function pickRatio(v: number) {
    setRatio(v);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }

  async function confirm() {
    if (!area || !src) return;
    setError("");
    try {
      const blob = await getCroppedBlob(src, area);
      await onDone(blob);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-2xl space-y-4 rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold">قص الصورة</h3>
          {remaining > 0 && <span className="text-xs text-slate-500">باقي {remaining} صور بعد دي</span>}
        </div>

        <div className="relative h-[55vh] min-h-64 overflow-hidden rounded-xl bg-slate-900">
          {src && (
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={ratio || natural}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onComplete}
              onMediaLoaded={(m) => setNatural(m.naturalWidth / m.naturalHeight)}
              showGrid
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {RATIOS.map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => pickRatio(r.value)}
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                ratio === r.value ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-sm font-semibold">
          تكبير
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 accent-emerald-700"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button type="button" onClick={confirm} disabled={busy || !area} className={BTN}>
            {busy ? "جاري الرفع..." : "قص وحفظ"}
          </button>
          <button type="button" onClick={onCancel} disabled={busy} className={BTN_GHOST}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}