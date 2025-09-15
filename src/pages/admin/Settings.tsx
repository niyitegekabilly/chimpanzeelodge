import React, { useState } from 'react';
import { 
  Save, 
  Upload, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Bell,
  Shield,
  Database,
  Palette,
  Wifi,
  Lock,
  User,
  Building
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      hotelName: 'Chimpanzee Lodge Nyungwe',
      tagline: 'Experience the magic of Nyungwe National Park',
      email: 'champanzeelodges@gmail.com',
      phone: '+250 788 467 700',
      address: 'Nyungwe Forest Reserve, Rwanda',
      website: 'https://champanzeelodges.com',
      currency: 'USD',
      timezone: 'Africa/Kigali',
      language: 'en'
    },
    booking: {
      checkInTime: '14:00',
      checkOutTime: '11:00',
      minStay: 1,
      maxStay: 30,
      advanceBooking: 365,
      cancellationPolicy: '24 hours',
      requireDeposit: true,
      depositPercentage: 20
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: false,
      bankTransferEnabled: true,
      currency: 'USD',
      taxRate: 18,
      serviceCharge: 0
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      bookingConfirmations: true,
      paymentConfirmations: true,
      cancellationNotifications: true,
      reminderEmails: true
    },
    appearance: {
      primaryColor: '#059669',
      secondaryColor: '#F59E0B',
      logo: '/images/logo.jpeg',
      favicon: '/favicon.ico',
      theme: 'light'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      loginAttempts: 5,
      ipWhitelist: false
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'booking', name: 'Booking', icon: Globe },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your hotel settings and preferences.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Save className="h-5 w-5 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
                <input
                  type="text"
                  value={settings.general.hotelName}
                  onChange={(e) => handleInputChange('general', 'hotelName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={settings.general.tagline}
                  onChange={(e) => handleInputChange('general', 'tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={settings.general.email}
                    onChange={(e) => handleInputChange('general', 'email', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={settings.general.phone}
                    onChange={(e) => handleInputChange('general', 'phone', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    value={settings.general.address}
                    onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                    rows={3}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={settings.general.currency}
                  onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="RWF">RWF - Rwandan Franc</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Africa/Kigali">Africa/Kigali</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Booking Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Time</label>
                <input
                  type="time"
                  value={settings.booking.checkInTime}
                  onChange={(e) => handleInputChange('booking', 'checkInTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Time</label>
                <input
                  type="time"
                  value={settings.booking.checkOutTime}
                  onChange={(e) => handleInputChange('booking', 'checkOutTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Stay (nights)</label>
                <input
                  type="number"
                  min="1"
                  value={settings.booking.minStay}
                  onChange={(e) => handleInputChange('booking', 'minStay', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Stay (nights)</label>
                <input
                  type="number"
                  min="1"
                  value={settings.booking.maxStay}
                  onChange={(e) => handleInputChange('booking', 'maxStay', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Advance Booking (days)</label>
                <input
                  type="number"
                  min="1"
                  value={settings.booking.advanceBooking}
                  onChange={(e) => handleInputChange('booking', 'advanceBooking', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
                <select
                  value={settings.booking.cancellationPolicy}
                  onChange={(e) => handleInputChange('booking', 'cancellationPolicy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="24 hours">24 hours</option>
                  <option value="48 hours">48 hours</option>
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="30 days">30 days</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.booking.requireDeposit}
                    onChange={(e) => handleInputChange('booking', 'requireDeposit', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Require deposit for bookings
                  </label>
                </div>
              </div>
              
              {settings.booking.requireDeposit && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Percentage</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.booking.depositPercentage}
                      onChange={(e) => handleInputChange('booking', 'depositPercentage', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payment.stripeEnabled}
                  onChange={(e) => handleInputChange('payment', 'stripeEnabled', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable Stripe payments
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payment.paypalEnabled}
                  onChange={(e) => handleInputChange('payment', 'paypalEnabled', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable PayPal payments
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payment.bankTransferEnabled}
                  onChange={(e) => handleInputChange('payment', 'bankTransferEnabled', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable bank transfer payments
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.payment.taxRate}
                  onChange={(e) => handleInputChange('payment', 'taxRate', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Charge (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.payment.serviceCharge}
                  onChange={(e) => handleInputChange('payment', 'serviceCharge', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable email notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.smsNotifications}
                  onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable SMS notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.bookingConfirmations}
                  onChange={(e) => handleInputChange('notifications', 'bookingConfirmations', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Send booking confirmations
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.paymentConfirmations}
                  onChange={(e) => handleInputChange('notifications', 'paymentConfirmations', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Send payment confirmations
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.cancellationNotifications}
                  onChange={(e) => handleInputChange('notifications', 'cancellationNotifications', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Send cancellation notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications.reminderEmails}
                  onChange={(e) => handleInputChange('notifications', 'reminderEmails', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Send reminder emails
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.appearance.secondaryColor}
                    onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={settings.appearance.secondaryColor}
                    onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={settings.appearance.theme}
                  onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
              <div className="flex items-center space-x-4">
                <img
                  src={settings.appearance.logo}
                  alt="Current logo"
                  className="h-16 w-16 object-contain border border-gray-300 rounded"
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable two-factor authentication
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.security.ipWhitelist}
                  onChange={(e) => handleInputChange('security', 'ipWhitelist', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable IP whitelist
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="480"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={settings.security.loginAttempts}
                  onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
                <select
                  value={settings.security.passwordPolicy}
                  onChange={(e) => handleInputChange('security', 'passwordPolicy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="basic">Basic (6+ characters)</option>
                  <option value="medium">Medium (8+ characters, mixed case)</option>
                  <option value="strong">Strong (8+ characters, mixed case, numbers, symbols)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
