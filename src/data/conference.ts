import { ConferenceRoom } from '../types';

export const conferenceRooms: ConferenceRoom[] = [
  {
    id: '1',
    name: 'Canopy Boardroom',
    capacity: 12,
    description: 'An intimate boardroom with forest views, perfect for executive meetings and small gatherings. Features state-of-the-art presentation equipment and comfortable seating.',
    amenities: [
      'High-speed WiFi',
      'Video conferencing system',
      'Interactive smart board',
      'Climate control',
      'Coffee and refreshment service',
      'Natural lighting',
      'Executive chairs'
    ],
    pricePerHour: 80,
    images: [
      'https://images.pexels.com/photos/2166456/pexels-photo-2166456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1668928/pexels-photo-1668928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  },
  {
    id: '2',
    name: 'Forest Hall',
    capacity: 50,
    description: 'A versatile medium-sized conference room suitable for workshops, training sessions, and presentations. Can be configured in various seating arrangements to suit your needs.',
    amenities: [
      'High-speed WiFi',
      'Projector and screen',
      'Surround sound system',
      'Climate control',
      'Flexible seating arrangements',
      'Full catering options',
      'Breakout areas'
    ],
    pricePerHour: 150,
    images: [
      'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  },
  {
    id: '3',
    name: 'Nyungwe Grand Ballroom',
    capacity: 200,
    description: 'Our largest event space, perfect for conferences, gala dinners, and large corporate events. Features panoramic views of the forest and state-of-the-art facilities.',
    amenities: [
      'High-speed WiFi',
      'Advanced AV equipment',
      'Integrated sound system',
      'Stage with lighting',
      'Dance floor',
      'Full-service bar',
      'Customizable lighting',
      'Separate entrance',
      'VIP green room'
    ],
    pricePerHour: 300,
    images: [
      'https://images.pexels.com/photos/3201766/pexels-photo-3201766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3075547/pexels-photo-3075547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  },
  {
    id: '4',
    name: 'Garden Pavilion',
    capacity: 80,
    description: 'A unique indoor-outdoor space surrounded by our tropical gardens. Ideal for receptions, product launches, and special events with a natural backdrop.',
    amenities: [
      'High-speed WiFi',
      'Weather protection',
      'Garden lighting',
      'Portable AV equipment',
      'Private bar setup',
      'Outdoor furniture',
      'Heaters for evening events'
    ],
    pricePerHour: 200,
    images: [
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  }
];