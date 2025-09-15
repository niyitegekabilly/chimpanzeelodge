import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import RestaurantPage from './pages/RestaurantPage';
import ConferencePage from './pages/ConferencePage';
import AmenitiesPage from './pages/AmenitiesPage';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsPage from './pages/TermsPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import RoomManagement from './pages/admin/RoomManagement';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';
import ContentManagement from './pages/admin/ContentManagement';
import MediaManagement from './pages/admin/MediaManagement';
import Settings from './pages/admin/Settings';
import Notifications from './pages/admin/Notifications';
import SearchResults from './pages/admin/SearchResults';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="bookings" element={<AdminBookingsPage />} />
                  <Route path="rooms" element={<RoomManagement />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="content" element={<ContentManagement />} />
                  <Route path="media" element={<MediaManagement />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="search" element={<SearchResults />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/rooms" element={<RoomsPage />} />
                  <Route path="/rooms/:id" element={<RoomDetailPage />} />
                  <Route path="/restaurant" element={<RestaurantPage />} />
                  <Route path="/conference" element={<ConferencePage />} />
                  <Route path="/amenities" element={<AmenitiesPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
                  <Route path="/my-bookings" element={<MyBookingsPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;