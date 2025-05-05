import { Room } from '../types';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Forest View Standard Room',
    description: 'Comfortable room with a stunning view of the Nyungwe Forest. Perfect for solo travelers or couples seeking a peaceful retreat in nature.',
    price: 120,
    capacity: 2,
    images: [
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2962140/pexels-photo-2962140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    amenities: ['Free WiFi', 'TV', 'Air conditioning', 'Private bathroom', 'Coffee maker'],
    size: 25,
    type: 'standard',
    view: 'forest'
  },
  {
    id: '2',
    name: 'Garden Deluxe Room',
    description: 'Spacious room with a private balcony overlooking our lush gardens. Enjoy the sounds of nature and the comfort of premium amenities.',
    price: 180,
    capacity: 2,
    images: [
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6186815/pexels-photo-6186815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    amenities: ['Free WiFi', 'TV', 'Air conditioning', 'Private bathroom', 'Mini bar', 'Safe', 'Balcony'],
    size: 35,
    type: 'deluxe',
    view: 'garden'
  },
  {
    id: '3',
    name: 'Mountain View Suite',
    description: 'Luxurious suite with panoramic views of the mountains and forest. Features a separate living area and premium amenities for the ultimate comfort.',
    price: 250,
    capacity: 4,
    images: [
      'https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    amenities: ['Free WiFi', 'TV', 'Air conditioning', 'Private bathroom', 'Mini bar', 'Safe', 'Living area', 'Jacuzzi', 'Balcony'],
    size: 50,
    type: 'suite',
    view: 'mountain'
  },
  {
    id: '4',
    name: 'Family Deluxe Room',
    description: 'Spacious room designed for families, with connecting rooms and all the amenities needed for a comfortable stay with children.',
    price: 210,
    capacity: 4,
    images: [
      'https://images.pexels.com/photos/3634734/pexels-photo-3634734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    amenities: ['Free WiFi', 'TV', 'Air conditioning', 'Private bathroom', 'Mini bar', 'Safe', 'Interconnecting rooms'],
    size: 40,
    type: 'deluxe',
    view: 'garden'
  },
  {
    id: '5',
    name: 'Presidential Suite',
    description: 'Our most exclusive accommodation, offering unparalleled luxury and privacy. Features a private terrace with a hot tub and breathtaking views of the forest and mountains.',
    price: 400,
    capacity: 2,
    images: [
      'https://images.pexels.com/photos/4915547/pexels-photo-4915547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4099237/pexels-photo-4099237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    amenities: ['Free WiFi', 'TV', 'Air conditioning', 'Private bathroom', 'Mini bar', 'Safe', 'Living area', 'Dining area', 'Office space', 'Jacuzzi', 'Private terrace', 'Butler service'],
    size: 80,
    type: 'suite',
    view: 'mountain'
  },
  {
    id: '6',
    name: 'Forest Retreat Standard',
    description: 'Cozy room nestled in the forest, offering a peaceful retreat with essential amenities for a comfortable stay.',
    price: 140,
    capacity: 2,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    amenities: ['Free WiFi', 'TV', 'Air conditioning', 'Private bathroom', 'Coffee maker'],
    size: 28,
    type: 'standard',
    view: 'forest'
  }
];