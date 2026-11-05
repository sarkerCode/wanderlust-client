export function formatPrice(price: number | string): string {
  return Number(price).toLocaleString("en-US");
}

export function formatDate(date?: string): string {
  if (!date) return "TBD";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function bookingDisplayId(booking: {
  _id?: string;
  id?: string;
  bookingId?: string;
}): string {
  return booking.bookingId ?? booking._id ?? booking.id ?? "—";
}
