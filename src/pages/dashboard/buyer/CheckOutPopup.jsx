import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";

const CheckOutPopup = ({ onClose, userId, orderTotal }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState(""); // New state for address

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/api/v1/cart?email=${userId}`);
        setCartItems(response.data.cartItems);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to fetch cart items.");
      }
    };

    fetchCartItems();
  }, [userId]);

  const createOrder = async () => {
    if (!address.trim()) {
      Swal.fire("Warning", "Please enter a delivery address.", "warning");
      return;
    }

    const orderData = {
      userId,
      address, // Include address in the order
      dateCreated: new Date().toISOString(),
      items: cartItems.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
        price: item.price,
        productName: item.name
      })),
    };

    setIsLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:8084/api/v1/order", orderData, {
        headers: { "Content-Type": "application/json" },
      });

    // Clear the cart after placing the order
    await axios.delete(`http://localhost:8084/api/v1/cart/all?email=${userId}`);


    Swal.fire("Success", "Order placed successfully!", "success").then(() => {
      // Refresh the page after the order is placed successfully
      window.location.reload();
    });
    } catch (err) {
      setError("Failed to place the order.");
      Swal.fire("Error", "Failed to place the order. Please try again.", "error");
      console.error("Error creating order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full text-center shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-green-500">Place Order</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {cartItems.length > 0 ? (
      <ul className="list-none p-0 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cartItems.map((item, index) => (
          <li key={index} className="flex items-center gap-5 mb-4">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p className="text-lg font-bold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-600">Price: Rs.{((item.price) * (item.quantity)).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      ) : (
        <p>No items in the cart.</p>
      )}


{orderTotal && (
  <div className="mt-6 flex flex-col items-start space-y-1">
    <div className="flex items-center space-x-2">
      <span className="text-xl font-semibold text-gray-800">Order Total:</span>
      <span className="text-xsm text-gray-800">Rs. {orderTotal.toFixed(2)}</span>
    </div>
    <div className="text-sm text-gray-500">Includes tax and delivery</div>
  </div>
)}

        <div className="mt-5 mb-5">
          <TextField
            id="outlined-multiline-static"
            label="Address"
            placeholder="Enter delivery address"
            multiline
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </div>

        <div className="flex justify-around">
          <button
            className="bg-green-500 border border-green-500 rounded-full py-2 px-8 text-white"
            onClick={createOrder}
            disabled={isLoading}
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
          <button
            className="bg-red-500 border border-red-500 rounded-full py-2 px-8 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPopup;
