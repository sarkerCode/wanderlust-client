"use client";
import { IDestination } from "@/app/types/DestinationType";
import { useSession } from "@/lib/auth-client";
import { Button, Input } from "@base-ui/react";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

const formatPrice = (price: IDestination["price"]) =>
  Number(price).toLocaleString("en-US");

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookNowButtonCard = ({ destination }: { destination: IDestination }) => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  const handleBookNow = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate") as string;
    // const departureDate = e.target.departureDate.value

    const data = {
        userName: user?.name,
        userEmail: user?.email,
        image: user?.image,
        ...destination,
        departureDate: departureDate,
        bookingDate: new Date().toISOString(),
    }

    const res = await fetch(`http://localhost:8000/bookings`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const bookingData = await res.json();

    console.log(bookingData);
    
  };
  return (
    <aside className="space-y-5">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {/* Price */}
        <div>
          <p className="text-sm text-muted-foreground">Starting from</p>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight text-brand">
              ${formatPrice(destination.price)}
            </span>
            <span className="text-sm text-muted-foreground">/ person</span>
          </div>
        </div>

        {/* Departure Date */}
        <div className="mt-6">
          <label
            htmlFor="departure-date"
            className="mb-2 block text-sm font-medium"
          >
            Departure Date
          </label>

          <form onSubmit={handleBookNow}>
            <Input
              id="departure-date"
              type="date"
              name="departureDate"
              aria-label="Departure date"
              className="h-11 w-full rounded-lg border bg-muted px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand"
              defaultValue={destination.departureDate}
            />

            {/* Book Now Button */}
            <Button
              type="submit"
              className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              <span>Book Now</span>
              <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" />
            </Button>
          </form>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Secure your spot for an unforgettable journey.
        </p>
      </div>

      {/* Perks */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold">What&apos;s included</h3>

        <ul className="flex flex-col gap-3">
          {PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-2.5 text-sm text-foreground/80"
            >
              <CheckIcon className="size-4 shrink-0 text-emerald-600" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BookNowButtonCard;
