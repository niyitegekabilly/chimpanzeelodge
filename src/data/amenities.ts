import { Amenity } from '../types';

export const amenities: Amenity[] = [
  {
    id: '1',
    name: 'Dining Area',
    description: 'Our dining area serves both international and local meals to meet guests\' preferences. Enjoy continental breakfast, lunch, and dinner in the main building or in the garden, served by our well-trained and friendly staff.',
    images: [
      '/images/amenities/restaurant.jpeg',
      '/images/amenities/dining.jpg'
    ],
    openingHours: 'Breakfast: 7:00 AM - 10:30 AM | Lunch: 12:30 PM - 3:00 PM | Dinner: 6:30 PM - 10:00 PM',
    type: 'dining'
  },
  {
    id: '2',
    name: 'Bar & Lounge',
    description: 'Our well-stocked bar and shared lounge offers a variety of drinks, including local options, cocktails, wines, spirits, and international beers. Relax and enjoy your drink while overlooking the spectacular view of the forest, tea plantation estate, and surrounding areas.',
    images: [
      '/images/amenities/barcony.jpeg',
      '/images/amenities/drinks-768x516.jpg'
    ],
    openingHours: '4:00 PM - 12:00 AM',
    type: 'bar'
  },
  {
    id: '3',
    name: 'Craft Shop',
    description: 'Visit our craft shop featuring African-style gifts including shoes, jewelry, guide books, clothes, and safari essentials.',
    images: [
      '/images/amenities/a78216de-a623-401d-b78d-dce51614db56-300x200.jpg',
      '/images/amenities/craft-shop.jpg'
    ],
    openingHours: '9:00 AM - 6:00 PM',
    type: 'shop'
  },
  {
    id: '4',
    name: 'Additional Services',
    description: 'We offer various additional services including solar energy, airport pickups and drop-offs, ample parking space, laundry services, and WiFi internet access throughout the lodge.',
    images: [
      '/images/amenities/around.jpeg',
      '/images/amenities/premises.jpeg'
    ],
    openingHours: '24/7',
    type: 'services'
  }
];