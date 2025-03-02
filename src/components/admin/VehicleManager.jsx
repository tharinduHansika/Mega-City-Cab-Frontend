import React, { useState } from "react";
import Table from "../../components/admin/Table";
import { Plus } from "lucide-react";

const VehiclesManager = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      model: "Toyota Camry",
      plate: "ABC123",
      status: "Available",
      year: "2020",
    },
    {
      id: 2,
      model: "Honda Civic",
      plate: "XYZ789",
      status: "In Use",
      year: "2021",
    },
  ]);

  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isEditVehicleModalOpen, setIsEditVehicleModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    model: "",
    plate: "",
    status: "Available",
    year: "",
  });

  const columns = [
    {
      header: "Vehicle Number",
      accessor: "vehicleNumber",
    },
    {
      header: "Vehicle Type",
      accessor: "vehicleType",
    },
    {
      header: "Passenger Count",
      accessor: "passengerCount",
    },
    {
      header: "Price Per Km",
      accessor: "pricePerKm",
    },
    {
      header: "Vehicle Brand",
      accessor: "vehicleBrand",
    },
    {
      header: "Status",
      accessor: "status",
    },
   {
      header: "Vehicle Model",
      accessor: "vehicleModel",
    },
  ];

  const handleAddVehicle = () => {
    setIsAddVehicleModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddVehicleModalOpen(false);
    setIsEditVehicleModalOpen(false);
    setSelectedVehicle(null);
    setNewVehicle({
      model: "",
      plate: "",
      status: "Available",
      year: "",
    });
  };

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

  const handleRowClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditVehicleModalOpen(true);
  };

  const handleUpdateVehicle = (e) => {
    e.preventDefault();
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === selectedVehicle.id ? selectedVehicle : vehicle
    );
    setVehicles(updatedVehicles);
    handleCloseModal();
  };

  const handleDeleteVehicle = () => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== selectedVehicle.id);
    setVehicles(updatedVehicles);
    handleCloseModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicleWithId = {
      ...newVehicle,
      id: vehicles.length + 1, // Generate a new ID
    };
    setVehicles([...vehicles, newVehicleWithId]);
    handleCloseModal();
  };

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
              <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                className="w-full p-3 border rounded-lg"
                value={newVehicle.vehicleType}
                onChange={handleInputChange}
                required
              />
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
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Under Maintenance">Under Maintenance</option>
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
              <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                className="w-full p-3 border rounded-lg"
                value={selectedVehicle.vehicleType}
                onChange={handleInputChange}
                required
              />
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

export default VehiclesManager;