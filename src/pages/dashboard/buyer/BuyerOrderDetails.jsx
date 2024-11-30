import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "@/services/orderService";
import { addReview } from "@/services/productServices";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Rating,
} from "@material-tailwind/react";

const BuyerOrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId);
        setOrderDetails(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order details.");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const openReviewDialog = (item) => {
    setCurrentItem(item);
    setRating(0);
    setReviewMessage("");
    setShowDialog(true);
  };

  const closeReviewDialog = () => {
    setShowDialog(false);
  };

  const handleSubmitReview = () => {
    console.log("Submitting review for:", currentItem.productID);
    console.log("Rating:", rating, "Message:", reviewMessage);
    // Add logic to send review data to your backend here.
    const res = addReview({productId: currentItem.productID, comment: reviewMessage, rating: rating});
    closeReviewDialog();
  };

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
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center w-full">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                  index <= currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
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

  if (error) {
    return <Typography color="red">{error}</Typography>;
  }

  if (!orderDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Card className="w-full max-w-4xl mx-auto my-8 shadow-lg" style={{ backgroundColor: "#f5f7fa" }}>
        <CardHeader className="bg-green-500 p-4 text-center" floated={false} shadow={false}>
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
                    <Typography variant="h5" color="blue-gray" className="text-center">
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
                      color={orderDetails.status.toLowerCase() === "delivered" ? "green" : "gray"}
                      onClick={() => openReviewDialog(item)}
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

      {/* Review Dialog */}
      <Dialog open={showDialog} handler={closeReviewDialog}>
        <DialogHeader>Write a Review</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Typography variant="h6">Rating:</Typography>
              <Rating
                value={rating}
                onChange={(newRating) => setRating(newRating)}
                total={5}
              />
            </div>
            <Textarea
              label="Review Message"
              placeholder="Write your review here..."
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeReviewDialog}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSubmitReview}
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default BuyerOrderDetails;
