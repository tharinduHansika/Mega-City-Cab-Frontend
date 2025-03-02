// src/pages/AdminDashboard.jsx
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "../components/admin/Layout";
import DriversManager from "../components/admin/DriverManager";
import VehicleManager from "../components/admin/VehicleManager";
import BookingsManager from "../components/admin/BookingManager";
import UsersManager from "../components/admin/UserManager";

const AdminDashboard = () => {
  return (
    <div className="p-0">
      <Layout>
        <Routes>
          <Route path="/" element={<DriversManager />} />
          <Route path="/drivers" element={<DriversManager />} />
          <Route path="/vehicles" element={<VehicleManager />} />
          <Route path="/bookings" element={<BookingsManager />} />
          <Route path="/users" element={<UsersManager />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default AdminDashboard;