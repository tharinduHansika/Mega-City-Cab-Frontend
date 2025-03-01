import React, { useState } from "react";
import Table from "../../components/admin/Table";
import { Plus } from "lucide-react";

const VehicleManager = () => {
  const [vehicles] = useState([
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

  const columns = [
    {
      header: "Model",
      accessor: "model",
    },
    {
      header: "Plate",
      accessor: "plate",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Year",
      accessor: "year",
    },
  ];

  const handleRowClick = (row) => {
    console.log("Toggle status for vehicle:", row.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Vehicles Manager</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Vehicle
        </button>
      </div>
      <Table columns={columns} data={vehicles} onRowClick={handleRowClick} />
    </div>
  );
};

export default VehicleManager;