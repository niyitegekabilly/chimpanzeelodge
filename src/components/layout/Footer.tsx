import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Chimpanzee Lodges</h3>
            <p className="text-gray-300 mb-4">
              Experience the magic of Nyungwe National Park from the comfort of our eco-friendly resort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">Rooms</Link>
              </li>
              <li>
                <Link to="/restaurant" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">Restaurant</Link>
              </li>
              <li>
                <Link to="/conference" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">Conference</Link>
              </li>
              <li>
                <Link to="/amenities" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">Amenities</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Nyungwe Forest Reserve, Rwanda</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-400 mr-2" />
                <span className="text-gray-300">+250 788 467 700</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-400 mr-2" />
                <span className="text-gray-300">champanzeelodges@gmail.com</span>
              </li>
              <li className="flex items-center">
                <a 
                  href="https://wa.me/250788467700?text=Hello! I would like to inquire about room availability and pricing. Could you please share your current offers?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  <MessageCircle className="h-5 w-5 text-amber-400 mr-2" />
                  WhatsApp for Best Deals
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for special offers</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-green-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-green-800 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Chimpanzee Lodges. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;