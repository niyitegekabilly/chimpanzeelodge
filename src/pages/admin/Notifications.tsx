import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

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

  const markAsRead = async (notificationId: string) => {
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

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
      if (unreadIds.length === 0) return;

      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('id', unreadIds);

      if (!error) {
        setNotifications(prev =>
          prev.map(n => ({ ...n, is_read: true }))
        );
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.is_read;
    if (filter === 'read') return notification.is_read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Manage your notifications and alerts.</p>
        </div>
        <div className="flex items-center space-x-4">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All as Read
            </button>
          )}
          <button
            onClick={fetchNotifications}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <Bell className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'read'
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading notifications...</p>
          </div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'You don\'t have any notifications yet.'
                : `You don't have any ${filter} notifications.`
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !notification.is_read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.is_read && (
                        <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <p className="text-sm text-gray-400">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        notification.type === 'success' ? 'bg-green-100 text-green-800' :
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        notification.type === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.is_read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    {notification.action_url && (
                      <button
                        onClick={() => window.open(notification.action_url, '_blank')}
                        className="px-3 py-1 text-sm text-green-600 hover:text-green-700 font-medium"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
