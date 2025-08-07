import React from 'react';
import { InstagramIcon, FacebookIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl font-bold mb-4">KASI SOCKS</h2>
            <p className="text-gray-300 mb-4">
              Elevate your style from the ground up with our premium sock
              collection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>
          {/* Help */}
          <div>
            <h3 className="font-medium text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Kasi Socks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;