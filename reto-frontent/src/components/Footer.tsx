import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-orange-400" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-orange-400" />
                <span>info@gourmetreserve.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-orange-400" />
                <span>123 Gourmet Street, Foodville</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-orange-400" />
                <div>
                  <p>Mon-Thu: 11:00 AM - 10:00 PM</p>
                  <p>Fri-Sat: 11:00 AM - 11:00 PM</p>
                  <p>Sun: 11:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for special offers and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md w-full text-gray-900"
              />
              <button className="bg-orange-600 px-4 py-2 rounded-r-md hover:bg-orange-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Gourmet Reserve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;