import React, { useState } from "react";
import Table from "../../components/admin/Table";

const BookingsManager = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "Alice Johnson",
      driver: "John Doe",
      vehicle: "Toyota Camry",
      status: "Pending",
      date: "2024-01-20",
    },
    {
      id: 2,
      customer: "Bob Wilson",
      driver: "Jane Smith",
      vehicle: "Honda Civic",
      status: "Approved",
      date: "2024-01-21",
    },
  ]);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const columns = [
    {
      header: "Customer",
      accessor: "customer",
    },
    {
      header: "Driver",
      accessor: "driver",
    },
    {
      header: "Vehicle",
      accessor: "vehicle",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Date",
      accessor: "date",
    },
  ];

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setIsActionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsActionModalOpen(false);
    setSelectedBooking(null);
  };

  const handleApprove = () => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === selectedBooking.id ? { ...booking, status: "Approved" } : booking
    );
    setBookings(updatedBookings);
    handleCloseModal();
  };

  const handleDecline = () => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === selectedBooking.id ? { ...booking, status: "Declined" } : booking
    );
    setBookings(updatedBookings);
    handleCloseModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings Manager</h1>
      </div>
      <Table columns={columns} data={bookings} onRowClick={handleRowClick} />

      {/* Action Modal */}
      {isActionModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Customer:</span> {selectedBooking.customer}
              </p>
              <p>
                <span className="font-semibold">Driver:</span> {selectedBooking.driver}
              </p>
              <p>
                <span className="font-semibold">Vehicle:</span> {selectedBooking.vehicle}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {selectedBooking.status}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {selectedBooking.date}
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                onClick={handleDecline}
              >
                Decline
              </button>
            </div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManager;