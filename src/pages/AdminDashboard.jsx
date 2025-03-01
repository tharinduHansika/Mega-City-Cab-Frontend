// src/pages/AdminDashboard.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/admin/Layout";
import DriversManager from "../components/admin/DriverManager";
import VehicleManager from "../components/admin/VehicleManager";
import BookingsManager from "../components/admin/BookingManager";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <Layout>
        <Routes>
          <Route path="/" element={<DriversManager />} />
          <Route path="/drivers" element={<DriversManager />} />
          <Route path="/vehicles" element={<VehicleManager />} />
          <Route path="/bookings" element={<BookingsManager />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default AdminDashboard;