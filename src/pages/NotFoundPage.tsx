import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Phone, MessageCircle, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+250788467700';
    const message = encodeURIComponent('Hello! I seem to have gotten lost on your website. Could you help me find what I\'m looking for?');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-green-800 mb-4">404</div>
            <div className="text-6xl mb-4">🏨</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oops! This Page Got Lost in the Forest
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              It looks like you've wandered off the beaten path. Don't worry - even our chimpanzees 
              sometimes take the wrong trail! Let us help you find your way back to the lodge.
            </p>
          </div>

          {/* Helpful Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Search className="h-5 w-5 mr-2 text-green-600" />
                Popular Destinations
              </h2>
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium">Home</span>
                  </div>
                </Link>
                <Link 
                  to="/rooms" 
                  className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🛏️</span>
                    <span className="font-medium">Our Rooms</span>
                  </div>
                </Link>
                <Link 
                  to="/restaurant" 
                  className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🍽️</span>
                    <span className="font-medium">Restaurant</span>
                  </div>
                </Link>
                <Link 
                  to="/amenities" 
                  className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🏊</span>
                    <span className="font-medium">Amenities</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Contact Help */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-600" />
                Need Help?
              </h2>
              <p className="text-gray-600 mb-4">
                Our friendly staff is here to help you find exactly what you're looking for.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +250 788 467 700
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Support
                </button>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-green-800 text-white rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold mb-4">Did You Know? 🐒</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🌳</span>
                <p>Nyungwe Forest is home to over 1,000 chimpanzees and 13 different primate species!</p>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🏨</span>
                <p>Our lodge is just 4km from the forest, making it the perfect base for your adventure.</p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-300 font-medium"
            >
              <Home className="h-5 w-5 mr-2" />
              Return Home
            </Link>
          </div>

          {/* Search Suggestion */}
          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Still Can't Find What You're Looking For?</h3>
            <p className="text-gray-600 mb-4">
              Try searching for specific terms like "rooms", "restaurant", "booking", or "amenities" in your browser's search function.
            </p>
            <div className="text-sm text-gray-500">
              <p>Common searches: "Chimpanzee Lodge rooms", "Nyungwe Forest accommodation", "Rwanda hotel booking"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
