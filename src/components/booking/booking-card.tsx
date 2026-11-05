import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Eye, MapPin } from "lucide-react";

import type { Booking } from "@/app/types/BookingType";
import { Button } from "@/components/ui/button";
import { bookingDisplayId, formatDate, formatPrice } from "@/lib/format";
import { BookingStatusBadge, normalizeStatus } from "./booking-status-badge";
import { CancelBookingDialog } from "./cancel-booking-dialog";

export function BookingCard({ booking }: { booking: Booking }) {
  const id = bookingDisplayId(booking);
  const detailHref = booking.destinationId
    ? `/destinations/${booking.destinationId}`
    : "/destinations";
  const isCancelled = normalizeStatus(booking.status) === "Cancelled";

  return (
    <article
      aria-labelledby={`booking-title-${id}`}
      className="flex flex-col gap-5 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:p-5"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg sm:aspect-auto sm:h-32 sm:w-48">
        {booking.imageUrl ? (
          <Image
            src={booking.imageUrl}
            alt={booking.name}
            fill
            sizes="(min-width: 640px) 192px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="size-full bg-muted" aria-hidden="true" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <BookingStatusBadge status={booking.status} />
            <h3
              id={`booking-title-${id}`}
              className="mt-2 truncate text-xl font-semibold tracking-tight text-foreground"
            >
              {booking.name}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {isCancelled ? null : (
              <CancelBookingDialog bookingId={id} bookingName={booking.name} />
            )}
            <Button
              size="sm"
              render={<Link href={detailHref} />}
              nativeButton={false}
              className="bg-brand hover:bg-brand-hover"
            >
              <Eye data-icon="inline-start" className="size-3.5" aria-hidden="true" />
              View
            </Button>
          </div>
        </div>

        <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
            Departure: {formatDate(booking.departureDate)}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            Booking ID: {id}
          </li>
        </ul>

        <p className="mt-3 text-xl font-semibold text-brand">
          ${formatPrice(booking.price)}
        </p>
      </div>
    </article>
  );
}
