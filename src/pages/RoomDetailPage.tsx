import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Calendar, Info, Users, Phone, MessageCircle } from 'lucide-react';
import { rooms } from '../data/rooms';
import { useBooking } from '../contexts/BookingContext';
import Button from '../components/ui/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const room = rooms.find(r => r.id === id);
  const { 
    setSelectedRoom, 
    setCheckInDate, 
    setCheckOutDate, 
    setGuests, 
    isRoomAvailable, 
    selectedBoard,
    setSelectedBoard
  } = useBooking();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [localCheckIn, setLocalCheckIn] = useState<Date | null>(null);
  const [localCheckOut, setLocalCheckOut] = useState<Date | null>(null);
  const [localGuests, setLocalGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (room) {
      document.title = `${room.name} - Chimpanzee Lodges`;
    }
    
    return () => {
      document.title = 'Chimpanzee Lodges';
    };
  }, [room]);

  useEffect(() => {
    if (localCheckIn && localCheckOut && room) {
      setIsAvailable(isRoomAvailable(room.id, localCheckIn, localCheckOut));
    } else {
      setIsAvailable(true);
    }
  }, [localCheckIn, localCheckOut, room, isRoomAvailable]);

  const nextImage = () => {
    if (!room) return;
    setCurrentImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!room) return;
    setCurrentImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '+250788467700';
    const message = encodeURIComponent(`Hello! I'm interested in the ${room?.name || 'room'}. Could you please share current availability and pricing?`);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBookNow = () => {
    if (!room || !localCheckIn || !localCheckOut) return;
    
    setSelectedRoom(room);
    setCheckInDate(localCheckIn);
    setCheckOutDate(localCheckOut);
    setGuests(localGuests);
  };

  if (!room) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h2>
          <p className="text-gray-600 mb-6">The room you're looking for doesn't exist or has been removed.</p>
          <Link to="/rooms">
            <Button>View All Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-stone-50">
      {/* Room Gallery */}
      <div className="relative h-96 md:h-[500px] bg-black">
        <img
          src={room.images[currentImageIndex]}
          alt={`${room.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {room.images.length}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:gap-8">
          {/* Room Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{room.name}</h1>
                <div className="mt-2 sm:mt-0 bg-amber-500 text-white px-4 py-2 rounded-full text-lg font-medium">
                  ${
                    selectedBoard === 'BB' ? room.price : 
                    selectedBoard === 'HB' ? room.priceHalfBoard : 
                    room.priceFullBoard
                  }/night
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Room Type</span>
                  <span className="text-gray-900 capitalize">{room.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">View</span>
                  <span className="text-gray-900 capitalize">{room.view}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Size</span>
                  <span className="text-gray-900">{room.size} m²</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Max Guests</span>
                  <span className="text-gray-900">{room.capacity} people</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{room.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-700 mr-2" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Location & View</h2>
              <p className="text-gray-700 mb-6">
                This {room.type} room offers stunning views of the {room.view}, 
                immersing you in the natural beauty of Nyungwe National Park. 
                Located in the {room.view === 'garden' ? 'central' : room.view === 'forest' ? 'eastern' : 'western'} wing of the lodge, 
                it provides easy access to all of our amenities.
              </p>
              
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={room.images[1] || room.images[0]}
                  alt={`${room.name} - View`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Rate Options</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Select Your Board:</h3>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-green-800"
                        name="boardOption"
                        value="BB"
                        checked={selectedBoard === 'BB'}
                        onChange={() => setSelectedBoard('BB')}
                      />
                      <span className="ml-2 text-gray-700">Bed and Breakfast (${room.price}/night)</span>
                    </label>
                    {room.priceHalfBoard && (
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-green-800"
                          name="boardOption"
                          value="HB"
                          checked={selectedBoard === 'HB'}
                          onChange={() => setSelectedBoard('HB')}
                        />
                        <span className="ml-2 text-gray-700">Half Board (${room.priceHalfBoard}/night)</span>
                      </label>
                    )}
                    {room.priceFullBoard && (
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-green-800"
                          name="boardOption"
                          value="FB"
                          checked={selectedBoard === 'FB'}
                          onChange={() => setSelectedBoard('FB')}
                        />
                        <span className="ml-2 text-gray-700">Full Board (${room.priceFullBoard}/night)</span>
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Children's Rates:</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Ages 14 and above: Adult rate applies</li>
                    <li>• Ages 5-14: 50% of adult sharing rate</li>
                    <li>• Under 5 years: Free of charge</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Widget */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Book This Room</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <div className="relative">
                    <select
                      value={localGuests}
                      onChange={(e) => setLocalGuests(parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 appearance-none"
                    >
                      {Array.from({ length: room.capacity }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Price Calculation */}
              {localCheckIn && localCheckOut && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Price Details</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      ${
                         selectedBoard === 'BB' ? room.price : 
                         selectedBoard === 'HB' ? room.priceHalfBoard : 
                         room.priceFullBoard
                      } x {Math.ceil((localCheckOut.getTime() - localCheckIn.getTime()) / (1000 * 60 * 60 * 24))} nights
                    </span>
                    <span className="text-gray-900 font-medium">
                      ${
                        (selectedBoard === 'BB' ? room.price : 
                         selectedBoard === 'HB' ? room.priceHalfBoard : 
                         room.priceFullBoard) * Math.ceil((localCheckOut.getTime() - localCheckIn.getTime()) / (1000 * 60 * 60 * 24))
                      }
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>
                      ${
                        (selectedBoard === 'BB' ? room.price : 
                         selectedBoard === 'HB' ? room.priceHalfBoard : 
                         room.priceFullBoard) * Math.ceil((localCheckOut.getTime() - localCheckIn.getTime()) / (1000 * 60 * 60 * 24))
                      }
                    </span>
                  </div>
                </div>
              )}
              
              {/* Availability Warning */}
              {!isAvailable && (
                <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6 flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Room not available for selected dates</p>
                    <p className="text-sm">Please select different dates or check other rooms.</p>
                  </div>
                </div>
              )}
              
              <Link 
                to={isAvailable ? `/booking?roomId=${room.id}` : '#'} 
                onClick={isAvailable ? handleBookNow : (e) => e.preventDefault()}
                className={!isAvailable ? 'pointer-events-none' : ''}
              >
                <Button 
                  fullWidth 
                  disabled={!localCheckIn || !localCheckOut || !isAvailable}
                >
                  Book Now
                </Button>
              </Link>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                You won't be charged yet. Payment will be collected at check-in.
              </p>
              
              {/* Contact Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 text-center">Need Help?</h3>
                <p className="text-xs text-gray-600 mb-4 text-center">Contact us for pricing and availability</p>
                <div className="space-y-2">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    +250 788 467 700
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp for Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;