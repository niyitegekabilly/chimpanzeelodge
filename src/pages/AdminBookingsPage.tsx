import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
// import { Booking } from '../types'; // We will use a more specific type after join
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Define a type for the fetched data including joined tables
interface BookingWithDetails {
  id: string;
  room_id: string; // Keep original IDs for actions
  user_id: string | null;
  check_in: string; // Dates might come as strings from Supabase
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string; // Dates might come as strings
  boardType: 'BB' | 'HB' | 'FB';
  rooms: { name: string | null } | null; // Joined room data
  users: { full_name: string | null; email: string | null } | null; // Joined user data
}

const AdminBookingsPage: React.FC = () => {
  // Use the new type for the state
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (!isAuthLoading && (!isAuthenticated || (user && !user.isAdmin))) {
      navigate('/'); // Redirect to homepage or a suitable unauthorized page
    }
  }, [isAuthenticated, user, navigate, isAuthLoading]);

  // Fetch bookings from Supabase on component mount (only if authenticated and admin)
  useEffect(() => {
    if (isAuthenticated && user && user.isAdmin) {
      fetchBookings();
    }
  }, [isAuthenticated, user]); // Depend on auth state and user

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      // Select all booking fields and join with rooms (selecting name) and users (selecting full_name and email)
      .select('*, rooms(name), users(full_name, email)');

    if (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings.');
      setBookings([]);
    } else {
      // Cast the fetched data to the new interface
      setBookings(data as BookingWithDetails[]); 
    }
    setLoading(false);
  };

  const handleConfirm = async (bookingId: string) => {
    // Update booking status to 'confirmed' in Supabase
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', bookingId);

    if (error) {
      console.error('Error confirming booking:', error);
      setError('Failed to confirm booking.');
    } else {
      console.log(`Booking ${bookingId} confirmed`);
      // Refresh the booking list
      fetchBookings();
      // In a real app, trigger confirmation notifications (email, in-system)
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // Update booking status to 'cancelled' in Supabase
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) {
        console.error('Error cancelling booking:', error);
        setError('Failed to cancel booking.');
      } else {
        console.log(`Booking ${bookingId} cancelled`);
        // Refresh the booking list
        fetchBookings();
        // In a real app, trigger cancellation notifications (email, in-system)
      }
    }
  };

  // Don't render content if not authenticated or not admin (redirection handles this)
  if (isAuthLoading || !isAuthenticated || (user && !user.isAdmin)) {
    return null; 
  }

  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Booking Management</h1>

        {loading && <p>Loading bookings...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">All Bookings</h2>

            {bookings.length === 0 ? (
              <p className="text-gray-600">No bookings available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id.substring(0, 6)}...</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.rooms?.name || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.users?.full_name || booking.users?.email || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.check_in).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.check_out).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.guests}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.boardType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.total_price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{booking.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {booking.status === 'pending' && (
                            <Button variant="outline" size="sm" onClick={() => handleConfirm(booking.id)} className="mr-2">Confirm</Button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <Button variant="danger" size="sm" onClick={() => handleCancel(booking.id)}>Cancel</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingsPage; 