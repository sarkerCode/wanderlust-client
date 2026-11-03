export type IDestination = {
  _id?: string;
  id?: string;
  name: string;
  country: string;
  price: number | string;
  duration: string;
  imageUrl: string;
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
  departureDate?: string;
};