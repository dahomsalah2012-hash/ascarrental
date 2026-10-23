import Image from "next/image";

type Props = { src: string; alt: string; className?: string; sizes?: string; priority?: boolean };

export default function Photo({ src, alt, className = "", sizes = "100vw", priority }: Props) {
  const pos = className.includes("absolute") ? "" : "relative";
  return (
    <div className={`${pos} overflow-hidden bg-slate-200 ${className}`}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />}
    </div>
  );
}