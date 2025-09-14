import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Users, Check, Phone, MessageCircle } from 'lucide-react';
import { rooms } from '../data/rooms';
import Button from '../components/ui/Button';
import { useBooking } from '../contexts/BookingContext';

const RoomsPage: React.FC = () => {
  const { checkInDate, checkOutDate, guests, isRoomAvailable } = useBooking();
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as string[],
    views: [] as string[],
    minPrice: '',
    maxPrice: '',
    capacity: guests || 1
  });

  useEffect(() => {
    applyFilters();
  }, [filters, checkInDate, checkOutDate]);

  const applyFilters = () => {
    let filtered = [...rooms];
    
    // Filter by room type
    if (filters.types.length > 0) {
      filtered = filtered.filter(room => filters.types.includes(room.type));
    }
    
    // Filter by view
    if (filters.views.length > 0) {
      filtered = filtered.filter(room => filters.views.includes(room.view));
    }
    
    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(room => room.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(room => room.price <= parseInt(filters.maxPrice));
    }
    
    // Filter by capacity
    filtered = filtered.filter(room => room.capacity >= filters.capacity);
    
    // Filter by availability if dates are selected
    if (checkInDate && checkOutDate) {
      filtered = filtered.filter(room => isRoomAvailable(room.id, checkInDate, checkOutDate));
    }
    
    setFilteredRooms(filtered);
  };

  const toggleFilter = (category: 'types' | 'views', value: string) => {
    setFilters(prev => {
      const current = [...prev[category]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [category]: current
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      views: [],
      minPrice: '',
      maxPrice: '',
      capacity: guests || 1
    });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '+250788467700';
    const message = encodeURIComponent('Hello! I would like to inquire about room availability and pricing. Could you please share your current offers?');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-16 bg-stone-50">
      {/* Hero Section */}
      <div className="relative bg-green-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Rooms at Chimpanzee Lodges" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Accommodations</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Discover our range of rooms and suites, each designed to provide comfort, luxury, and unforgettable views of Nyungwe National Park.
          </p>
          
          {/* Contact Section */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Need Help with Pricing?</h3>
              <p className="text-gray-200 text-sm">Contact us for current rates and special offers</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                +250 788 467 700
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 font-medium"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp for Deals
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Filter Rooms</h2>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm font-medium text-green-800 hover:text-green-700"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {showFilters && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Room Type */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Room Type</h3>
                <div className="space-y-2">
                  {['standard', 'deluxe', 'suite'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type)}
                        onChange={() => toggleFilter('types', type)}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* View */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">View</h3>
                <div className="space-y-2">
                  {['forest', 'garden', 'mountain'].map((view) => (
                    <label key={view} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.views.includes(view)}
                        onChange={() => toggleFilter('views', view)}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 capitalize">{view}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="sr-only">Min Price</label>
                    <input
                      type="number"
                      placeholder="Min $"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="sr-only">Max Price</label>
                    <input
                      type="number"
                      placeholder="Max $"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Guests */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Guests</h3>
                <div className="relative">
                  <select
                    value={filters.capacity}
                    onChange={(e) => setFilters({...filters, capacity: parseInt(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'} or more
                      </option>
                    ))}
                  </select>
                  <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {/* Filter Actions */}
              <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Clear Filters
                </button>
                <button
                  onClick={applyFilters}
                  className="text-sm font-medium text-white bg-green-800 hover:bg-green-700 px-4 py-2 rounded-md"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {filteredRooms.length} {filteredRooms.length === 1 ? 'Room' : 'Rooms'} Available
            {checkInDate && checkOutDate && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                for your selected dates
              </span>
            )}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRooms.map((room) => (
              <div key={room.id} className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden">
                <div className="md:w-2/5 h-64 md:h-auto">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                    {/* Display price range or a label */}
                    {/* <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      From ${room.price}/night
                    </span> */}
                  </div>
                  
                  {/* Display different rate options */}
                  <div className="mt-2 mb-4 text-sm text-gray-800">
                    <p><span className="font-semibold">BB:</span> ${room.price}/night</p>
                    {room.priceHalfBoard && <p><span className="font-semibold">HB:</span> ${room.priceHalfBoard}/night</p>}
                    {room.priceFullBoard && <p><span className="font-semibold">FB:</span> ${room.priceFullBoard}/night</p>}
                  </div>

                  <p className="text-gray-700 mt-2">{room.description.substring(0, 100)}...</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Up to {room.capacity} guests</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>{room.size} m²</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-600">
                        <Check className="h-3 w-3 mr-1 text-green-700" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                    {room.amenities.length > 3 && (
                      <div className="text-xs text-gray-600">
                        +{room.amenities.length - 3} more
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <Link to={`/rooms/${room.id}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                    {/* Change Book Now button to link to Room Detail page */}
                    <Link to={`/rooms/${room.id}`}> 
                      <Button size="sm">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No rooms match your criteria</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or dates to find available rooms.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Accommodations</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Discover our range of rooms and suites, each designed to provide comfort, luxury, and unforgettable views of Nyungwe National Park.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          All rates are in USD and include 18% tax, all meals, and selected local beverages.
        </p>
      </div>
    </div>
  );
};

export default RoomsPage;