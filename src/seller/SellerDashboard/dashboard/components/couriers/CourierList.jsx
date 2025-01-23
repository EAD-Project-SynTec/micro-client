import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import {
  getCourierList,
  updateCourier,
  updateOrderStatus,
} from "@/services/orderServices";
import { FARMER_ID } from "@/usersID";

export function CourierList({ search, orderId }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(false);
  const [courierList, setCourierList] = useState([]);
  const [courierEmail, setCourierEmail] = useState("");

  const handlePopup = (courierId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you need this courier service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, select it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelected(true);
        handleUpdateCourier(courierId);
        handleUpdateStatus(orderId, "pending", courierId);
        Swal.fire({
          title: "Selected!",
          text: "You have selected this courier.",
          icon: "success",
        });
      }
    });
  };

  const handleUpdateStatus = async (orderID, newStatus, courierID) => {
    try {
      const response = await updateOrderStatus(orderID, newStatus);
      console.log(courierID);
      var obj = {
        id: 0,
        from: FARMER_ID,
        to: courierID,
        message: "you have a new order!",
        isSeen: false,
      };
      const response2 = await axios.post(
        "https://localhost:7144/api/Notification",
        obj
      );
      console.log("new notification", response2);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleUpdateCourier = async (courierID) => {
    console.log(courierID);
    try {
      await updateCourier(orderId, courierID);
      console.log(
        "Courier updated " + orderId + " : " + courierID + " successfully"
      );
    } catch (error) {
      console.error("Error updating courier:", error);
    }
  };

  const filterData = (courierListData) => {
    if (search) {
      const filteredCouriers = courierListData.filter(
        (data) =>
          data.addressLine1.toLowerCase().includes(search.toLowerCase()) ||
          data.addressLine2.toLowerCase().includes(search.toLowerCase()) ||
          data.addressLine3.toLowerCase().includes(search.toLowerCase()) ||
          data.courierFName.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredCouriers);
    } else {
      setData(courierListData);
    }
  };

  useEffect(() => {
    filterData(courierList);
  }, [search, courierList]);

  useEffect(() => {
    const fetchCourierList = async () => {
      try {
        const courierData = await getCourierList();
        setCourierList(courierData);
        setData(courierData);
        console.log("Courier List:", courierData);
      } catch (error) {
        console.error("Error fetching courier list:", error);
      }
    };
    fetchCourierList();
  }, []);

  return (
    <div>
      {data
        ? data.map((values) => {
            const {
              courierFName,
              courierLName,
              addressLine1,
              addressLine2,
              addressLine3,
              courierImageUrl,
              courierID,
            } = values;
            return (
              <Card className="w-full mb-4" key={courierID}>
                <List>
                  <ListItem ripple={false} className="flex items-center my-3">
                    <ListItemPrefix>
                      <Avatar
                        variant="circular"
                        alt="courier"
                        src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
                      />
                    </ListItemPrefix>
                    <div className="flex flex-col ml-4">
                      <Typography variant="h6" color="blue-gray">
                        {courierFName + " " + courierLName}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {"No:" +
                          addressLine1 +
                          ", " +
                          addressLine2 +
                          ", " +
                          addressLine3}
                      </Typography>
                    </div>
                    <ListItemSuffix>
                      <Button
                        disabled={selected}
                        variant="gradient"
                        color="green"
                        className="ml-auto"
                        onClick={() => handlePopup(courierID)}
                      >
                        Select
                      </Button>
                    </ListItemSuffix>
                  </ListItem>
                </List>
              </Card>
            );
          })
        : "Loading..."}
    </div>
  );
}
