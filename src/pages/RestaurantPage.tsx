import React, { useState } from 'react';
import { restaurant } from '../data/restaurant';
import Button from '../components/ui/Button';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

const RestaurantPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const menuCategories = [
    { id: 'all', name: 'All Menu' },
    { id: 'starter', name: 'Starters' },
    { id: 'main', name: 'Main Courses' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'drink', name: 'Drinks' },
  ];

  const filteredMenu = activeCategory === 'all' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === activeCategory);

  const dietaryLabels: Record<string, { color: string; bg: string }> = {
    'vegetarian': { color: 'text-green-800', bg: 'bg-green-100' },
    'vegan': { color: 'text-purple-800', bg: 'bg-purple-100' },
    'gluten-free': { color: 'text-amber-800', bg: 'bg-amber-100' },
  };

  return (
    <div className="pt-16 bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center">
        <img 
          src={restaurant.images[0]} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{restaurant.name}</h1>
            <p className="text-lg md:text-xl mb-8">{restaurant.description}</p>
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full">
              <Clock className="h-5 w-5 mr-2" />
              <span>{restaurant.openingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Menu Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Experience the flavors of Rwanda and international cuisine prepared with locally sourced ingredients.
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-green-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMenu.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    
                    {/* Dietary Labels */}
                    {item.dietary && item.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.dietary.map((diet) => (
                          <span 
                            key={diet} 
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${dietaryLabels[diet].bg} ${dietaryLabels[diet].color}`}
                          >
                            {diet}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xl font-bold text-amber-500">${item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Photos */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Restaurant & Dining</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Immerse yourself in the ambiance of our restaurant with breathtaking views and elegant decor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurant.images.map((image, index) => (
              <div 
                key={index} 
                className="h-64 relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${restaurant.name} - Image ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-[90vh]">
              <button 
                className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img src={selectedImage} alt="Restaurant" className="max-w-full max-h-[85vh] object-contain" />
            </div>
          </div>
        )}

        {/* Reservations */}
        <div className="mt-20 bg-green-800 text-white rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Make a Dining Reservation</h2>
              <p className="mb-6">
                For an unforgettable dining experience at Canopy Dining, make a reservation today.
                Our restaurant tends to book up quickly, especially during peak season.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-800">
                Reserve a Table
              </Button>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto">
              <img 
                src={restaurant.images[2] || restaurant.images[0]} 
                alt="Restaurant Dining" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about dining at Chimpanzee Lodges.
            </p>
          </div>
          
          <FAQ 
            question="Do I need to make a reservation?" 
            answer="While walk-ins are welcome, we recommend making a reservation to ensure availability, especially during dinner service and peak season. You can reserve a table online or by contacting our front desk."
          />
          
          <FAQ 
            question="Is there a dress code?" 
            answer="We maintain a smart casual dress code for dinner service. During breakfast and lunch, more casual attire is acceptable. We ask that guests do not wear beachwear or athletic wear in the restaurant."
          />
          
          <FAQ 
            question="Do you accommodate dietary restrictions?" 
            answer="Yes, our chefs are happy to accommodate dietary restrictions and allergies. Please inform us of any special requirements when making your reservation, and our team will ensure your needs are met."
          />
          
          <FAQ 
            question="Is the restaurant open to non-hotel guests?" 
            answer="Yes, our restaurant is open to both hotel guests and visitors. However, priority is given to hotel guests during peak times, so we strongly recommend reservations for non-hotel guests."
          />
        </div>
      </div>
    </div>
  );
};

interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 pr-12">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;