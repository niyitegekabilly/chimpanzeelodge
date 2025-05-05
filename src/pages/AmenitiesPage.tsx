import React, { useState } from 'react';
import { amenities } from '../data/amenities';
import { Clock, ChevronRight } from 'lucide-react';

const AmenitiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const tabs = [
    { id: 'all', name: 'All Amenities' },
    { id: 'bar', name: 'Bar' },
    { id: 'gym', name: 'Fitness Center' },
    { id: 'spa', name: 'Spa' },
    { id: 'pool', name: 'Swimming Pool' },
  ];

  const filteredAmenities = activeTab === 'all' 
    ? amenities 
    : amenities.filter(amenity => amenity.type === activeTab);

  return (
    <div className="pt-16 bg-stone-50">
      {/* Hero Section */}
      <div className="relative bg-green-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/6186815/pexels-photo-6186815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Amenities at Chimpanzee Lodges" 
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resort Amenities</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Enhance your stay with our premium amenities designed for relaxation, recreation, and rejuvenation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Amenities List */}
        <div className="space-y-16">
          {filteredAmenities.map((amenity) => (
            <div key={amenity.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full relative group cursor-pointer" onClick={() => setSelectedImage(amenity.images[0])}>
                    <img 
                      src={amenity.images[0]} 
                      alt={amenity.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                      <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white bg-opacity-90 rounded-full p-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{amenity.name}</h2>
                  
                  <div className="flex items-center text-gray-600 mb-6">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Hours: {amenity.openingHours}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-8">{amenity.description}</p>
                  
                  <div className="flex space-x-3">
                    {amenity.images.length > 1 && (
                      <div 
                        className="h-20 w-20 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-amber-500 transition-colors"
                        onClick={() => setSelectedImage(amenity.images[1])}
                      >
                        <img 
                          src={amenity.images[1]} 
                          alt={`${amenity.name} - Image 2`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Enhance your stay with our premium services tailored to your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              title="Forest Tours" 
              description="Guided tours through Nyungwe National Park, including chimpanzee tracking, bird watching, and canopy walks."
              imageUrl="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            
            <ServiceCard 
              title="In-Room Dining" 
              description="Enjoy our restaurant's delicious offerings in the comfort and privacy of your own room, available 24/7."
              imageUrl="https://images.pexels.com/photos/4552047/pexels-photo-4552047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            
            <ServiceCard 
              title="Transportation Services" 
              description="Airport transfers, local excursions, and custom tours arranged by our concierge team."
              imageUrl="https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
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
            <img src={selectedImage} alt="Amenity" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <div className="h-48">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <a 
          href="#" 
          className="inline-flex items-center text-green-800 font-medium hover:text-green-700"
        >
          Learn more
          <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default AmenitiesPage;