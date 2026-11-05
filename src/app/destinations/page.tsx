import { Suspense } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

type Destination = {
  _id?: string;
  id?: string;
  name: string;
  country: string;
  price: number | string;
  duration: string;
  imageUrl: string;
  rating?: number;
};

async function getDestinations(): Promise<Destination[]> {
  const res = await fetch("http://localhost:8000/destinations");
  if (!res.ok) {
    throw new Error(`Failed to fetch destinations: ${res.status}`);
  }
  return res.json();
}

function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  const { name, country, price, duration, imageUrl, rating } = destination;

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={imageUrl}
          alt={name}
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={600}
          height={400}
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 bg-white px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm">
          {(rating ?? 4.5).toString()}
          <Star className="size-3.5 fill-foreground" />
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <span className="flex items-center gap-1.5 text-sm text-foreground/80">
          <MapPin className="size-4 shrink-0" />
          {country}
        </span>

        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg text-foreground">{name}</h3>
          <p className="text-lg text-foreground">
            ${price}
            <span className="ml-0.5 align-middle text-xs font-light text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <span className="flex items-center gap-1.5 text-sm text-foreground/80">
          <CalendarDays className="size-4 shrink-0" />
          {duration}
        </span>

        <Link
          href={`/destinations/${destination._id}`}
          className="mt-1.5 inline-flex w-fit items-center gap-1 border-b border-brand pb-0.5 text-xs font-bold tracking-wide text-brand transition-colors hover:border-brand-hover hover:text-brand-hover"
        >
          BOOK NOW
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

function DestinationsGridSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading destinations">
      <p className="text-sm text-muted-foreground">Loading destinations...</p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton className="aspect-[16/10] w-full" />
            <Skeleton className="mt-3 h-4 w-24" />
            <Skeleton className="mt-2 h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function Destinations() {
  const destinations = await getDestinations();

  return (
    <section>
      <p className="text-sm text-foreground/80">
        Showing {destinations.length} destinations
      </p>

      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, index) => (
          <DestinationCard
            key={destination._id ?? destination.id ?? `${destination.name}-${index}`}
            destination={destination}
          />
        ))}
      </div>
    </section>
  );
}

export default function AllDestinationsPage() {
  return (
    <main className="flex-1 bg-background py-10">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <h1 className="text-4xl font-light tracking-tight text-foreground">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-10">
          <Suspense fallback={<DestinationsGridSkeleton />}>
            <Destinations />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
