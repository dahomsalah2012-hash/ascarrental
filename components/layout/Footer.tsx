import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";

type IconProps = { size?: number };

const Facebook = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Instagram = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: XIcon, label: "X", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="-mt-16 bg-navy-deep pt-28 text-white">
      <div className="container-x grid items-center gap-8 pb-8 md:grid-cols-3">
        <div className="flex flex-col items-start gap-3">
          <Logo />
          <p className="text-sm text-white/70">سفرك يبدأ من هنا</p>
        </div>

        <ul className="space-y-3 text-sm text-white/90">
          <li className="flex items-center gap-2"><MapPin size={18} className="text-brand" /> مصر - القاهرة</li>
          <li className="flex items-center gap-2"><Phone size={18} className="text-brand" /> <bdi dir="ltr">+20 100 123 4567</bdi></li>
          <li className="flex items-center gap-2"><Mail size={18} className="text-brand" /> <bdi dir="ltr">info@alrihla-cars.com</bdi></li>
        </ul>

        <div className="md:justify-self-end">
          <p className="mb-3 text-sm text-white/80">تابعنا على</p>
          <div className="flex gap-4">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="text-white/90 transition-colors hover:text-brand">
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="container-x border-t border-white/10 py-5 text-center text-xs text-white/60">
        جميع الحقوق محفوظة لـ الرحلة لتأجير السيارات © 2026
      </p>
    </footer>
  );
}