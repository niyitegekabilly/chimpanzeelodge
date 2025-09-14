import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+250788467700';
    const message = encodeURIComponent('Hello! I would like to inquire about room availability and pricing. Could you please share your current offers?');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Restaurant', path: '/restaurant' },
    { name: 'Conference', path: '/conference' },
    { name: 'Amenities', path: '/amenities' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-green-900 bg-opacity-90 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl md:text-2xl">
              Chimpanzee Lodges
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* Phone Number */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleWhatsAppClick}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-white hover:text-amber-300' : 'text-gray-800 hover:text-gray-600'
                  }`}
                  title="Contact us via WhatsApp"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  <span className="hidden lg:inline">+250 788 467 700</span>
                  <span className="lg:hidden">Call</span>
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className={`flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
                  }`}
                  title="WhatsApp us for best deals"
                >
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
              
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-amber-400 bg-green-800 bg-opacity-50'
                      : isScrolled ? 'text-white hover:text-amber-300' : 'text-gray-800 hover:text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-white hover:text-amber-300' : 'text-gray-800 hover:text-gray-600'}`}
                    >
                      <User className="h-5 w-5 mr-1" />
                      <span>{user?.name.split(' ')[0]}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {user?.isAdmin && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          to="/my-bookings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Bookings
                        </Link>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-white hover:text-amber-300' : 'text-gray-800 hover:text-gray-600'}`}
                >
                  Login
                </Link>
              )}

              <Link
                to="/booking"
                className="px-4 py-2 rounded-md text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-300"
              >
                Book Now
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-300 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-green-900 bg-opacity-95">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Phone Number */}
            <div className="px-3 py-2 border-b border-green-700 mb-2">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center text-white hover:text-amber-300 transition-colors duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-base font-medium">+250 788 467 700</span>
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center text-green-400 hover:text-green-300 transition-colors duration-300 mt-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">WhatsApp for Best Deals</span>
              </button>
            </div>
            
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-amber-400 bg-green-800 bg-opacity-50'
                    : 'text-white hover:text-amber-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-300"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/my-bookings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-300"
                >
                  My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-300"
              >
                Login
              </Link>
            )}
            
            <Link
              to="/booking"
              className="block px-3 py-2 rounded-md text-base font-medium bg-amber-500 text-white hover:bg-amber-600"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;