import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Receipt = () => {
  const [bookingData, setBookingData] = useState(null); // State to store booking data

  const handleDownload = () => {
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('receipt.pdf');
    });
  };

  const getBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/mega_city_cab_war/booking?action=by-id&bookingId=${bookingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include", // Ensure cookies/tokens are handled
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Booking data:", data.data);
        setBookingData(data.data[0]); // Set the booking data in state
      } else {
        console.error("Failed to fetch booking:", data.message);
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  };

  useEffect(() => {
    const bookingId = localStorage.getItem("bookingId");
    if (bookingId) {
      getBooking(bookingId);
    } else {
      console.error("No bookingId found in localStorage");
    }
  }, []);

  return (
    <div>
      <div id="receipt" style={styles.receipt}>
        <h1 style={styles.title}>MegacityCab</h1>
        <h2 style={styles.subtitle}>Contact Us</h2>
        <div style={styles.details}>
          {bookingData ? ( // Check if bookingData is available
            <>
              <p><strong>Booking ID:</strong> {bookingData.bookingId}</p>
              <p><strong>Customer Email:</strong> {bookingData.userEmail}</p>
              <p><strong>Driver ID:</strong> {bookingData.driverId}</p>
              <p><strong>Start Location:</strong> {bookingData.pickupLocation}</p>
              <p><strong>Drop Location:</strong> {bookingData.dropLocation}</p>
              <p><strong>Total KM:</strong> {bookingData.totalKm} km</p>
              <p><strong>Date:</strong> {bookingData.bookingDate}</p>
              <p><strong>Time:</strong> {bookingData.bookingTime}</p>
              <p><strong>Amount:</strong> ${bookingData.amount}</p>
              <p><strong>Status:</strong> {bookingData.status}</p>
            </>
          ) : (
            <p>Loading booking details...</p> // Show a loading message while data is being fetched
          )}
        </div>
      </div>
      <button onClick={handleDownload} style={styles.button}>Download Receipt</button>
    </div>
  );
};

const styles = {
  receipt: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    width: '400px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#4CAF50',
  },
  subtitle: {
    textAlign: 'center',
    color: '#555',
  },
  details: {
    marginTop: '20px',
  },
  button: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Receipt;