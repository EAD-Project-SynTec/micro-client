import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "@/services/orderService";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Typography,
} from "@material-tailwind/react";
import MainNav from "@/pages/user/components/MainNav";

const BuyerOrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = () => {
      try {
        getOrderDetails(orderId).then((response) => {
          setOrderDetails(response.data);
        });
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
    return items
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
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
      <MainNav/>
      <Card
        className="w-full max-w-4xl mx-auto my-8 shadow-lg"
        style={{ backgroundColor: "#f5f7fa" }}
      >
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
              <Typography
                variant="h6"
                className="font-bold"
                color="blue-gray"
              >
                Order Reference: {orderDetails.id}
              </Typography>
              <Typography color="blue-gray">
                <strong>Date Created: </strong>
                {formatDate(orderDetails.dateCreated)}
              </Typography>

              <Typography color="blue-gray">
                <strong>Total Price: </strong>Rs.
                {calculateTotalPrice(orderDetails.items)}
              </Typography>
              
            </div>
          </div>
          <Typography variant="h6" color="blue-gray">
                <strong>Status </strong>
              </Typography>
          {/* Updated Status Tracker */}
          {renderStatusTracker(orderDetails.status)}

          <div>
            <Typography variant="h6" color="blue-gray" className="mb-4">
              Items
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {orderDetails.items.map((item, index) => (
                <Card key={index} className="shadow-lg">
                  <CardBody className="flex flex-col items-start gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-32 object-cover rounded"
                    />
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="text-center"
                    >
                      {item.productName}
                    </Typography>
                    <Typography className="text-center" variant="h6">
                      Category: {item.category}
                    </Typography>
                    <Typography variant="h6">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="h6">
                      Price: Rs.{item.price}
                    </Typography>
                    <Button
                      variant="gradient"
                      disabled={orderDetails.status.toLowerCase() !== "delivered"}
                      className="w-full"
                      color={
                        orderDetails.status.toLowerCase() === "delivered"
                          ? "green"
                          : "gray"
                      }
                    >
                      Add Review
                    </Button>
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
