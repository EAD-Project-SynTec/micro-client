import OrderOverview from "@/buyer/components/OrderOverview";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  fetchCourierDetails,
  updateOrderStatus,
} from "@/services/orderServices";
import { Alert } from "@material-tailwind/react";
import { Icon } from "@mui/material";

export default function CourierOrderDetails() {
  const { orderID } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCourierDetails(orderID)
      .then((data) => {
        setOrderDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching courier details:", error);
      });
  }, [orderID]);

  const SendNotification = async (
    newOrderStatus,
    receiverEmail,
    receiverName,
    orderID,
    orderStatus
  ) => {
    try {
      var obj = {
        id: 0,
        from: "john.doe@example.com",
        to: receiverEmail,
        orderID: orderID,
        orderStatus: orderStatus,
        message:
          "Hey " +
          receiverName +
          ", Your Order " +
          orderID +
          " has been " +
          newOrderStatus +
          ", Please confirm your order",
        isSeen: true,
      };
      const response2 = await axios.post(
        "https://localhost:7144/api/Notification",
        obj
      );
      console.log("new notification", response2);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleSendNotification = () => {
    // Send farmer notification
    if (orderDetails.orderStatus.toLowerCase() === "ready to pickup") {
      SendNotification(
        "Picked Up",
        orderDetails.farmerID,
        orderDetails.farmerFName,
        orderDetails.orderID,
        orderDetails.orderStatus
      );
      setOpen(true);
    }
    // Send buyers notification
    if (orderDetails.orderStatus.toLowerCase() === "picked up") {
      SendNotification(
        "Delivered",
        orderDetails.buyerID,
        orderDetails.customerFName,
        orderDetails.orderID,
        orderDetails.orderStatus
      );
      setOpen(true);
    }
  };

  return (
    <div>
      <Alert
        icon={<Icon />}
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { x: 500 },
          unmount: { x: 100 },
        }}
        className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946] max-w-xl mx-10"
      >
        Confirmation sent successfully!
      </Alert>

      <div className="sm:-mt-12 -mt-4">
        {/* <OrderOverview title="Seller details" orderReference={orderReference}/> */}
        <OrderOverview orderDetails={orderDetails} type="Courier" />
      </div>

      <p className="text-sm text-red-300 flex justify-center sm:pt-10 pt-6 overline uppercase font-sans  ">
        The order has been {orderDetails.orderStatus}
      </p>
      {orderDetails.orderStatus &&
      (orderDetails.orderStatus.toLowerCase() === "ready to pickup" ||
        orderDetails.orderStatus.toLowerCase() === "picked up") && ( // Conditionally render button
          <div className="flex flex-row sm:space-x-16 space-x-4 justify-center sm:pt-8 pt-6">
            <div className="bg-gray-200 shadow-md h-10 w-32 rounded-lg flex items-center justify-center font-medium text-gray-800">
              {orderDetails.orderStatus.toLowerCase() === "ready to pickup"
                ? "Picked Up"
                : "Delivered"}
            </div>
            <button
              className="bg-primary text-sm shadow-lg h-10 w-48 rounded-lg flex items-center justify-center font-medium text-white focus:ring-2 focus:ring-primary  focus:text-primary focus:bg-gray-200 transition duration-300 ease-out hover:bg-green-400"
              onClick={() => handleSendNotification()}
            >
              UPDATE ORDER STATUS
            </button>
          </div>
        )}
    </div>
  );
}
