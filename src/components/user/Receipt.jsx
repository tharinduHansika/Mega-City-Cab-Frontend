import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Receipt = () => {
  const handleDownload = () => {
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('receipt.pdf');
    });
  };

  return (
    <div>
      <div id="receipt" style={styles.receipt}>
        <h1 style={styles.title}>MegacityCab</h1>
        <h2 style={styles.subtitle}>Contact Us</h2>
        <div style={styles.details}>
          <p><strong>Booking ID:</strong> 123456</p>
          <p><strong>Payment ID:</strong> 654321</p>
          <p><strong>Customer ID:</strong> CUST001</p>
          <p><strong>Driver ID:</strong> DRIVER001</p>
          <p><strong>Start Location:</strong> Central Park</p>
          <p><strong>Drop Location:</strong> Times Square</p>
          <p><strong>Total KM:</strong> 10 km</p>
          <p><strong>Date:</strong> 2023-10-01</p>
          <p><strong>Time:</strong> 10:00 AM</p>
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