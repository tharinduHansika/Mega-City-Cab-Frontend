import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { CarCategory } from "./CarCategory";
import { LocationSelector } from "./LocationSelector";
import { AvailableCars } from "./AvailableCars";
import { MapComponent } from "./MapComponent";
import PaymentModal from "./PaymentModal";
import CardPayment from "./CardPayment ";
import { Button, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
 
export function HeroSection({ onNextClick }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [categories, setCategories] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [distance, setDistance] = useState(null);
  const [totalFare, setTotalFare] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vehicle types from the backend
    const fetchVehicleTypes = async () => {
      try {
        const response = await fetch('http://localhost:8080/mega_city_cab_war/vehicle?action=by-category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch vehicle types');
        }

        const data = await response.json();
        if (data.code === 200) {
          setCategories(data.data.map(type => ({
            id: type.toString(),
            name: `${type}`,
            price: `${type * 5}/km`, // Example pricing logic
          })));
        }
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    };

    fetchVehicleTypes();
  }, []);

  const fetchAvailableCars = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:8080/mega_city_cab_war/vehicle?action=by-availability&vehicleType=${encodeURIComponent(category)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch available cars");
      }

      const data = await response.json();
      if (data.code === 200) {
        setAvailableCars(data.data);
        console.log("data fetched");
      }
    } catch (error) {
      console.error("Error fetching available cars:", error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchAvailableCars(categoryId);
  };

  const handleNextClick = () => {
    const role = localStorage.getItem('role');

    if (role === 'User') {
      setHasToken(true);
    } else if (role === 'Admin') {
      navigate('/admin');
    } else {
      setHasToken(false);
      setIsLoginModalOpen(true);
      if (onNextClick) {
        onNextClick();
      }
    }
  };

  const showPaymentModal = () => {
    setIsModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const calculateFare = (distance) => {
    if (selectedCategory && distance) {
      const pricePerKm = parseFloat(categories.find(cat => cat.id === selectedCategory).price.split('/')[0]);
      const fare = distance * pricePerKm;
      setTotalFare(fare);
    }
  };

  return (
    <div className="relative w-full min-h-screen pb-12">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://media.istockphoto.com/id/1181382649/photo/colombo-sri-lanka-december-05-2018-view-of-the-colombo-city-skyline-with-modern-architecture.jpg?s=612x612&w=0&k=20&c=XIS9COAwhGXkQYqGKHcabMEpc64B_uwT2utuonAoWl0=")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Your Ride, Your Way
        </h1>
        <p className="text-xl text-white mb-12">
          Choose from our premium fleet of vehicles
        </p>

        {/* Car Categories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <CarCategory
              key={category.id}
              name={category.name}
              price={category.price}
              selected={selectedCategory === category.id}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>

        {/* Location Selectors and Date/Time Inputs */}
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-full">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LocationSelector
                icon={<MapPin className="text-gray-400" />}
                placeholder="Pickup Location"
                value={pickup}
                onChange={setPickup}
              />
              <LocationSelector
                icon={<MapPin className="text-gray-400" />}
                placeholder="Drop-off Location"
                value={dropoff}
                onChange={setDropoff}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Input */}
              <div className="flex items-center border rounded-lg p-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {/* Time Input */}
              <div className="flex items-center border rounded-lg p-3">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Next Button */}
              <button
                onClick={handleNextClick}
                disabled={
                  !selectedCategory || !pickup || !dropoff || !date || !time
                }
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 
                  disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>

              {/* Confirm Button */}
              <button
                disabled={
                  !selectedCategory || !pickup || !dropoff || !date || !time || !hasToken
                }
                className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-400 
                  disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Confirm
              </button>

              {/* Payment Button */}
              <button
                disabled={!hasToken}
                className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-400 
                  disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                onClick={showPaymentModal}
              >
                Payment
              </button>
            </div>
          </div>
        </div>

        {/* Map Component */}
        <MapComponent 
          startCity={pickup} 
          endCity={dropoff} 
          onDistanceCalculated={setDistance} 
          onFareCalculated={calculateFare} 
        />

        {/* Display Distance and Fare */}
        {distance && (
          <div className="mt-4 text-white">
            <p>Distance: {distance.toFixed(2)} km</p>
            {totalFare && <p>Total Fare: Rs. {totalFare.toFixed(2)}</p>}
          </div>
        )}

        {/* Available Cars */}
        {selectedCategory && (
          <div className="mt-8">
            <AvailableCars cars={availableCars} />
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <Modal open={isModalOpen} footer={null} onCancel={handlePaymentModalClose}>
        <CardPayment />
      </Modal>

      {/* Login Modal */}
      <Modal
        title="Login Required"
        open={isLoginModalOpen}
        onOk={handleLoginModalClose}
        onCancel={handleLoginModalClose}
      >
        <p>You need to log in as a user to proceed with the payment.</p>
      </Modal>
    </div>
  );
}