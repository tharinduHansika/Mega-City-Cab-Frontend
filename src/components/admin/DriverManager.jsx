import React, { useState } from "react";
import Table from "../../components/admin/Table";
import { Plus } from "lucide-react";

const DriversManager = () => {
  const [drivers] = useState([
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

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "License",
      accessor: "license",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Drivers Manager</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Driver
        </button>
      </div>
      <Table columns={columns} data={drivers} />
    </div>
  );
};

export default DriversManager;