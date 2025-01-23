import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { updateStatus } from "@/services/orderService";
import Swal from "sweetalert2";

const SellerOrderDetails = () => {
  const { orderId } = useParams(); // Extract orderId from URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  // Fetch order details on mount
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8084/api/v1/order/${orderId}`
        );
        setOrderDetails(response.data);
        setUserId(response.data.userId); 
        console.log(response.data.userId);

        // Fetch user details using the userId from the first API call
        const fetchUserDetails = async () => {
          try {
            const userResponse = await axios.get(
              `http://localhost:8082/api/user/${response.data.userId}` // Use the userId from the order details
            );
            setUserDetails(userResponse.data);
            console.log(userResponse.data);
          } catch (err) {
            console.error(err);
            setError("Failed to fetch user details.");
          }
        };

        // Call fetchUserDetails after order details are successfully fetched
        fetchUserDetails();
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order details.");
      }
    };

    fetchOrderDetails();
  }, [orderId]); 


  const updateOrderStatus = async () => {
    try {
      // Use the updateStatus function from the service
      await updateStatus(orderDetails.id, newStatus);
  
      // Update the local state with the new status
      setOrderDetails((prev) => ({ ...prev, status: newStatus }));
  
      // Show success alert using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order status updated successfully!",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
  
      // Show error alert using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update order status.",
        confirmButtonText: "Try Again",
      });
    }
  };
  


  if (error) {
    return <Typography color="red">{error}</Typography>;
  }

  if (!orderDetails || !userDetails) {
    return <Typography>Loading...</Typography>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    ).toFixed(2);
  };

  const renderStatusTracker = (status) => {
    const steps = ["Pending", "Processing", "Delivered"];
    const currentStep = steps.findIndex(
      (step) => step.toLowerCase() === status.toLowerCase()
    );

    return (
      <div className="mb-6">
        {/* Status Labels */}
        <div className="flex justify-start mb-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className="text-left flex-1"
              style={{ minWidth: "100px" }}
            >
              <Typography
                variant="small"
                className={`font-bold ${
                  index <= currentStep ? "text-green-500" : "text-gray-500"
                }`}
              >
                {step}
              </Typography>
            </div>
          ))}
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center w-full">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                  index <= currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    index < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card className="w-full max-w-4xl mx-auto my-8 shadow-lg" style={{ backgroundColor: '#f5f7fa' }}>
        <CardHeader
          className="bg-green-500 p-4 text-center"
          floated={false}
          shadow={false}
        >
          <Typography variant="h4" color="white">
            Order Details
          </Typography>
        </CardHeader>
        <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-6">
            <Typography variant="h6" className="font-bold" color="blue-gray">
              Order Reference: {orderDetails.id}
            </Typography>
            <Typography color="blue-gray">
            <strong>Date Created: </strong>{formatDate(orderDetails.dateCreated)}
            </Typography>
            <Typography color="blue-gray">
            <strong>Total Price: </strong>Rs.{calculateTotalPrice(orderDetails.items)}
            </Typography>
            
          </div>

          {/* Display user details */}
          <div className="mb-6">
            <Typography variant="h6" className="font-bold" color="blue-gray">
              Buyer Details:
            </Typography>
            <Typography color="blue-gray"><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</Typography>
                <Typography color="blue-gray"><strong>Email:</strong> {userDetails.email}</Typography>
                <Typography color="blue-gray"><strong>Address:</strong> {userDetails.addressLine1}, {userDetails.addressLine2}, {userDetails.addressLine3}</Typography>
                <Typography color="blue-gray"><strong>Phone Number:</strong> {userDetails.phoneNumber}</Typography>
        
          </div>
          </div>

          <Typography variant="h6" color="blue-gray"><strong>Status </strong></Typography>
          {/* Updated Status Tracker */}
          {renderStatusTracker(orderDetails.status)}

          <div className="mb-6">
            
            <Typography variant="h6" color="blue-gray" >
              Change Status
            </Typography>
            <Select
              label="Select New Status"
              value={newStatus}
              onChange={(value) => setNewStatus(value)}
            >
              <Option value="Pending">Pending</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Delivered">Delivered</Option>
            </Select>
            <Button
              onClick={updateOrderStatus}
              className="mt-4"
              color="green"
              disabled={!newStatus}
            >
              Update Status
            </Button>
          </div>

          <div>
            <Typography variant="h6" color="blue-gray" className="mb-4">
              Items
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {orderDetails.items.map((item, index) => (
                <Card
                  key={index}
                  className="shadow-lg"
                >
                  <CardBody className="flex flex-col items-start gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-32 object-cover rounded"
                    />
                    <Typography variant="h5" color="blue-gray" className="text-center">
                      {item.productName}
                    </Typography>
                    <Typography className="text-center" variant="h6">
                      Category: {item.category}
                    </Typography>
                    <Typography variant="h6">Quantity: {item.quantity}</Typography>
                    <Typography variant="h6">Price: Rs.{item.price}</Typography>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SellerOrderDetails;
