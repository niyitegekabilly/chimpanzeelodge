import { Amenity } from '../types';

export const amenities: Amenity[] = [
  {
    id: '1',
    name: 'Dining Area',
    description: 'Our dining area serves both international and local meals to meet guests\' preferences. Enjoy continental breakfast, lunch, and dinner in the main building or in the garden, served by our well-trained and friendly staff.',
    images: [
      'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1554654/pexels-photo-1554654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    openingHours: 'Breakfast: 7:00 AM - 10:30 AM | Lunch: 12:30 PM - 3:00 PM | Dinner: 6:30 PM - 10:00 PM',
    type: 'dining'
  },
  {
    id: '2',
    name: 'Bar & Lounge',
    description: 'Our well-stocked bar and shared lounge offers a variety of drinks, including local options, cocktails, wines, spirits, and international beers. Relax and enjoy your drink while overlooking the spectacular view of the forest, tea plantation estate, and surrounding areas.',
    images: [
      'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    openingHours: '4:00 PM - 12:00 AM',
    type: 'bar'
  },
  {
    id: '3',
    name: 'Craft Shop',
    description: 'Visit our craft shop featuring African-style gifts including shoes, jewelry, guide books, clothes, and safari essentials.',
    images: [
      'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    openingHours: '9:00 AM - 6:00 PM',
    type: 'shop'
  },
  {
    id: '4',
    name: 'Additional Services',
    description: 'We offer various additional services including solar energy, airport pickups and drop-offs, ample parking space, laundry services, and WiFi internet access throughout the lodge.',
    images: [
      'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    openingHours: '24/7',
    type: 'services'
  }
];