import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const BuyerOrderDetails = () => {
  const {orderId } = useParams(); // Extract orderId from URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [userId, setUserId] = useState("");

  // Fetch order details on mount
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log(orderId)
        const response = await axios.get(
          `http://localhost:8084/api/v1/order/${orderId}`
        );
        setOrderDetails(response.data);
        setUserId(response.data.userId); // Update userId after fetching order details
        console.log(response.data.userId);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order details.");
      }
    };
  
    fetchOrderDetails();
  }, [orderId]);


  if (error) {
    return <Typography color="red">{error}</Typography>;
  }

  if (!orderDetails) {
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
            <Typography color="blue-gray"><strong>Status: </strong>{orderDetails.status}</Typography>
            <Typography color="blue-gray">
            <strong>Total Price: </strong>${calculateTotalPrice(orderDetails.items)}
            </Typography>
          </div>

          </div>

          <div>
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Items
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              {orderDetails.items.map((item, index) => (
                <Card
                  key={index}
                  className="shadow-lg "
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

export default BuyerOrderDetails;
