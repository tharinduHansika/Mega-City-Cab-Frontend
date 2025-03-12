import React from "react";

export function AvailableCars({ cars, onCarSelect }) {
  return (
    <div className="bg-white/90 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Cars</h2>
      <div className="grid gap-4">
        {cars.map((car) => (
          <div
            key={car.vehicleId}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => onCarSelect(car.vehicleId)} // Trigger the callback when a car is clicked
          >
            <div>
              <h3 className="font-semibold">{car.vehicleBrand} {car.vehicleModel}</h3>
              <p className="text-sm text-gray-500">Vehicle Number: {car.VehicleNumber}</p>
              <p className="text-sm text-gray-500">Passenger Count: {car.passengerCount}</p>
              <p className="text-sm text-gray-500">Price Per Km: {car.pricePerKm}</p>
              <p className="text-sm text-gray-500">Vehicle Id: {car.vehicleId}</p>
            </div>
            <div className="text-yellow-500">★ {car.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}