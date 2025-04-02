import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";

const PaymentQRPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get data from URL parameters (passed from Checkout Page)
  const initialAmount = Number(queryParams.get("amount")) || 500;
  const initialOrderId = queryParams.get("orderId") || `ORD${Math.floor(Math.random() * 100000)}`;
  const initialRazorpayId = queryParams.get("razorpayId") || "RAZORPAY123XYZ";

  const [amount, setAmount] = useState(initialAmount);
  const [orderId] = useState(initialOrderId);
  const [razorpayId] = useState(initialRazorpayId);
  const [scannedData, setScannedData] = useState(null);

  const qrData = JSON.stringify({ amount, orderId, razorpayId });

  const handleScan = () => {
    setScannedData(JSON.parse(qrData));
  };

  return (
    <div style={styles.container}>
      <h2>Scan QR to Pay</h2>
      
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter Amount"
        style={styles.input}
      />
      
      <div style={styles.qrBox}>
        <QRCode value={qrData} size={250} />
        <p>Amount: ₹{amount}</p>
      </div>
      
      <button style={styles.button} onClick={handleScan}>Simulate Scan</button>
      
      {scannedData && (
        <div style={styles.detailsBox}>
          <h3>Payment Details</h3>
          <p>Amount: ₹{scannedData.amount}</p>
          <p>Order ID: {scannedData.orderId}</p>
          <p>Razorpay ID: {scannedData.razorpayId}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
  },
  input: {
    padding: "10px",
    fontSize: "18px",
    marginBottom: "15px",
    width: "250px",
    textAlign: "center",
  },
  qrBox: {
    padding: "15px",
    border: "2px solid #333",
    borderRadius: "10px",
    backgroundColor: "#fff",
    display: "inline-block",
    marginBottom: "15px",
  },
  button: {
    background: "#007bff",
    color: "white",
    padding: "12px 24px",
    fontSize: "18px",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    marginTop: "15px",
  },
  detailsBox: {
    marginTop: "20px",
    padding: "15px",
    border: "2px solid #333",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "left",
    width: "300px",
  },
};

export default PaymentQRPage;
