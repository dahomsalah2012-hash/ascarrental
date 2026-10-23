"use client";
import type { Car } from "@/data/cars";
import { useBooking } from "@/components/booking/BookingProvider";

type Props = { car?: Car; className?: string; children: React.ReactNode };

export default function BookButton({ car, className = "", children }: Props) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={() => openBooking(car)}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-navy-deep transition-colors hover:bg-brand-dark ${className}`}>
      {children}
    </button>
  );
}