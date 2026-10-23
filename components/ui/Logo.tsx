import Image from "next/image";

export default function Logo() {
  return <Image src="/images/Logo.png" alt="الرحلة لتأجير السيارات" width={160} height={56} className="h-12 w-auto" />;
}