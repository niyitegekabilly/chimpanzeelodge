import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Calendar, Users, Bed, FileText, Image, Bell } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SearchResult {
  type: 'booking' | 'user' | 'room' | 'content' | 'media' | 'notification';
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<any>;
  metadata?: any;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'bookings' | 'users' | 'rooms' | 'content'>('all');

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query.trim()) {
      performSearch(query.trim());
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const searchResults: SearchResult[] = [];

      // Search Bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id,
          check_in,
          check_out,
          guests,
          total_price,
          status,
          created_at,
          rooms(name),
          users(full_name, email)
        `)
        .or(`id.ilike.%${searchQuery}%,rooms.name.ilike.%${searchQuery}%,users.full_name.ilike.%${searchQuery}%,users.email.ilike.%${searchQuery}%`);

      if (!bookingsError && bookings) {
        bookings.forEach(booking => {
          searchResults.push({
            type: 'booking',
            id: booking.id,
            title: `Booking #${booking.id.substring(0, 8)}`,
            description: `${booking.rooms?.name || 'Room'} - ${booking.users?.full_name || 'Guest'} (${booking.guests} guests)`,
            url: `/admin/bookings`,
            icon: Calendar,
            metadata: {
              status: booking.status,
              checkIn: booking.check_in,
              checkOut: booking.check_out,
              totalPrice: booking.total_price
            }
          });
        });
      }

      // Search Users
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, full_name, email, phone, created_at')
        .or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);

      if (!usersError && users) {
        users.forEach(user => {
          searchResults.push({
            type: 'user',
            id: user.id,
            title: user.full_name || 'Unknown User',
            description: user.email || 'No email',
            url: `/admin/users`,
            icon: Users,
            metadata: {
              email: user.email,
              phone: user.phone,
              createdAt: user.created_at
            }
          });
        });
      }

      // Search Rooms
      const { data: rooms, error: roomsError } = await supabase
        .from('rooms')
        .select('id, name, description, price, capacity, room_type')
        .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,room_type.ilike.%${searchQuery}%`);

      if (!roomsError && rooms) {
        rooms.forEach(room => {
          searchResults.push({
            type: 'room',
            id: room.id,
            title: room.name || 'Unnamed Room',
            description: `${room.room_type} - $${room.price}/night - ${room.capacity} guests`,
            url: `/admin/rooms`,
            icon: Bed,
            metadata: {
              roomType: room.room_type,
              price: room.price,
              capacity: room.capacity
            }
          });
        });
      }

      // Search Content
      const { data: content, error: contentError } = await supabase
        .from('content')
        .select('id, title, slug, excerpt, type, status, created_at')
        .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);

      if (!contentError && content) {
        content.forEach(item => {
          searchResults.push({
            type: 'content',
            id: item.id,
            title: item.title,
            description: item.excerpt || 'No description',
            url: `/admin/content`,
            icon: FileText,
            metadata: {
              type: item.type,
              status: item.status,
              slug: item.slug
            }
          });
        });
      }

      // Search Media
      const { data: media, error: mediaError } = await supabase
        .from('media')
        .select('id, filename, original_name, alt_text, caption, category, created_at')
        .or(`filename.ilike.%${searchQuery}%,original_name.ilike.%${searchQuery}%,alt_text.ilike.%${searchQuery}%,caption.ilike.%${searchQuery}%`);

      if (!mediaError && media) {
        media.forEach(item => {
          searchResults.push({
            type: 'media',
            id: item.id,
            title: item.original_name || item.filename,
            description: item.alt_text || item.caption || 'No description',
            url: `/admin/media`,
            icon: Image,
            metadata: {
              filename: item.filename,
              category: item.category,
              filePath: item.file_path
            }
          });
        });
      }

      // Search Notifications
      const { data: notifications, error: notificationsError } = await supabase
        .from('notifications')
        .select('id, title, message, type, is_read, created_at')
        .or(`title.ilike.%${searchQuery}%,message.ilike.%${searchQuery}%`);

      if (!notificationsError && notifications) {
        notifications.forEach(notification => {
          searchResults.push({
            type: 'notification',
            id: notification.id,
            title: notification.title,
            description: notification.message,
            url: `/admin/notifications`,
            icon: Bell,
            metadata: {
              type: notification.type,
              isRead: notification.is_read,
              createdAt: notification.created_at
            }
          });
        });
      }

      setResults(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(result => result.type === activeTab);

  const getResultCount = (type: string) => {
    return results.filter(result => result.type === type).length;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Search className="h-8 w-8 text-gray-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <p className="text-gray-600 mt-1">
            {loading ? 'Searching...' : `Found ${filteredResults.length} results for "${query}"`}
          </p>
        </div>
      </div>

      {/* Search Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({results.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Bookings ({getResultCount('booking')})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Users ({getResultCount('user')})
          </button>
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'rooms'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Rooms ({getResultCount('room')})
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'content'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Content ({getResultCount('content') + getResultCount('media')})
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Search Error</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">
              Try searching with different keywords or check your spelling.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result) => {
            const Icon = result.icon;
            return (
              <div
                key={`${result.type}-${result.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {result.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        result.type === 'booking' ? 'bg-blue-100 text-blue-800' :
                        result.type === 'user' ? 'bg-green-100 text-green-800' :
                        result.type === 'room' ? 'bg-purple-100 text-purple-800' :
                        result.type === 'content' ? 'bg-yellow-100 text-yellow-800' :
                        result.type === 'media' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{result.description}</p>
                    
                    {/* Additional metadata based on type */}
                    {result.metadata && (
                      <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                        {result.type === 'booking' && (
                          <>
                            <span>Status: {result.metadata.status}</span>
                            <span>•</span>
                            <span>Check-in: {formatDate(result.metadata.checkIn)}</span>
                            <span>•</span>
                            <span>Total: {formatPrice(result.metadata.totalPrice)}</span>
                          </>
                        )}
                        {result.type === 'user' && result.metadata.phone && (
                          <>
                            <span>Phone: {result.metadata.phone}</span>
                            <span>•</span>
                            <span>Joined: {formatDate(result.metadata.createdAt)}</span>
                          </>
                        )}
                        {result.type === 'room' && (
                          <>
                            <span>Type: {result.metadata.roomType}</span>
                            <span>•</span>
                            <span>Price: {formatPrice(result.metadata.price)}</span>
                            <span>•</span>
                            <span>Capacity: {result.metadata.capacity} guests</span>
                          </>
                        )}
                        {result.type === 'content' && (
                          <>
                            <span>Type: {result.metadata.type}</span>
                            <span>•</span>
                            <span>Status: {result.metadata.status}</span>
                            <span>•</span>
                            <span>Slug: {result.metadata.slug}</span>
                          </>
                        )}
                        {result.type === 'media' && (
                          <>
                            <span>Category: {result.metadata.category}</span>
                            <span>•</span>
                            <span>File: {result.metadata.filename}</span>
                          </>
                        )}
                        {result.type === 'notification' && (
                          <>
                            <span>Type: {result.metadata.type}</span>
                            <span>•</span>
                            <span>Read: {result.metadata.isRead ? 'Yes' : 'No'}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      to={result.url}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
