import { Room } from '../types';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'SINGLE',
    description: 'Comfortable single room with a private bathroom and essential amenities, ideal for solo travelers. Rates available for Bed and Breakfast, Half Board, and Full Board.',
    price: 95,
    priceHalfBoard: 113,
    priceFullBoard: 131,
    capacity: 1,
    images: [
      '/images/rooms/single-room-1.jpg',
      '/images/rooms/single-room-2.jpg'
    ],
    amenities: ['Free WiFi', 'Private bathroom', 'Hot and cold shower', 'Mosquito net', 'Flushing toilet', 'Free toiletries', 'Complementary bottled water'],
    size: 25,
    type: 'SINGLE',
    view: 'forest'
  },
  {
    id: '2',
    name: 'Double Bed',
    description: 'Spacious double room with a private bathroom and sitting area, perfect for couples. Rates available for Bed and Breakfast, Half Board, and Full Board.',
    price: 135,
    priceHalfBoard: 171,
    priceFullBoard: 207,
    capacity: 2,
    images: [
      '/images/rooms/double-room-1.jpg',
      '/images/rooms/double-room-2.jpg'
    ],
    amenities: ['Free WiFi', 'Private bathroom', 'Hot and cold shower', 'Mosquito net', 'Flushing toilet', 'Free toiletries', 'Complementary bottled water', 'Sitting area'],
    size: 35,
    type: 'Double Bed',
    view: 'forest'
  },
  {
    id: '3',
    name: 'Twin Bed',
    description: 'Comfortable twin room with two single beds and a private bathroom, ideal for friends or family traveling together. Rates available for Bed and Breakfast, Half Board, and Full Board.',
    price: 135,
    priceHalfBoard: 171,
    priceFullBoard: 207,
    capacity: 2,
    images: [
      '/images/rooms/twin-room-1.jpg',
      '/images/rooms/twin-room-2.jpg'
    ],
    amenities: ['Free WiFi', 'Private bathroom', 'Hot and cold shower', 'Mosquito net', 'Flushing toilet', 'Free toiletries', 'Complementary bottled water'],
    size: 30,
    type: 'Twin Bed',
    view: 'forest'
  },
  {
    id: '4',
    name: 'Tripple Bed',
    description: 'Spacious triple room with a private bathroom and sitting area, designed for three guests. Rates available for Bed and Breakfast, Half Board, and Full Board.',
    price: 225,
    priceHalfBoard: 279,
    priceFullBoard: 333,
    capacity: 3,
    images: [
      '/images/rooms/triple-room-1.jpg',
      '/images/rooms/triple-room-2.jpg'
    ],
    amenities: ['Free WiFi', 'Private bathroom', 'Hot and cold shower', 'Mosquito net', 'Flushing toilet', 'Free toiletries', 'Complementary bottled water', 'Sitting area'],
    size: 40,
    type: 'Tripple Bed',
    view: 'forest'
  },
  {
    id: '5',
    name: 'Budget Single Room',
    description: 'Affordable single room with essential amenities, suitable for budget travelers. Rates available for Bed and Breakfast, Half Board, and Full Board.',
    price: 75,
    priceHalfBoard: 93,
    priceFullBoard: 111,
    capacity: 1,
    images: [
      '/images/rooms/budget-single-room-1.jpg',
      '/images/rooms/budget-single-room-2.jpg'
    ],
    amenities: ['Free WiFi', 'Private bathroom', 'Hot and cold shower', 'Mosquito net', 'Flushing toilet', 'Free toiletries'],
    size: 18,
    type: 'Budget Single Room',
    view: 'garden'
  }
];