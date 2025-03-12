import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/admin/Table";
import { Plus } from "lucide-react";

const BookingsManager = () => {
  const [bookings, setBookings] = useState([]);
  const [isAddBookingModalOpen, setIsAddBookingModalOpen] = useState(false);
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newBooking, setNewBooking] = useState({
    amount: "",
    bookingDate: "",
    bookingTime: "",
    dropLocation: "",
    pickupLocation: "",
    totalKm: "",
    userEmail: "",
    driverId: "",
    vehicleId: "",
    status: "pending",
  });

  const API_BASE_URL = "http://localhost:8080/mega_city_cab_war/"; // Replace with your backend URL

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // Assuming you store the JWT token in localStorage
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const getAllBookings = async () => {
    console.log("Fetching bookings...");
    try {
      const response = await axios.get(`${API_BASE_URL}/booking?action=all`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const responseData = response.data;

      if (responseData.code === 200) {
        console.log("Bookings Data:", responseData.data);
        setBookings(responseData.data);
      } else {
        console.error("Error fetching bookings:", responseData.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const handleAddBooking = () => {
    setIsAddBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddBookingModalOpen(false);
    setIsEditBookingModalOpen(false);
    setSelectedBooking(null);
    setNewBooking({
      amount: "",
      bookingDate: "",
      bookingTime: "",
      dropLocation: "",
      pickupLocation: "",
      totalKm: "",
      userEmail: "",
      driverId: "",
      vehicleId: "",
      status: "pending",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedBooking) {
      setSelectedBooking({
        ...selectedBooking,
        [name]: value,
      });
    } else {
      setNewBooking({
        ...newBooking,
        [name]: value,
      });
    }
  };

  const handleRowClick = (booking) => {
    // Only open the modal if the booking status is "Pending"
    if (booking.status === "pending") {
      setSelectedBooking(booking);
      setIsEditBookingModalOpen(true);
    } else {
      alert("Only bookings with 'pending' status can be edited.");
    }
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_BASE_URL}booking`,
        {
          bookingId: selectedBooking.bookingId,
          ...selectedBooking,
        },
        getAuthHeaders()
      );

      if (response.data.code === 200) {
        console.log("Booking updated successfully:", response.data);
        getAllBookings();
        handleCloseModal();
      } else {
        console.error("Error updating booking:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/booking?bookingId=${selectedBooking.bookingId}`, getAuthHeaders());
      getAllBookings();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/booking`, newBooking, getAuthHeaders());
      getAllBookings();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  const columns = [
    { header: "Booking ID", accessor: "bookingId" },
    { header: "Amount", accessor: "amount" },
    { header: "Booking Date", accessor: "bookingDate" },
    { header: "Booking Time", accessor: "bookingTime" },
    { header: "Drop Location", accessor: "dropLocation" },
    { header: "Pickup Location", accessor: "pickupLocation" },
    { header: "Total Km", accessor: "totalKm" },
    { header: "userEmail", accessor: "userEmail" },
    { header: "Driver ID", accessor: "driverId" },
    { header: "Vehicle ID", accessor: "vehicleId" },
    { header: "Status", accessor: "status" },
  ];

  const updateBooking = async (event) => {
    event.preventDefault();
    const bookingReq = {
      bookingId: selectedBooking.bookingId,
      amount: selectedBooking.amount,
      bookingDate: selectedBooking.bookingDate,
      bookingTime: selectedBooking.bookingTime,
      dropLocation: selectedBooking.dropLocation,
      pickupLocation: selectedBooking.pickupLocation,
      totalKm: selectedBooking.totalKm,
      userEmail: selectedBooking.userEmail,
      driverId: selectedBooking.driverId,
      vehicleId: selectedBooking.vehicleId,
      status: "completed",
    };
    console.log('bookingReq', bookingReq);
  
    try {
      const response = await fetch(
        "http://localhost:8080/mega_city_cab_war/booking",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(bookingReq),
          credentials: "include",
        }
      );
  
      const data = await response.json();
      console.log('Response data:', data); // Log the response data
  
      if (response.ok) {
        alert('Booking updated successfully');
      } else {
        alert('Failed to update booking: ' + data.message); // Show error message from backend
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert('An error occurred while updating the booking');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings Manager</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleAddBooking}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Booking
        </button>
      </div>

      {/* Table Container with Scrollbar */}
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <Table columns={columns} data={bookings} onRowClick={handleRowClick} />
      </div>

      {/* Add Booking Modal */}
      {isAddBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add New Booking</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="amount"
                placeholder="Amount"
                className="w-full p-3 border rounded-lg"
                value={newBooking.amount}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bookingDate"
                placeholder="Booking Date"
                className="w-full p-3 border rounded-lg"
                value={newBooking.bookingDate}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bookingTime"
                placeholder="Booking Time"
                className="w-full p-3 border rounded-lg"
                value={newBooking.bookingTime}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="dropLocation"
                placeholder="Drop Location"
                className="w-full p-3 border rounded-lg"
                value={newBooking.dropLocation}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pickupLocation"
                placeholder="Pickup Location"
                className="w-full p-3 border rounded-lg"
                value={newBooking.pickupLocation}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="totalKm"
                placeholder="Total Km"
                className="w-full p-3 border rounded-lg"
                value={newBooking.totalKm}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="userEmail"
                placeholder="Customer ID"
                className="w-full p-3 border rounded-lg"
                value={newBooking.userEmail}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="driverId"
                placeholder="Driver ID"
                className="w-full p-3 border rounded-lg"
                value={newBooking.driverId}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="vehicleId"
                placeholder="Vehicle ID"
                className="w-full p-3 border rounded-lg"
                value={newBooking.vehicleId}
                onChange={handleInputChange}
                required
              />
              <select
                name="status"
                className="w-full p-3 border rounded-lg"
                value={newBooking.status}
                onChange={handleInputChange}
                required
              >
                <option value="pending">pending</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </select>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Add Booking
              </button>
            </form>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {isEditBookingModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Edit Booking</h2>
            <form className="space-y-4" onSubmit={handleUpdateBooking}>
              <input
                type="text"
                name="amount"
                placeholder="Amount"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.amount}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bookingDate"
                placeholder="Booking Date"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.bookingDate}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bookingTime"
                placeholder="Booking Time"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.bookingTime}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="dropLocation"
                placeholder="Drop Location"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.dropLocation}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pickupLocation"
                placeholder="Pickup Location"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.pickupLocation}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="totalKm"
                placeholder="Total Km"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.totalKm}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="userEmail"
                placeholder="Customer ID"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.userEmail}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="driverId"
                placeholder="Driver ID"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.driverId}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="vehicleId"
                placeholder="Vehicle ID"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.vehicleId}
                onChange={handleInputChange}
                required
              />
              <select
                name="status"
                className="w-full p-3 border rounded-lg"
                value={selectedBooking.status}
                onChange={handleInputChange}
                required
              >
                <option value="pending">pending</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </select>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                  onClick={updateBooking}
                >
                  Update Booking
                </button>
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                  onClick={handleDeleteBooking}
                >
                  Delete Booking
                </button>
              </div>
            </form>
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-700"
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