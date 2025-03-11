// src/CardPayment.js
import React, { useState } from 'react';
import './CardPayment.css'; // Import the CSS file for styling

const CardPayment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    // Here you would typically handle the payment processing
    alert('Payment submitted!');
  };

  return (
    <div className="card-payment-container">
      <h2 className="card-payment-title">Card Payment</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="card-payment-form">
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="form-group">
          <label>Card Holder</label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date (MM/YY)</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </div>
        <button type="submit" className="pay-button">Pay Now</button>
      </form>
    </div>
  );
};

export default CardPayment;