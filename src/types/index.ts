export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  priceHalfBoard?: number;
  priceFullBoard?: number;
  capacity: number;
  images: string[];
  amenities: string[];
  size: number;
  type: string;
  view: string;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  boardType: 'BB' | 'HB' | 'FB';
}

export interface Restaurant {
  name: string;
  description: string;
  openingHours: string;
  menu: MenuItem[];
  images: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'main' | 'dessert' | 'drink';
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free')[];
}

export interface ConferenceRoom {
  id: string;
  name: string;
  capacity: number;
  description: string;
  amenities: string[];
  pricePerHour: number;
  images: string[];
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  images: string[];
  openingHours: string;
  type: 'bar' | 'gym' | 'spa' | 'pool';
}