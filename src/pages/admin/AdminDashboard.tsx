import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Bed, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Eye,
  Download
} from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { rooms } from '../../data/rooms';

interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  occupancyRate: number;
  averageRating: number;
  totalUsers: number;
  newUsersThisMonth: number;
}

const AdminDashboard: React.FC = () => {
  const { bookings } = useBooking();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    revenueGrowth: 0,
    occupancyRate: 0,
    averageRating: 4.8,
    totalUsers: 0,
    newUsersThisMonth: 0
  });

  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    calculateStats();
  }, [bookings, selectedPeriod]);

  const calculateStats = () => {
    const now = new Date();
    const periodStart = new Date();
    
    switch (selectedPeriod) {
      case '7d':
        periodStart.setDate(now.getDate() - 7);
        break;
      case '30d':
        periodStart.setDate(now.getDate() - 30);
        break;
      case '90d':
        periodStart.setDate(now.getDate() - 90);
        break;
      default:
        periodStart.setDate(now.getDate() - 30);
    }

    const periodBookings = bookings.filter(booking => 
      new Date(booking.createdAt) >= periodStart
    );

    const activeBookings = bookings.filter(booking => booking.status === 'confirmed');
    const pendingBookings = bookings.filter(booking => booking.status === 'pending');
    const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');

    const totalRevenue = bookings
      .filter(booking => booking.status !== 'cancelled')
      .reduce((sum, booking) => sum + booking.totalPrice, 0);

    const monthlyRevenue = periodBookings
      .filter(booking => booking.status !== 'cancelled')
      .reduce((sum, booking) => sum + booking.totalPrice, 0);

    const occupancyRate = rooms.length > 0 ? (activeBookings.length / rooms.length) * 100 : 0;

    setStats({
      totalBookings: bookings.length,
      activeBookings: activeBookings.length,
      pendingBookings: pendingBookings.length,
      cancelledBookings: cancelledBookings.length,
      totalRevenue,
      monthlyRevenue,
      revenueGrowth: 12.5, // This would be calculated from historical data
      occupancyRate,
      averageRating: 4.8,
      totalUsers: 156, // This would come from user data
      newUsersThisMonth: 23
    });
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color: string;
    trend?: 'up' | 'down' | 'neutral';
  }> = ({ title, value, change, icon, color, trend = 'neutral' }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
              {trend === 'down' && <TrendingDown className="h-4 w-4 mr-1" />}
              {change > 0 ? '+' : ''}{change}% from last period
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getRoom = (roomId: string) => {
    return rooms.find(room => room.id === roomId);
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

  return (
    <div className="space-y-6 bg-red-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-yellow-200 p-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your hotel.</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          change={8.2}
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100"
          trend="up"
        />
        <StatCard
          title="Active Bookings"
          value={stats.activeBookings}
          change={-2.1}
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
          color="bg-green-100"
          trend="down"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          change={stats.revenueGrowth}
          icon={<DollarSign className="h-6 w-6 text-purple-600" />}
          color="bg-purple-100"
          trend="up"
        />
        <StatCard
          title="Occupancy Rate"
          value={`${stats.occupancyRate.toFixed(1)}%`}
          change={5.3}
          icon={<Bed className="h-6 w-6 text-orange-600" />}
          color="bg-orange-100"
          trend="up"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pending Bookings"
          value={stats.pendingBookings}
          icon={<Clock className="h-6 w-6 text-amber-600" />}
          color="bg-amber-100"
        />
        <StatCard
          title="Cancelled Bookings"
          value={stats.cancelledBookings}
          icon={<XCircle className="h-6 w-6 text-red-600" />}
          color="bg-red-100"
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating}
          icon={<Star className="h-6 w-6 text-yellow-600" />}
          color="bg-yellow-100"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
              <p className="text-sm text-gray-400">Integration with Chart.js or similar</p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent bookings</p>
            ) : (
              recentBookings.map((booking) => {
                const room = getRoom(booking.roomId);
                return (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {room?.name || 'Unknown Room'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ${booking.totalPrice}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Bed className="h-6 w-6 text-green-600 mr-3" />
            <span className="font-medium">Add New Room</span>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-blue-600 mr-3" />
            <span className="font-medium">Manage Users</span>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-purple-600 mr-3" />
            <span className="font-medium">View Bookings</span>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-6 w-6 text-orange-600 mr-3" />
            <span className="font-medium">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
