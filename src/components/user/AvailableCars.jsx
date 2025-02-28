import React from "react";

export function AvailableCars({ category }) {
  // Mock data for available cars
  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      eta: "5 mins",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Honda Civic",
      eta: "8 mins",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Tesla Model 3",
      eta: "12 mins",
      rating: 4.9,
    },
  ];

  return (
    <div className="bg-white/90 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Cars</h2>
      <div className="grid gap-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div>
              <h3 className="font-semibold">{car.name}</h3>
              <p className="text-sm text-gray-500">ETA: {car.eta}</p>
            </div>
            <div className="text-yellow-500">★ {car.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}