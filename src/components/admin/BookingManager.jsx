import React, { useState } from "react";
import Table from "../../components/admin/Table";

const BookingsManager = () => {
  const [bookings] = useState([
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

  const handleRowClick = (row) => {
    console.log("Toggle booking status:", row.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings Manager</h1>
      </div>
      <Table columns={columns} data={bookings} onRowClick={handleRowClick} />
    </div>
  );
};

export default BookingsManager;