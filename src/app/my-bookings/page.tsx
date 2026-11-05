import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CalendarX2 } from "lucide-react";

import type { Booking } from "@/app/types/BookingType";
import { BookingCard } from "@/components/booking/booking-card";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { apiUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "My Bookings — Wanderlust",
  description:
    "View and manage your upcoming travel plans and bookings with Wanderlust.",
  robots: { index: false, follow: false },
};

async function getMyBookings(email: string): Promise<Booking[]> {
  const res = await fetch(apiUrl(`/my-bookings/${encodeURIComponent(email)}`), {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch bookings: ${res.status}`);
  }
  const data = (await res.json()) as Booking[];
  return Array.isArray(data) ? data : [];
}

async function BookingsList({ email }: { email: string }) {
  const bookings = await getMyBookings(email);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
        <CalendarX2 className="size-10 text-muted-foreground" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold">No bookings yet</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          When you book a trip, it will appear here. Start exploring destinations
          to plan your next adventure.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4" aria-label="Your bookings">
      {bookings.map((booking, index) => (
        <li key={booking._id ?? booking.id ?? `${booking.name}-${index}`}>
          <BookingCard booking={booking} />
        </li>
      ))}
    </ul>
  );
}

function BookingsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading bookings" className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Loading bookings...</p>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-5 rounded-xl border bg-card p-5">
          <Skeleton className="h-32 w-48 shrink-0" />
          <div className="flex flex-1 flex-col gap-3">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-4xl font-light tracking-tight text-foreground">
          My Bookings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage and view your upcoming travel plans
        </p>
      </header>

      <div className="mt-8">
        <Suspense fallback={<BookingsSkeleton />}>
          <BookingsList email={user.email} />
        </Suspense>
      </div>
    </main>
  );
}
