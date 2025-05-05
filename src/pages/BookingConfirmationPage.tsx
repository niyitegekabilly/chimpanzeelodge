import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Users, CreditCard } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import Button from '../components/ui/Button';

const BookingConfirmationPage: React.FC = () => {
  const { bookings, selectedRoom, checkInDate, checkOutDate, guests, calculateTotalPrice } = useBooking();
  
  // Get the most recent booking
  const latestBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;
  
  if (!latestBooking || !selectedRoom || !checkInDate || !checkOutDate) {
    return (
      <div className="pt-16 min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking found</h2>
          <p className="text-gray-600 mb-6">It seems you haven't made a booking yet.</p>
          <Link to="/rooms">
            <Button>Browse Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-10 w-10 text-green-800" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-gray-700">
              Your booking has been successfully confirmed. We look forward to welcoming you to Chimpanzee Lodges.
            </p>
          </div>
          
          <div className="bg-green-50 rounded-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-green-800 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Dates</div>
                    <div className="font-medium">
                      {checkInDate.toLocaleDateString()} to {checkOutDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-green-800 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Guests</div>
                    <div className="font-medium">{guests} {guests === 1 ? 'guest' : 'guests'}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-green-800 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                    <div className="font-medium">${calculateTotalPrice()}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">Room</div>
                <div className="flex mb-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img 
                      src={selectedRoom.images[0]} 
                      alt={selectedRoom.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{selectedRoom.name}</h3>
                    <div className="text-sm text-gray-600 mt-1 capitalize">
                      {selectedRoom.type} · {selectedRoom.view} view
                    </div>
                    <div className="text-sm text-amber-600 mt-1 font-medium">
                      ${selectedRoom.price}/night
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  Booking Reference: <span className="font-medium text-gray-900">{latestBooking.id.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next</h2>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-800 font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Confirmation Email</h3>
                  <p className="text-gray-600">
                    A confirmation email has been sent to your email address with all the details of your booking.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-800 font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Check-In Information</h3>
                  <p className="text-gray-600">
                    Check-in time starts at 2:00 PM. Please bring a valid ID and the credit card used for booking.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-800 font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Need Assistance?</h3>
                  <p className="text-gray-600">
                    If you have any questions or need to modify your reservation, please contact our front desk at +250 788 123 456.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4">
            <Link to="/my-bookings">
              <Button className="w-full sm:w-auto mb-4 sm:mb-0">
                View My Bookings
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;