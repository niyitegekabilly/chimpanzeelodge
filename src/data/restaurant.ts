import { Restaurant } from '../types';

export const restaurant: Restaurant = {
  name: 'Canopy Dining',
  description: 'Experience fine dining with a view at our signature restaurant. Our menu features locally sourced ingredients and international cuisine, expertly prepared by our award-winning chefs. Enjoy your meal while overlooking the lush Nyungwe Forest.',
  openingHours: 'Breakfast: 7:00 AM - 10:30 AM | Lunch: 12:30 PM - 3:00 PM | Dinner: 6:30 PM - 10:00 PM',
  images: [
    'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ],
  menu: [
    {
      id: '1',
      name: 'Forest Mushroom Soup',
      description: 'Creamy soup made with locally foraged wild mushrooms and fresh herbs',
      price: 12,
      category: 'starter',
      dietary: ['vegetarian', 'gluten-free']
    },
    {
      id: '2',
      name: 'Rwandan Sambaza',
      description: 'Lake Kivu sardines fried with local spices, served with lime and chili sauce',
      price: 15,
      category: 'starter'
    },
    {
      id: '3',
      name: 'Grilled Mountain Trout',
      description: 'Locally caught trout grilled to perfection, served with seasonal vegetables and herb butter',
      price: 28,
      category: 'main',
      dietary: ['gluten-free']
    },
    {
      id: '4',
      name: 'Nyungwe Forest Risotto',
      description: 'Creamy risotto with wild mushrooms, truffle oil, and seasonal vegetables',
      price: 24,
      category: 'main',
      dietary: ['vegetarian', 'gluten-free']
    },
    {
      id: '5',
      name: 'Slow-Roasted Coffee-Rubbed Beef',
      description: 'Locally raised beef with a rub of Rwandan coffee, served with roasted root vegetables',
      price: 32,
      category: 'main'
    },
    {
      id: '6',
      name: 'Rwandan Banana Cake',
      description: 'Traditional banana cake served with honey ice cream and caramelized bananas',
      price: 10,
      category: 'dessert',
      dietary: ['vegetarian']
    },
    {
      id: '7',
      name: 'Passion Fruit Pavlova',
      description: 'Light meringue topped with passion fruit cream and fresh tropical fruits',
      price: 12,
      category: 'dessert',
      dietary: ['vegetarian', 'gluten-free']
    },
    {
      id: '8',
      name: 'Rwandan Coffee',
      description: 'Locally grown and roasted premium coffee',
      price: 4,
      category: 'drink',
      dietary: ['vegan', 'gluten-free']
    },
    {
      id: '9',
      name: 'Forest Berry Mojito',
      description: 'Refreshing cocktail with wild berries, mint, lime, and rum',
      price: 12,
      category: 'drink',
      dietary: ['vegan', 'gluten-free']
    }
  ]
};