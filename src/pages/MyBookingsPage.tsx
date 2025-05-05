import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { rooms } from '../data/rooms';
import Button from '../components/ui/Button';

const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const getRoom = (roomId: string) => {
    return rooms.find(room => room.id === roomId);
  };

  const isPastBooking = (checkOut: Date) => {
    return new Date() > new Date(checkOut);
  };

  const isUpcomingBooking = (checkIn: Date) => {
    return new Date() < new Date(checkIn);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingBookings = bookings.filter(booking => isUpcomingBooking(booking.checkIn) && booking.status !== 'cancelled');
  const pastBookings = bookings.filter(booking => isPastBooking(booking.checkOut) || booking.status === 'cancelled');

  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 mb-4">
              <Calendar className="h-8 w-8 text-amber-800" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't made any bookings yet. Start exploring our rooms and make your first reservation.
            </p>
            <Link to="/rooms">
              <Button>Browse Rooms</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Upcoming Bookings */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Stays</h2>
              
              {upcomingBookings.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-600">You have no upcoming bookings.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingBookings.map(booking => {
                    const room = getRoom(booking.roomId);
                    if (!room) return null;
                    
                    return (
                      <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-2/5 h-48 md:h-auto">
                            <img 
                              src={room.images[0]} 
                              alt={room.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-3/5 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            
                            <div className="flex items-start mb-2">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                              <span className="text-gray-600">
                                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="flex items-start mb-4">
                              <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                              <span className="text-gray-600">Nyungwe Forest Reserve, Rwanda</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-xs text-gray-500">Total</span>
                                <div className="text-lg font-bold text-amber-600">${booking.totalPrice}</div>
                              </div>
                              
                              <button
                                onClick={() => cancelBooking(booking.id)}
                                className="text-sm font-medium text-red-600 hover:text-red-800"
                              >
                                Cancel Booking
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Stays</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pastBookings.map(booking => {
                    const room = getRoom(booking.roomId);
                    if (!room) return null;
                    
                    return (
                      <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                        <div className="md:flex">
                          <div className="md:w-2/5 h-48 md:h-auto">
                            <img 
                              src={room.images[0]} 
                              alt={room.name} 
                              className="w-full h-full object-cover opacity-80"
                            />
                          </div>
                          <div className="md:w-3/5 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            
                            <div className="flex items-start mb-2">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                              <span className="text-gray-600">
                                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="flex items-start mb-4">
                              <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                              <span className="text-gray-600">Nyungwe Forest Reserve, Rwanda</span>
                            </div>
                            
                            <div>
                              <span className="text-xs text-gray-500">Total</span>
                              <div className="text-lg font-bold text-gray-600">${booking.totalPrice}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Cancellation Policy */}
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-amber-800" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-amber-800">Cancellation Policy</h3>
                  <div className="mt-2 text-amber-700">
                    <p className="mb-2">Free cancellation up to 48 hours before check-in. After that, a one-night charge will apply.</p>
                    <p>For group bookings and special rates, different cancellation policies may apply. Please refer to the terms and conditions provided at the time of booking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;