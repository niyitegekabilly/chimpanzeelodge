import { Restaurant } from '../types';

export const restaurant: Restaurant = {
  name: 'Chimpanzee Lodge Dining',
  description: 'Our dining area serves a variety of international and local meals to meet guests\' preferences. Enjoy continental breakfast, lunch, and dinner in the main building or in the garden, served by our well-trained and friendly staff. You can have meals in any place of your choice, either in the forest or dining areas.',
  openingHours: 'Breakfast: 7:00 AM - 10:30 AM | Lunch: 12:30 PM - 3:00 PM | Dinner: 6:30 PM - 10:00 PM',
  images: [
    '/images/restaurant/restaurant-1.jpg',
    '/images/restaurant/restaurant-2.jpg',
    '/images/restaurant/restaurant-3.jpg'
  ],
  menu: [
    { id: 'b1', name: 'Continental Breakfast', description: 'A selection of pastries, cereals, fruits, and hot beverages.', price: 15, category: 'breakfast', dietary: [] },
    { id: 'b2', name: 'Local Breakfast Options', description: 'Traditional Rwandan breakfast dishes.', price: 12, category: 'breakfast', dietary: [] },
    { id: 'b3', name: 'Fresh Fruits', description: 'Seasonal fresh fruit platter.', price: 8, category: 'breakfast', dietary: ['vegan', 'gluten-free'] },
    { id: 'l1', name: 'International Cuisine', description: 'A variety of international dishes.', price: 25, category: 'main', dietary: [] },
    { id: 'l2', name: 'Local Specialties', description: 'Authentic Rwandan meals.', price: 20, category: 'main', dietary: [] },
    { id: 'l3', name: 'Vegetarian Options', description: 'Delicious vegetarian main courses.', price: 18, category: 'main', dietary: ['vegetarian'] },
    { id: 'd1', name: 'Desserts', description: 'Selection of sweet treats.', price: 10, category: 'dessert', dietary: [] },
    { id: 'dr1', name: 'Hot Beverages', description: 'Coffee, tea, and hot chocolate.', price: 4, category: 'drink', dietary: [] },
    { id: 'dr2', name: 'Juices and Soft Drinks', description: 'Fresh juices and sodas.', price: 5, category: 'drink', dietary: [] },
    { id: 'dr3', name: 'Alcoholic Beverages', description: 'Selection of beers, wines, and spirits.', price: 8, category: 'drink', dietary: [] },
  ]
};