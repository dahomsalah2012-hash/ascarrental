type Props = { title: string; subtitle?: string };

export default function SectionTitle({ title, subtitle }: Props) {
  return (
    <div>
      <h2 className="inline-block border-b-[3px] border-brand pb-1 text-3xl font-extrabold">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
    </div>
  );
}