import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Bed, Clock, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { rooms } from '../data/rooms';
import Button from '../components/ui/Button';

const AdminDashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isAuthenticated || (user && !user.isAdmin)) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || (user && !user.isAdmin)) {
    return null;
  }

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const toggleExpandBooking = (bookingId: string) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const getRoom = (roomId: string) => {
    return rooms.find(room => room.id === roomId);
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.checkIn).getTime();
      const dateB = new Date(b.checkIn).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sortBy === 'status') {
      return sortOrder === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    if (sortBy === 'price') {
      return sortOrder === 'asc' 
        ? a.totalPrice - b.totalPrice 
        : b.totalPrice - a.totalPrice;
    }
    return 0;
  });

  const activeBookings = bookings.filter(booking => booking.status === 'confirmed');
  const pendingBookings = bookings.filter(booking => booking.status === 'pending');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');

  const totalRevenue = bookings
    .filter(booking => booking.status !== 'cancelled')
    .reduce((sum, booking) => sum + booking.totalPrice, 0);

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

  const renderSortIcon = (field: string) => {
    if (sortBy !== field) {
      return <ChevronDown className="h-4 w-4 text-gray-400" />;
    }
    return sortOrder === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-green-800" /> 
      : <ChevronDown className="h-4 w-4 text-green-800" />;
  };

  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex flex-wrap -mb-px">
            <button
              className={`mr-8 py-4 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-green-800 text-green-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`mr-8 py-4 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-green-800 text-green-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
            <button
              className={`mr-8 py-4 border-b-2 font-medium text-sm ${
                activeTab === 'rooms'
                  ? 'border-green-800 text-green-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
          </div>
        </div>
        
        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <div>
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Active Bookings" 
                value={activeBookings.length} 
                icon={<Calendar className="h-6 w-6 text-green-800" />}
                color="bg-green-100"
              />
              <StatCard 
                title="Pending Bookings" 
                value={pendingBookings.length} 
                icon={<Clock className="h-6 w-6 text-amber-800" />}
                color="bg-amber-100"
              />
              <StatCard 
                title="Available Rooms" 
                value={rooms.length - activeBookings.length} 
                icon={<Bed className="h-6 w-6 text-blue-800" />}
                color="bg-blue-100"
              />
              <StatCard 
                title="Total Revenue" 
                value={`$${totalRevenue}`} 
                icon={<DollarSign className="h-6 w-6 text-purple-800" />}
                color="bg-purple-100"
              />
            </div>
            
            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
              
              {bookings.length === 0 ? (
                <p className="text-gray-600">No bookings yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          onClick={() => toggleSort('date')}
                        >
                          <div className="flex items-center cursor-pointer">
                            Date
                            {renderSortIcon('date')}
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Room
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Guest
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          onClick={() => toggleSort('status')}
                        >
                          <div className="flex items-center cursor-pointer">
                            Status
                            {renderSortIcon('status')}
                          </div>
                        </th>
                        <th 
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          onClick={() => toggleSort('price')}
                        >
                          <div className="flex items-center cursor-pointer">
                            Amount
                            {renderSortIcon('price')}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedBookings.slice(0, 5).map(booking => {
                        const room = getRoom(booking.roomId);
                        return (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {room?.name || 'Unknown Room'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              John Doe {/* This would come from a real user in a full implementation */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${booking.totalPrice}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              
              <div className="mt-4 text-right">
                <button 
                  className="text-sm font-medium text-green-800 hover:text-green-700"
                  onClick={() => setActiveTab('bookings')}
                >
                  View All Bookings
                </button>
              </div>
            </div>
            
            {/* Room Occupancy */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Room Occupancy</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rooms.map(room => {
                      const isOccupied = activeBookings.some(booking => booking.roomId === room.id);
                      return (
                        <tr key={room.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {room.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                            {room.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${room.price}/night
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span 
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                isOccupied 
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {isOccupied ? 'Occupied' : 'Available'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">All Bookings</h2>
            
            {bookings.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => toggleSort('date')}
                      >
                        <div className="flex items-center">
                          Dates
                          {renderSortIcon('date')}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guests
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => toggleSort('status')}
                      >
                        <div className="flex items-center">
                          Status
                          {renderSortIcon('status')}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => toggleSort('price')}
                      >
                        <div className="flex items-center">
                          Amount
                          {renderSortIcon('price')}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedBookings.map(booking => {
                      const room = getRoom(booking.roomId);
                      return (
                        <React.Fragment key={booking.id}>
                          <tr 
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleExpandBooking(booking.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {booking.id.toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {room?.name || 'Unknown Room'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.guests}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${booking.totalPrice}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                {booking.status !== 'cancelled' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      cancelBooking(booking.id);
                                    }}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Edit functionality would go here
                                  }}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                          
                          {expandedBooking === booking.id && (
                            <tr>
                              <td colSpan={7} className="px-6 py-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Details</h3>
                                    <p className="text-sm text-gray-600">
                                      <strong>Created:</strong> {new Date(booking.createdAt).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Nights:</strong> {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Guest:</strong> John Doe
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Email:</strong> john.doe@example.com
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Phone:</strong> +1234567890
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Room Details</h3>
                                    {room && (
                                      <>
                                        <p className="text-sm text-gray-600 capitalize">
                                          <strong>Type:</strong> {room.type}
                                        </p>
                                        <p className="text-sm text-gray-600 capitalize">
                                          <strong>View:</strong> {room.view}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          <strong>Size:</strong> {room.size} m²
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          <strong>Max Capacity:</strong> {room.capacity} guests
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="mt-4 flex justify-end">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Print/export functionality would go here
                                    }}
                                  >
                                    Print Details
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'rooms' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Room Management</h2>
              <Button size="sm">
                Add New Room
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      View
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms.map(room => {
                    const isOccupied = activeBookings.some(booking => booking.roomId === room.id);
                    return (
                      <tr key={room.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-md object-cover" 
                                src={room.images[0]} 
                                alt="" 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{room.name}</div>
                              <div className="text-sm text-gray-500">{room.size} m²</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {room.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {room.view}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.capacity} guests
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${room.price}/night
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              isOccupied 
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {isOccupied ? 'Occupied' : 'Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-800">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`${color} rounded-full p-3`}>
          {icon}
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;