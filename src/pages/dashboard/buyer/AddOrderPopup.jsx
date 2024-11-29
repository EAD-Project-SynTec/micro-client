import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';

const AddOrderPopup = ({ onClose }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState(""); // State for address input
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [orderDate, setOrderDate] = useState(""); // State for order date

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/v1/product/26");
        setProductDetails(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchProductDetails();
  }, []);

  // Set the current date and time
  useEffect(() => {
    const currentDateTime = new Date().toISOString(); // Get current date and time in ISO format
    setOrderDate(currentDateTime); // Set order date state
  }, []);

  const handleSubmit = async () => {
    if (!address || !productDetails) {
      setError("Address and product details are required.");
      return;
    }

    // Dynamically create the items array based on fetched product details and selected quantity
    const orderData = {
      userId: "User10", // Hardcoded userId for now
      status: "Processing",
      address: address, // Include address in order data
      dateCreated: orderDate, // Include current date and time
      items: [
        {
          productId: productDetails.id, // Dynamic productId
          quantity: quantity, // Selected quantity
          price: productDetails.price, // Fetched price
        },
      ],
    };

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:8084/api/v1/order/create-order",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      console.log("Order created successfully:", response.data);
    } catch (err) {
      setError("Failed to create order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>Add Order</h2>

        {/* Display product details beautifully */}
        {productDetails ? (
          <div style={styles.productCard}>
            <img
              src={productDetails.imageUrl}
              alt={productDetails.name}
              style={styles.productImage}
            />
            <div style={styles.productInfo}>
              <h3 style={styles.productName}>{productDetails.name}</h3>
              <p style={styles.productDescription}>{productDetails.description}</p>
              <p>
                <strong>Category:</strong> {productDetails.category}
              </p>
              <p>
                <strong>Price:</strong> ${productDetails.price.toFixed(2)}
              </p>
              <p>
                <strong>Available Quantity:</strong> {productDetails.quantity}
              </p>
              
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}

        {/* Quantity selection dropdown */}
        <div style={styles.inputField}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="quantity-select-label">Quantity</InputLabel>
            <Select
              labelId="quantity-select-label"
              id="quantity-select"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              label="Quantity"
            >
              {productDetails && 
                [...Array(productDetails.quantity).keys()].map(i => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/* Address input field */}
        <div style={styles.inputField}>
          <TextField
            id="outlined-textarea"
            label="Delivery Address"
            placeholder="Enter your address"
            multiline
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Order form actions */}
        <div style={styles.actions}>
          <Button variant="contained"
            onClick={handleSubmit}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Order"}
          </Button>
          <Button variant="contained" onClick={onClose} style={styles.closeButton}>
            Close
          </Button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>Order created successfully!</p>}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  productCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  productImage: {
    width: "120px",
    height: "120px",
    borderRadius: "10px",
    objectFit: "cover",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  productInfo: {
    textAlign: "left",
  },
  productName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  productDescription: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#666",
  },
  inputField: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  closeButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#f44336",
    color: "white",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  success: {
    color: "green",
    marginTop: "10px",
  },
};

export default AddOrderPopup;
