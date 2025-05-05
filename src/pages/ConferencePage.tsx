import React, { useState } from 'react';
import { conferenceRooms } from '../data/conference';
import Button from '../components/ui/Button';
import { Users, Check, Calendar, Mail, Phone } from 'lucide-react';

const ConferencePage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleRoomSelect = (id: string) => {
    setSelectedRoom(id === selectedRoom ? null : id);
  };

  const room = selectedRoom ? conferenceRooms.find(r => r.id === selectedRoom) : null;

  return (
    <div className="pt-16 bg-stone-50">
      {/* Hero Section */}
      <div className="relative bg-green-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Conference Facilities" 
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference & Event Facilities</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Host unforgettable meetings and events with state-of-the-art facilities in a breathtaking natural setting.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <div className="mb-16">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img 
                src="https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Conference Facilities" 
                className="rounded-lg shadow-lg h-[400px] w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Perfect Venue for Your Next Event
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Chimpanzee Lodges offers exceptional conference and event facilities in the heart of Rwanda's 
                lush Nyungwe Forest. Whether you're planning a corporate retreat, a strategic meeting, or a 
                special celebration, our versatile spaces and dedicated team ensure a seamless experience.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                All of our meeting rooms feature modern technology, comfortable furnishings, and stunning views. 
                Our experienced events team will assist with every detail, from room setup to catering options tailored to your needs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">High-speed WiFi</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Modern AV equipment</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Catering services</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-800" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Event planning assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conference Rooms Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Conference Spaces</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Explore our range of versatile meeting spaces designed to accommodate groups of all sizes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conferenceRooms.map((conferenceRoom) => (
              <div 
                key={conferenceRoom.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
                  selectedRoom === conferenceRoom.id ? 'ring-2 ring-green-800 transform scale-[1.02]' : 'hover:shadow-lg'
                }`}
                onClick={() => handleRoomSelect(conferenceRoom.id)}
              >
                <div className="h-48">
                  <img 
                    src={conferenceRoom.images[0]} 
                    alt={conferenceRoom.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{conferenceRoom.name}</h3>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Up to {conferenceRoom.capacity} people</span>
                  </div>
                  <div className="mt-2 text-amber-600 font-medium">
                    ${conferenceRoom.pricePerHour}/hour
                  </div>
                  <button 
                    className="mt-3 text-sm text-green-800 font-medium hover:text-green-700 focus:outline-none"
                  >
                    {selectedRoom === conferenceRoom.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Selected Room Details */}
          {room && (
            <div className="mt-12 bg-white rounded-lg shadow-lg p-6 lg:p-8 transition-all duration-300">
              <div className="lg:flex">
                <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{room.name}</h3>
                  <p className="text-gray-700 mb-6">{room.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Amenities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-700 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-gray-600">Capacity</span>
                      <span className="text-xl font-medium text-gray-900">{room.capacity} people</span>
                    </div>
                    <div>
                      <span className="block text-gray-600">Price</span>
                      <span className="text-xl font-medium text-amber-600">${room.pricePerHour}/hour</span>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="grid grid-cols-2 gap-4">
                    {room.images.map((image, index) => (
                      <div 
                        key={index} 
                        className="h-40 rounded-lg overflow-hidden cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(image);
                        }}
                      >
                        <img 
                          src={image} 
                          alt={`${room.name} - Image ${index + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button fullWidth onClick={() => {/* Implement booking modal */}}>
                      Book This Space
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Event Types */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Event Types We Host</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From corporate retreats to special celebrations, our versatile spaces can be customized for any occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48">
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Corporate Meetings" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Corporate Meetings</h3>
                <p className="text-gray-700">
                  From boardroom meetings to full-scale conferences, our facilities provide the perfect professional environment.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48">
                <img 
                  src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Team Retreats" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Team Retreats</h3>
                <p className="text-gray-700">
                  Combine work and wellness with team-building activities in our stunning natural surroundings.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48">
                <img 
                  src="https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Special Events" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Special Celebrations</h3>
                <p className="text-gray-700">
                  Create unforgettable memories with weddings, anniversaries, and other special occasions in our elegant spaces.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="mt-20 bg-green-800 text-white rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Plan Your Event</h2>
              <p className="mb-8">
                Contact our events team to discuss your requirements and check availability.
                We'll help you plan every detail to ensure your event is a success.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>events@chimpanzeelodges.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>+250 788 123 456</span>
                </div>
              </div>
              
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-800">
                Request Information
              </Button>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Event Planning" 
                className="w-full h-full object-cover"
              />
            </div>
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
            <img src={selectedImage} alt="Conference Room" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferencePage;