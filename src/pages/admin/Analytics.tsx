import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar, 
  Bed,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const analyticsData = {
    revenue: {
      current: 45680,
      previous: 38920,
      growth: 17.4,
      trend: 'up' as const
    },
    bookings: {
      current: 124,
      previous: 98,
      growth: 26.5,
      trend: 'up' as const
    },
    occupancy: {
      current: 78.5,
      previous: 65.2,
      growth: 20.4,
      trend: 'up' as const
    },
    averageRate: {
      current: 368,
      previous: 397,
      growth: -7.3,
      trend: 'down' as const
    }
  };

  const topRooms = [
    { name: 'Double Bed', bookings: 45, revenue: 12150, occupancy: 85.2 },
    { name: 'Twin Bed', bookings: 38, revenue: 10260, occupancy: 78.9 },
    { name: 'Single', bookings: 28, revenue: 7560, occupancy: 72.1 },
    { name: 'Triple Bed', bookings: 15, revenue: 10125, occupancy: 65.4 },
    { name: 'Budget Single', bookings: 12, revenue: 3240, occupancy: 58.7 }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 32000, bookings: 85, occupancy: 68 },
    { month: 'Feb', revenue: 35000, bookings: 92, occupancy: 72 },
    { month: 'Mar', revenue: 38000, bookings: 98, occupancy: 75 },
    { month: 'Apr', revenue: 42000, bookings: 105, occupancy: 78 },
    { month: 'May', revenue: 45000, bookings: 118, occupancy: 82 },
    { month: 'Jun', revenue: 48000, bookings: 124, occupancy: 85 },
    { month: 'Jul', revenue: 52000, bookings: 135, occupancy: 88 },
    { month: 'Aug', revenue: 49000, bookings: 128, occupancy: 84 },
    { month: 'Sep', revenue: 46000, bookings: 120, occupancy: 80 },
    { month: 'Oct', revenue: 44000, bookings: 115, occupancy: 77 },
    { month: 'Nov', revenue: 40000, bookings: 108, occupancy: 73 },
    { month: 'Dec', revenue: 45680, bookings: 124, occupancy: 78.5 }
  ];

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    trend: 'up' | 'down';
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, trend, icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {change > 0 ? '+' : ''}{change}% from last period
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Insights and performance metrics for your hotel.</p>
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
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${analyticsData.revenue.current.toLocaleString()}`}
          change={analyticsData.revenue.growth}
          trend={analyticsData.revenue.trend}
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
          color="bg-green-100"
        />
        <MetricCard
          title="Total Bookings"
          value={analyticsData.bookings.current}
          change={analyticsData.bookings.growth}
          trend={analyticsData.bookings.trend}
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <MetricCard
          title="Occupancy Rate"
          value={`${analyticsData.occupancy.current}%`}
          change={analyticsData.occupancy.growth}
          trend={analyticsData.occupancy.trend}
          icon={<Bed className="h-6 w-6 text-purple-600" />}
          color="bg-purple-100"
        />
        <MetricCard
          title="Average Rate"
          value={`$${analyticsData.averageRate.current}`}
          change={analyticsData.averageRate.growth}
          trend={analyticsData.averageRate.trend}
          icon={<BarChart3 className="h-6 w-6 text-orange-600" />}
          color="bg-orange-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                Revenue
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                Bookings
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue trend chart</p>
              <p className="text-sm text-gray-400">Integration with Chart.js or similar</p>
            </div>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Occupancy Rate</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">
                Occupancy
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                ADR
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Occupancy rate chart</p>
              <p className="text-sm text-gray-400">Integration with Chart.js or similar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Rooms */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Rooms</h3>
          <button className="flex items-center px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupancy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topRooms.map((room, index) => (
                <tr key={room.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">#{index + 1}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{room.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${room.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.occupancy}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${room.occupancy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{room.occupancy}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
              Revenue
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
              Bookings
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
              Occupancy
            </button>
          </div>
        </div>
        <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Monthly performance chart</p>
            <p className="text-sm text-gray-400">Integration with Chart.js or similar</p>
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Revenue Growth</p>
                <p className="text-sm text-gray-600">Revenue increased by 17.4% compared to last period</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bed className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">High Occupancy</p>
                <p className="text-sm text-gray-600">Occupancy rate is above industry average at 78.5%</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Rate Optimization</p>
                <p className="text-sm text-gray-600">Consider adjusting rates to maximize revenue per available room</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Promote Double Bed Rooms</p>
              <p className="text-sm text-green-700">Your most popular room type with 85.2% occupancy</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Consider Dynamic Pricing</p>
              <p className="text-sm text-blue-700">Implement dynamic pricing for budget rooms during peak season</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Marketing Opportunity</p>
              <p className="text-sm text-purple-700">Focus marketing efforts on single and twin bed rooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
