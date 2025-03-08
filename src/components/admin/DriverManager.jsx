import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/admin/Table";
import { Plus } from "lucide-react";

const DriversManager = () => {
  const [drivers, setDrivers] = useState([]);
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
  const [isEditDriverModalOpen, setIsEditDriverModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [newDriver, setNewDriver] = useState({
    name: "",
    age: "",
    email: "",
    licenseNumber: "",
    nicNumber: "",
    phoneNumber: "",
    homeAddress: "",
    status: "Available",
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

  const getAllDrivers = async () => {
    console.log("Fetching drivers...");
    try {
      const response = await axios.get(`${API_BASE_URL}/driver?action=all`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const responseData = response.data;

      if (responseData.code === 200) {
        console.log("Drivers Data:", responseData.data);
        setDrivers(responseData.data);
      } else {
        console.error("Error fetching drivers:", responseData.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  const handleAddDriver = () => {
    setIsAddDriverModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddDriverModalOpen(false);
    setIsEditDriverModalOpen(false);
    setSelectedDriver(null);
    setNewDriver({
      name: "",
      age: "",
      email: "",
      licenseNumber: "",
      nicNumber: "",
      phoneNumber: "",
      homeAddress: "",
      status: "Available",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedDriver) {
      setSelectedDriver({
        ...selectedDriver,
        [name]: value,
      });
    } else {
      setNewDriver({
        ...newDriver,
        [name]: value,
      });
    }
  };

  const handleRowClick = (driver) => {
    setSelectedDriver(driver);
    setIsEditDriverModalOpen(true);
  };

  const handleUpdateDriver = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_BASE_URL}driver`,
        {
          driverId: selectedDriver.driverId,
          ...selectedDriver,
        },
        getAuthHeaders()
      );

      if (response.data.code === 200) {
        console.log("Driver updated successfully:", response.data);
        getAllDrivers();
        handleCloseModal();
      } else {
        console.error("Error updating driver:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  const handleDeleteDriver = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/driver?driverId=${selectedDriver.driverId}`, getAuthHeaders());
      getAllDrivers();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/driver`, newDriver, getAuthHeaders());
      getAllDrivers();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding driver:", error);
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
    { header: "Email", accessor: "email" },
    { header: "License Number", accessor: "licenseNumber" },
    { header: "NIC Number", accessor: "nicNumber" },
    { header: "Phone Number", accessor: "phoneNumber" },
    { header: "Home Address", accessor: "homeAddress" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Drivers Manager</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleAddDriver}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Driver
        </button>
      </div>
      <Table columns={columns} data={drivers} onRowClick={handleRowClick} />

      {/* Add Driver Modal */}
      {isAddDriverModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add New Driver</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
                value={newDriver.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                className="w-full p-3 border rounded-lg"
                value={newDriver.age}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
                value={newDriver.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                className="w-full p-3 border rounded-lg"
                value={newDriver.licenseNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="nicNumber"
                placeholder="NIC Number"
                className="w-full p-3 border rounded-lg"
                value={newDriver.nicNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg"
                value={newDriver.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="homeAddress"
                placeholder="Home Address"
                className="w-full p-3 border rounded-lg"
                value={newDriver.homeAddress}
                onChange={handleInputChange}
                required
              />
              <select
                name="status"
                className="w-full p-3 border rounded-lg"
                value={newDriver.status}
                onChange={handleInputChange}
                required
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Add Driver
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

      {/* Edit Driver Modal */}
      {isEditDriverModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Edit Driver</h2>
            <form className="space-y-4" onSubmit={handleUpdateDriver}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
                value={selectedDriver.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                className="w-full p-3 border rounded-lg"
                value={selectedDriver.age}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
                value={selectedDriver.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                className="w-full p-3 border rounded-lg"
                value={selectedDriver.licenseNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="nicNumber"
                placeholder="NIC Number"
                className="w-full p-3 border rounded-lg"
                value={selectedDriver.nicNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg"
                value={selectedDriver.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="homeAddress"
                placeholder="Home Address"
                className="w-full p-3 border rounded-lg"
                value={selectedDriver.homeAddress}
                onChange={handleInputChange}
                required
              />
              <select
                name="status"
                className="w-full p-3 border rounded-lg"
                value={selectedDriver.status}
                onChange={handleInputChange}
                required
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
              </select>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Update Driver
                </button>
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                  onClick={handleDeleteDriver}
                >
                  Delete Driver
                </button>
              </div>
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
    </div>
  );
};

export default DriversManager;