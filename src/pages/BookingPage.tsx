import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, CreditCard, Check, ChevronRight, Info } from 'lucide-react';
import { rooms } from '../data/rooms';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const { 
    selectedRoom, 
    checkInDate, 
    checkOutDate, 
    guests, 
    setSelectedRoom,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
    addBooking,
    calculateTotalPrice,
    isRoomAvailable
  } = useBooking();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'credit-card'
  });
  
  // Extract roomId from query parameters if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomId = params.get('roomId');
    
    if (roomId) {
      const room = rooms.find(r => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
      }
    }
  }, [location, setSelectedRoom]);
  
  // Redirect to login if not authenticated when trying to complete booking
  useEffect(() => {
    if (step === 3 && !isAuthenticated) {
      navigate('/login');
    }
  }, [step, isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue = () => {
    if (step === 1) {
      // Validate step 1
      if (!selectedRoom || !checkInDate || !checkOutDate || !guests) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Check if room is available for selected dates
      if (!isRoomAvailable(selectedRoom.id, checkInDate, checkOutDate)) {
        alert('This room is not available for the selected dates');
        return;
      }
    } else if (step === 2) {
      // Validate step 2
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!selectedRoom || !checkInDate || !checkOutDate) return;
    
    // Create booking
    const newBooking = {
      id: Math.random().toString(36).substring(2, 9),
      userId: '1', // In a real app, this would be the authenticated user's ID
      roomId: selectedRoom.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice: calculateTotalPrice(),
      status: 'confirmed' as const,
      createdAt: new Date()
    };
    
    addBooking(newBooking);
    navigate('/booking-confirmation');
  };

  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Book Your Stay</h1>
          
          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between">
              <div className="flex-1 text-center">
                <div className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center ${
                  step >= 1 ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <span>1</span>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-700">Dates & Room</div>
              </div>
              <div className="flex-1 text-center">
                <div className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center ${
                  step >= 2 ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <span>2</span>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-700">Guest Details</div>
              </div>
              <div className="flex-1 text-center">
                <div className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center ${
                  step >= 3 ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <span>3</span>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-700">Confirmation</div>
              </div>
            </div>
            <div className="mt-2 mb-8 relative">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-green-800 transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Step 1: Dates & Room Selection */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Dates & Room</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                      <div className="relative">
                        <DatePicker 
                          selected={checkInDate}
                          onChange={(date) => setCheckInDate(date)}
                          selectsStart
                          startDate={checkInDate}
                          endDate={checkOutDate}
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
                          selected={checkOutDate}
                          onChange={(date) => setCheckOutDate(date)}
                          selectsEnd
                          startDate={checkInDate}
                          endDate={checkOutDate}
                          minDate={checkInDate || new Date()}
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
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
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
                  </div>
                  
                  {checkInDate && checkOutDate && (
                    <div className="bg-green-50 p-4 rounded-md mb-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-green-800 mr-2 mt-0.5" />
                        <p className="text-sm text-green-800">
                          {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights selected. 
                          Please choose a room to continue.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select a Room Type
                    {selectedRoom && <span className="text-green-800 ml-2">- {selectedRoom.name}</span>}
                  </label>
                  
                  <div className="space-y-4">
                    {rooms.map((room) => (
                      <div 
                        key={room.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedRoom?.id === room.id 
                            ? 'border-green-800 bg-green-50' 
                            : 'border-gray-200 hover:border-green-800'
                        }`}
                        onClick={() => {
                          if (checkInDate && checkOutDate && !isRoomAvailable(room.id, checkInDate, checkOutDate)) {
                            alert('This room is not available for the selected dates');
                            return;
                          }
                          setSelectedRoom(room);
                        }}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{room.name}</h3>
                            <p className="text-sm text-gray-600">Up to {room.capacity} guests</p>
                          </div>
                          <div className="text-amber-600 font-medium">${room.price}/night</div>
                        </div>
                        
                        {selectedRoom?.id === room.id && (
                          <div className="mt-2 flex justify-end">
                            <Check className="h-5 w-5 text-green-800" />
                          </div>
                        )}
                        
                        {checkInDate && checkOutDate && !isRoomAvailable(room.id, checkInDate, checkOutDate) && (
                          <div className="mt-2 text-red-600 text-sm">Not available for selected dates</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Price Calculation */}
              {selectedRoom && checkInDate && checkOutDate && (
                <div className="bg-gray-50 p-6 rounded-md mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Price Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      ${selectedRoom.price} x {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights
                    </span>
                    <span className="text-gray-900 font-medium">
                      ${selectedRoom.price * Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${calculateTotalPrice()}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleContinue}
                  disabled={!selectedRoom || !checkInDate || !checkOutDate || !guests}
                >
                  Continue
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Guest Details */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea 
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  ></textarea>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300"
                    />
                    <span className="ml-2 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                      Pay at check-in with credit card
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300"
                    />
                    <span className="ml-2">Pay at check-in with cash</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleContinue}>
                  Continue
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {step === 3 && selectedRoom && checkInDate && checkOutDate && (
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Confirmation</h2>
              
              <div className="bg-green-50 p-4 rounded-md mb-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-green-800 mr-2 mt-0.5" />
                  <p className="text-sm text-green-800">
                    Please review your booking details below before confirming. You won't be charged until check-in.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Booking Details</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Check In</div>
                        <div className="font-medium">{checkInDate.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Check Out</div>
                        <div className="font-medium">{checkOutDate.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Guests</div>
                        <div className="font-medium">{guests}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Nights</div>
                        <div className="font-medium">
                          {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mt-6 mb-3">Guest Information</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <div className="text-sm text-gray-500">Name</div>
                        <div className="font-medium">{formData.firstName} {formData.lastName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium">{formData.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">{formData.phone}</div>
                      </div>
                      {formData.specialRequests && (
                        <div>
                          <div className="text-sm text-gray-500">Special Requests</div>
                          <div className="font-medium">{formData.specialRequests}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-gray-500">Payment Method</div>
                        <div className="font-medium capitalize">
                          {formData.paymentMethod === 'credit-card' ? 'Credit Card at check-in' : 'Cash at check-in'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Room Details</h3>
                  <div className="bg-gray-50 rounded-md p-4 mb-6">
                    <div className="flex mb-4">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={selectedRoom.images[0]} 
                          alt={selectedRoom.name} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">{selectedRoom.name}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          {selectedRoom.capacity} guests · {selectedRoom.size} m²
                        </div>
                        <div className="text-sm text-gray-600 mt-1 capitalize">
                          {selectedRoom.type} · {selectedRoom.view} view
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">Amenities</div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedRoom.amenities.slice(0, 6).map((amenity, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-700">
                          <Check className="h-3 w-3 mr-1 text-green-700" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                      {selectedRoom.amenities.length > 6 && (
                        <div className="text-xs text-gray-700">
                          +{selectedRoom.amenities.length - 6} more
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-3">Price Summary</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">
                        ${selectedRoom.price} x {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights
                      </span>
                      <span className="text-gray-900 font-medium">
                        ${selectedRoom.price * Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${calculateTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit}>
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;