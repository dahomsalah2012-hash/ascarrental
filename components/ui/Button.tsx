import Link from "next/link";

type Props = { href: string; children: React.ReactNode; className?: string };

export default function Button({ href, children, className = "" }: Props) {
  return (
    <Link href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-navy-deep transition-colors hover:bg-brand-dark ${className}`}>
      {children}
    </Link>
  );
}