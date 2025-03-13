import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/admin/Table";
import { Plus } from "lucide-react";

const VehiclesManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isEditVehicleModalOpen, setIsEditVehicleModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    vehicleNumber: "",
    vehicleType: "",
    passengerCount: "",
    pricePerKm: "",
    vehicleBrand: "",
    vehicleModel: "",
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

  const getAllVehicles = async () => {
    console.log("Fetching vehicles...");
    try {
        const response = await axios.get(`${API_BASE_URL}/vehicle?action=all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        // Axios automatically parses JSON, so use response.data
        const responseData = response.data;

        if (responseData.code === 200) {
            console.log("Vehicles Data:", responseData.data); // Corrected logging
            setVehicles(responseData.data);
        } else {
            console.error("Error fetching vehicles:", responseData.message);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
};


  useEffect(() => {
    getAllVehicles();
  }, []);

  // Add a new vehicle
  const handleAddVehicle = () => {
    setIsAddVehicleModalOpen(true);
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setIsAddVehicleModalOpen(false);
    setIsEditVehicleModalOpen(false);
    setSelectedVehicle(null);
    setNewVehicle({
      vehicleNumber: "",
      vehicleType: "",
      passengerCount: "",
      pricePerKm: "",
      vehicleBrand: "",
      vehicleModel: "",
      status: "Available",
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedVehicle) {
      setSelectedVehicle({
        ...selectedVehicle,
        [name]: value,
      });
    } else {
      setNewVehicle({
        ...newVehicle,
        [name]: value,
      });
    }
  };

  // Handle row click to edit a vehicle
  const handleRowClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditVehicleModalOpen(true);
  };

  // Update a vehicle
const handleUpdateVehicle = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  try {
    console.log("selectedd vehicle id update :"+selectedVehicle.vehicleId);
    // Send a PUT request to update the vehicle
    const response = await axios.put(
       
      `${API_BASE_URL}vehicle`, // Endpoint for updating a vehicle
      {
        vehicleId: selectedVehicle.vehicleId, // Include the vehicle ID to identify the vehicle to update
        ...selectedVehicle, // Spread the updated vehicle details
      },
      getAuthHeaders() // Include authentication headers
    );

    // Check if the update was successful
    if (response.data.code === 200) {
      console.log("Vehicle updated successfully:", response.data);
      getAllVehicles(); // Refresh the vehicle list
      handleCloseModal(); // Close the modal
    } else {
      console.error("Error updating vehicle:", response.data.message);
    }
  } catch (error) {
    console.error("Error updating vehicle:", error);
  }
};

  // Delete a vehicle
  const handleDeleteVehicle = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/vehicle?vehicleId=${selectedVehicle.vehicleId}`, getAuthHeaders());
      getAllVehicles(); // Refresh the list
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  // Submit a new vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/vehicle`, newVehicle, getAuthHeaders());
      getAllVehicles(); // Refresh the list
      handleCloseModal();
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const columns = [
    { header: "Vehicle Number", accessor: "vehicleNumber" },
    { header: "Vehicle Type", accessor: "vehicleType" },
    { header: "Passenger Count", accessor: "passengerCount" },
    { header: "Price Per Km", accessor: "pricePerKm" },
    { header: "Vehicle Brand", accessor: "vehicleBrand" },
    { header: "Status", accessor: "status" },
    { header: "Vehicle Model", accessor: "vehicleModel" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Vehicles Manager</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleAddVehicle}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Vehicle
        </button>
      </div>
      <Table columns={columns} data={vehicles} onRowClick={handleRowClick} />

      {/* Add Vehicle Modal */}
      {isAddVehicleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add New Vehicle</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="vehicleNumber"
                placeholder="Vehicle Number"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.vehicleNumber}
                onChange={handleInputChange}
                required
              />
              {/* <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.vehicleType}
                onChange={handleInputChange}
                required
              /> */}
              <select
                name="vehicleType"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.vehicleType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="mini">Mini</option>
                <option value="flex">Flex</option>
                <option value="car">Car</option>
                <option value="mini van">Mini Van</option>
                <option value="van">Van</option>
              </select>
              <input
                type="text"
                name="passengerCount"
                placeholder="Passenger Count"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.passengerCount}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pricePerKm"
                placeholder="Price Per Km"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.pricePerKm}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="vehicleBrand"
                placeholder="Vehicle Brand"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.vehicleBrand}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="vehicleModel"
                placeholder="Vehicle Model"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.vehicleModel}
                onChange={handleInputChange}
                required
              />
              <select
                name="status"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.status}
                onChange={handleInputChange}
                required
              >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Add Vehicle
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

      {/* Edit Vehicle Modal */}
      {isEditVehicleModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Edit Vehicle</h2>
            <form className="space-y-4" onSubmit={handleUpdateVehicle}>
              <input
                type="text"
                name="vehicleNumber"
                placeholder="Vehicle Number"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.vehicleNumber}
                onChange={handleInputChange}
                required
              />
              {/* <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.vehicleType}
                onChange={handleInputChange}
                required
              /> */}
              <select
                name="vehicleType"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.vehicleType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="mini">Mini</option>
                <option value="flex">Flex</option>
                <option value="car">Car</option>
                <option value="mini van">Mini Van</option>
                <option value="van">Van</option>
              </select>
              <input
                type="text"
                name="passengerCount"
                placeholder="Passenger Count"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.passengerCount}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pricePerKm"
                placeholder="Price Per Km"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.pricePerKm}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="vehicleBrand"
                placeholder="Vehicle Brand"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.vehicleBrand}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="vehicleModel"
                placeholder="Vehicle Model"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.vehicleModel}
                onChange={handleInputChange}
                required
              />
              <select
                name="status"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.status}
                onChange={handleInputChange}
                required
              >
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Update Vehicle
                </button>
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                  onClick={handleDeleteVehicle}
                >
                  Delete Vehicle
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

export default VehiclesManager;