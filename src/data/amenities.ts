import { Amenity } from '../types';

export const amenities: Amenity[] = [
  {
    id: '1',
    name: 'Canopy Bar',
    description: 'Our elegant rooftop bar offers breathtaking views of the forest canopy. Enjoy craft cocktails and premium spirits while watching the sunset over Nyungwe National Park. Our mixologists specialize in unique creations using local ingredients and flavors.',
    images: [
      'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1554654/pexels-photo-1554654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    openingHours: '4:00 PM - 12:00 AM',
    type: 'bar'
  },
  {
    id: '2',
    name: 'Fitness Center',
    description: 'Stay active during your stay with our fully-equipped fitness center. Featuring modern cardio and strength training equipment, free weights, and yoga mats. Personal trainers are available upon request for private sessions.',
    images: [
      'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    openingHours: '6:00 AM - 10:00 PM',
    type: 'gym'
  },
  {
    id: '3',
    name: 'Rainforest Spa',
    description: 'Indulge in luxurious treatments inspired by traditional Rwandan wellness practices. Our spa uses organic, locally-sourced ingredients for massages, facials, and body treatments. Enjoy our steam room, sauna, and relaxation lounge with forest views.',
    images: [
      'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    openingHours: '9:00 AM - 8:00 PM',
    type: 'spa'
  },
  {
    id: '4',
    name: 'Infinity Pool',
    description: 'Our stunning infinity pool appears to merge with the forest canopy, offering a unique swimming experience. Relax on comfortable loungers with poolside service from our bar and restaurant. Towels provided.',
    images: [
      'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    openingHours: '7:00 AM - 7:00 PM',
    type: 'pool'
  }
];