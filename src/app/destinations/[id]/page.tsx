import { Suspense, cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CheckIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";


import { Skeleton } from "@/components/ui/skeleton";
import EditDialogBox from "@/components/EditDialogBox";
import { IDestination } from "@/app/types/DestinationType";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import BookNowButtonCard from "@/components/booking/BookNowButtonCard";



const FALLBACK_DESCRIPTION =
  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

const FALLBACK_HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];



const getDestination = cache(async (id: string): Promise<IDestination> => {
  const res = await fetch(`http://localhost:8000/destination/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    throw new Error(`Failed to fetch destination: ${res.status}`);
  }

  const data = await res.json();

  return data.result;
});



export async function generateMetadata({
  params,
}: PageProps<"/destinations/[id]">): Promise<Metadata> {
  const { id } = await params;
  const destination = await getDestination(id);
  console.log("Destination data:", destination);
console.log("Image URL:", destination.imageUrl);

  const description =
    destination.description ?? `${destination.name}, ${destination.country}`;

  return {
    title: `${destination.name} — Wanderlust`,
    description: description.slice(0, 160),
    openGraph: {
      title: destination.name,
      description: description.slice(0, 160),
      images: [{ url: destination.imageUrl, alt: destination.name }],
    },
  };
}

async function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading destination">
      <Skeleton className="aspect-[21/8] w-full" />
      <Skeleton className="mt-8 h-8 w-40" />
      <Skeleton className="mt-3 h-5 w-32" />
      <Skeleton className="mt-6 h-6 w-24" />
      <Skeleton className="mt-4 h-20 w-full" />
      <span className="sr-only">Loading destination details...</span>
    </div>
  );
}



async function DestinationDetails({ id }: { id: string }) {
  const destination = await getDestination(id);
  const {
    name,
    country,
    price,
    duration,
    imageUrl,
    description,
    rating = 4.9,
    reviews = 234,
    highlights = FALLBACK_HIGHLIGHTS,
    departureDate,
  } = destination;

  return (
    <>
      {/* Hero image */}
      <div className="relative mt-6 aspect-[21/8] w-full overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={`${name} — ${country}`}
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main info */}
        <div>
          <p className="flex items-center gap-1.5 text-sm text-foreground/80">
            <MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
            {country}
          </p>
          <h1 className="mt-2 text-4xl font-light tracking-tight text-foreground">
            {name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <StarIcon className="size-4 fill-emerald-600 text-emerald-600" />
            <span className="font-semibold text-foreground">
              {rating}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                ({reviews} reviews)
              </span>
            </span>
            <span className="h-4 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              <CalendarDaysIcon className="size-4 shrink-0" />
              {duration}
            </span>
          </div>

          <h2 className="mt-8 text-xl text-foreground">Overview</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description ?? FALLBACK_DESCRIPTION}
          </p>

          <h2 className="mt-8 text-xl text-foreground">Highlights</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description ?? FALLBACK_DESCRIPTION}
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-xs text-foreground/80"
              >
                <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking card */}
            <BookNowButtonCard destination={destination} />
      </div>
    </>
  );
}

export default async function DestinationDetailsPage({
  params,
}: PageProps<"/destinations/[id]">) {
  const { id } = await params;
  const destination = await getDestination(id);

  return (
    <main className="flex-1 bg-background py-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <header className="flex items-center justify-between">
          <Link
            href="/destinations"
            className="inline-flex w-fit items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex gap-3">
            
            <EditDialogBox destination= {destination} />

            

      <DeleteAlertDialog id={id} />

          </div>
        </header>

        <Suspense key={id} fallback={<DetailSkeleton />}>
          <DestinationDetails id={id} />
        </Suspense>
      </div>
    </main>
  );
}
