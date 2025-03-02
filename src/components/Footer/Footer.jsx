import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function Header() {

  return (
    <footer className="bg-yellow-500 text-gray-900 py-12 w-full">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Mega City Cab</h3>
          <p className="text-gray-900">
            Making car rental simple and accessible for everyone since 2010.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-900 hover:text-gray-700 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-gray-700 transition">
                Fleet
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-gray-700 transition">
                Booking
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-gray-700 transition">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gray-900" />
              <span className="text-gray-900">+94 11 123 4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gray-900" />
              <span className="text-gray-900">contact@megacitycab.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-900" />
              <span className="text-gray-900">123  Lorenze Road, Colombo 4</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-900 hover:text-gray-700 transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-700 transition">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-700 transition">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-900">
          © {new Date().getFullYear()} Mega City Cab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
