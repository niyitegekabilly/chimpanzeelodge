import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Coffee, Users } from 'lucide-react';
import { rooms } from '../data/rooms';
import { useBooking } from '../contexts/BookingContext';
import Button from '../components/ui/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HomePage: React.FC = () => {
  const { setCheckInDate, setCheckOutDate, setGuests } = useBooking();
  const [localCheckIn, setLocalCheckIn] = useState<Date | null>(null);
  const [localCheckOut, setLocalCheckOut] = useState<Date | null>(null);
  const [localGuests, setLocalGuests] = useState(1);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  const handleSearch = () => {
    setCheckInDate(localCheckIn);
    setCheckOutDate(localCheckOut);
    setGuests(localGuests);
  };

  // Featured rooms (showing 3)
  const featuredRooms = rooms.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center flex items-center" 
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundPosition: 'center 30%' 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className={`transition-all duration-1000 transform ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to <br />
              <span className="text-amber-400">Chimpanzee Lodge Nyungwe</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              A 3-star mid-range accommodation nestled 4km from Karamba Hiking trails in southwestern Rwanda, 
              offering comfortable stays and unforgettable chimpanzee tracking experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button size="lg" onClick={() => {}}>
                Explore Our Rooms
              </Button>
              <Button variant="outline" size="lg" onClick={() => {}}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Booking Form */}
        <div className="absolute bottom-0 left-0 right-0 z-20 transform translate-y-1/2">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Check In</label>
                  <div className="relative">
                    <DatePicker 
                      selected={localCheckIn}
                      onChange={(date) => setLocalCheckIn(date)}
                      selectsStart
                      startDate={localCheckIn}
                      endDate={localCheckOut}
                      minDate={new Date()}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholderText="Select date"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Check Out</label>
                  <div className="relative">
                    <DatePicker 
                      selected={localCheckOut}
                      onChange={(date) => setLocalCheckOut(date)}
                      selectsEnd
                      startDate={localCheckIn}
                      endDate={localCheckOut}
                      minDate={localCheckIn || new Date()}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholderText="Select date"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Guests</label>
                  <div className="relative">
                    <select
                      value={localGuests}
                      onChange={(e) => setLocalGuests(parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Link to="/rooms" className="w-full" onClick={handleSearch}>
                    <Button fullWidth size="lg">
                      Search Rooms
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for booking form */}
      <div className="h-24 md:h-32"></div>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img 
                src="https://images.pexels.com/photos/5039367/pexels-photo-5039367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Chimpanzee Lodges" 
                className="rounded-lg shadow-lg object-cover h-[500px] w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-green-800">Chimpanzee Lodge Nyungwe</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Located just 4km from the vast Nyungwe Forest National Park in southwestern Rwanda, our lodge offers 
                convenient access to chimpanzee tracking activities and forest canopy experiences. The lodge is easily 
                accessible by road from Kigali International Airport (4-5 hours) or by domestic flight to Kamembe airstrip 
                followed by a one-hour transfer.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our lodge features 12 comfortable and spacious rooms overlooking the forest canopy, reflecting modern 
                building style with high levels of comfort. Each room is well-decorated and furnished with private 
                en-suite facilities, including flushing toilets, hot and cold showers, mosquito nets, and more.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-800" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Prime Location</h3>
                    <p className="text-base text-gray-600">Next to Nyungwe Forest</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-green-800" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Fine Dining</h3>
                    <p className="text-base text-gray-600">Local & international cuisine</p>
                  </div>
                </div>
              </div>
              <Button>Learn More About Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Accommodations</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Experience the perfect blend of luxury and nature with our carefully designed rooms and suites.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${room.price}/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link to={`/rooms/${room.id}`}>
                    <Button fullWidth>View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/rooms">
              <Button variant="outline">View All Rooms</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
            <p className="text-lg text-green-100 max-w-3xl mx-auto">
              Don't just take our word for it - here's what guests have to say about their stay at Chimpanzee Lodges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-700 rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Sarah Johnson</h3>
                  <p className="text-green-200">United States</p>
                </div>
              </div>
              <p className="text-green-100 mb-4">
                "The most incredible experience of my life. The staff went above and beyond, the room was beautiful, and the food was outstanding. The guided chimpanzee trek was unforgettable!"
              </p>
              <div className="flex text-amber-400">
                ★★★★★
              </div>
            </div>
            
            <div className="bg-green-700 rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Michael Thompson</h3>
                  <p className="text-green-200">United Kingdom</p>
                </div>
              </div>
              <p className="text-green-100 mb-4">
                "A perfect blend of luxury and nature. The views from our suite were breathtaking, and we loved falling asleep to the sounds of the forest. The infinity pool is a must-experience!"
              </p>
              <div className="flex text-amber-400">
                ★★★★★
              </div>
            </div>
            
            <div className="bg-green-700 rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl">
                  L
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Leila Nguyen</h3>
                  <p className="text-green-200">Australia</p>
                </div>
              </div>
              <p className="text-green-100 mb-4">
                "The restaurant deserves special mention - some of the best food I've had anywhere in the world. The attention to detail throughout the lodge is impressive. We're already planning our return!"
              </p>
              <div className="flex text-amber-400">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;