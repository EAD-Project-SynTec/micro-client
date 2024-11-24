import OrderOverview from "@/buyer/components/OrderOverview";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { getFarmerOrderDetails } from "@/services/orderServices";

export default function OrderDetails() {
  const { orderID } = useParams();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const details = await getFarmerOrderDetails(orderID);
        setOrderDetails(details);
      } catch (error) {
        console.error('Error fetching order details:', error);
        // Handle errors appropriately
      }
    };
    fetchOrderDetails();
  }, [orderID]); // Only run the effect when orderID changes

  return (
    <div>
      {/* <OrderOverview title="Courier details" orderReference={orderReference}/> */}
      {/* <OrderOverview title="Courier details" orderID={orderID} /> */}
      <OrderOverview orderDetails={orderDetails} type="Farmer" />
    </div>
  );
}
