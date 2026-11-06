export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

export type Booking = {
  _id?: string;
  id?: string;
  bookingId?: string;
  name: string;
  destinationName?: string;
  country?: string;
  price: number | string;
  departureDate?: string;
  imageUrl?: string;
  status?: BookingStatus | string;
  destinationId?: string;
};
