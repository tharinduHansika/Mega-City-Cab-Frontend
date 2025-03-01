import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Car, Calendar, LogOut } from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (location.pathname === "/" && path === "/drivers")
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <Link
            to="/drivers"
            className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 ${
              isActive("/drivers") ? "bg-gray-800" : ""
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Drivers
          </Link>
          <Link
            to="/vehicles"
            className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 ${
              isActive("/vehicles") ? "bg-gray-800" : ""
            }`}
          >
            <Car className="w-5 h-5 mr-3" />
            Vehicles
          </Link>
          <Link
            to="/bookings"
            className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 ${
              isActive("/bookings") ? "bg-gray-800" : ""
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Bookings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 w-full">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;