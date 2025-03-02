import React, { useState } from "react";
import Table from "../../components/admin/Table";
import { Plus } from "lucide-react";

const DriversManager = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "John Doe",
      license: "ABC123",
      status: "Active",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      license: "XYZ789",
      status: "Inactive",
      phone: "098-765-4321",
    },
  ]);

  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
  const [isEditDriverModalOpen, setIsEditDriverModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [newDriver, setNewDriver] = useState({
    name: "",
    license: "",
    status: "Active",
    phone: "",
  });

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Age",
      accessor: "age",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "License Number",
      accessor: "licenseNumber",
    },
    {
      header: "NIC Number",
      accessor: "nicNumber",
    },
    {
      header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      header: "Home Address",
      accessor: "homeAddress",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  const handleAddDriver = () => {
    setIsAddDriverModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddDriverModalOpen(false);
    setIsEditDriverModalOpen(false);
    setSelectedDriver(null);
    setNewDriver({
      name: "",
      license: "",
      status: "Active",
      phone: "",
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

  const handleUpdateDriver = (e) => {
    e.preventDefault();
    const updatedDrivers = drivers.map((driver) =>
      driver.id === selectedDriver.id ? selectedDriver : driver
    );
    setDrivers(updatedDrivers);
    handleCloseModal();
  };

  const handleDeleteDriver = () => {
    const updatedDrivers = drivers.filter((driver) => driver.id !== selectedDriver.id);
    setDrivers(updatedDrivers);
    handleCloseModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDriverWithId = {
      ...newDriver,
      id: drivers.length + 1, // Generate a new ID
    };
    setDrivers([...drivers, newDriverWithId]);
    handleCloseModal();
  };

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
                placeholder="License Name"
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
                placeholder="License Name"
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