import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, User, Settings, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuToggle: () => void;
  title: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle, title }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fetch notifications from Supabase
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotifications(data || []);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (!error) {
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
        );
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query parameter
      navigate(`/admin/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search bookings, users, rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e);
                    }
                  }}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="ml-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-gray-500 relative"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
                      <p className="text-sm text-gray-500 mt-2">Loading notifications...</p>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationAsRead(notification.id)}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.is_read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.created_at).toLocaleString()}
                            </p>
                          </div>
                          {!notification.is_read && (
                            <div className="ml-2 h-2 w-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button 
                    onClick={() => navigate('/admin/notifications')}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center p-2 text-gray-400 hover:text-gray-500"
            >
              <User className="h-6 w-6" />
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.user_metadata?.full_name || 'Admin User'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/settings')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
