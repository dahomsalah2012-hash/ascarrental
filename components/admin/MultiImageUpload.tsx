"use client";
import { useState } from "react";
import { Star, X } from "lucide-react";
import { uploadImage } from "@/lib/admin-api";
import ImageCropper from "./ImageCropper";
import { LABEL } from "./styles";

const MAX = 6;

type Props = { value: string[]; onChange: (urls: string[]) => void };

export default function MultiImageUpload({ value, onChange }: Props) {
  const [queue, setQueue] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    const room = MAX - value.length;
    if (room <= 0) return setError(`الحد الأقصى ${MAX} صور`);

    setError(files.length > room ? `اتقبلت ${room} صور بس (الحد الأقصى ${MAX})` : "");
    setQueue(files.slice(0, room));
  }

  async function onCropped(blob: Blob) {
    setBusy(true);
    const res = await uploadImage(blob, "cars");
    setBusy(false);

    if (res.url) {
      onChange([...value, res.url]);
      setQueue((q) => q.slice(1)); // الصورة اللي بعدها تفتح تلقائيًا
    } else {
      setError(res.error ?? "فشل الرفع");
    }
  }

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const makeCover = (i: number) => onChange([value[i], ...value.filter((_, idx) => idx !== i)]);

  return (
    <div>
      <span className={LABEL}>
        صور السيارة ({value.length}/{MAX}) - الأولى هي الرئيسية
      </span>

      {value.length > 0 && (
        <ul className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {value.map((url, i) => (
            <li key={url} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-20 w-full rounded-xl bg-white object-contain ring-1 ring-black/10" />
              {i === 0 ? (
                <span className="absolute start-1 top-1 rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white">
                  رئيسية
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => makeCover(i)}
                  aria-label="اجعلها الرئيسية"
                  className="absolute start-1 top-1 rounded-full bg-white/90 p-1 text-amber-600 shadow"
                >
                  <Star size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="حذف الصورة"
                className="absolute end-1 top-1 rounded-full bg-white/90 p-1 text-red-600 shadow"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onFiles}
        disabled={busy || value.length >= MAX}
        className="text-sm file:me-3 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:font-bold file:text-navy-deep"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {queue[0] && (
        <ImageCropper
          key={queue[0].name + queue[0].size + queue.length}
          file={queue[0]}
          busy={busy}
          remaining={queue.length - 1}
          onDone={onCropped}
          onCancel={() => setQueue([])}
        />
      )}
    </div>
  );
}