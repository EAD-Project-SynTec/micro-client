"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@material-tailwind/react";
import { getAllFarmerOrders } from "@/services/orderServices";
import { jwtDecode } from "jwt-decode";

export default function Tab({ defaultTab }) {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(defaultTab);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
        const decodedData = jwtDecode(token);
        const sellerID = decodedData.email;
    const fetchOrderDetails = async () => {
      try {
        const details = await getAllFarmerOrders(sellerID);
        setData(details);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, []);

  // Update tab and filter data based on URL change
  useEffect(() => {
    if (location.pathname === "/my-orders") {
      setTab(defaultTab);
    }
  }, [location.pathname, defaultTab]);

  // Filter data based on tab selection
  useEffect(() => {
    const filterResult = (statusItem) => {
      let result = [];
      if (statusItem === "All") {
        result = data.filter(
          (item) =>
            item.orderStatus.toLowerCase() === "ready to pickup" ||
            item.orderStatus.toLowerCase() === "picked up" ||
            item.orderStatus.toLowerCase() === "review" ||
            item.orderStatus.toLowerCase() === "return"
        );
      } else if (statusItem === "Delivered") {
        result = data.filter(
          (item) =>
            item.orderStatus.toLowerCase() === "review" ||
            item.orderStatus.toLowerCase() === "return"
        );
      } else {
        result = data.filter(
          (item) => item.orderStatus.toLowerCase() === statusItem.toLowerCase()
        );
      }
      setFilteredData(result);
    };
    filterResult(tab);
  }, [data, tab]);

  const handleRowClick = (id) => {
    navigate(`/dashboard/my-orders/${id}`);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="flex sm:justify-end justify-center sm:mr-16 mr-0 text-custom-gray  font-medium">
        <div className="flex sm:text-sm text-xs border-b-2 ">
          <button
            onClick={() => setTab("All")}
            className={`focus:outline-none  sm:w-40 w-24 transition duration-300 ease-in-out  ${
              tab === "All"
                ? "text-primary border-b-2 border-primary "
                : "text-custom_gray "
            }`}
          >
            All
          </button>

          <button
            onClick={() => setTab("Ready to pickup")}
            className={`focus:outline-none  sm:w-40 w-24 transition duration-300 ease-in-out  ${
              tab === "Ready to pickup"
                ? "text-primary border-b-2 border-primary "
                : "text-custom_gray "
            }`}
          >
            Ready to pickup
          </button>

          <button
            onClick={() => setTab("Picked up")}
            className={`focus:outline-none  sm:w-40 w-24 transition duration-300 ease-in-out ${
              tab === "Picked up"
                ? "text-primary border-b-2 border-primary "
                : "text-custom_gray"
            }`}
          >
            Picked up
          </button>

          <button
            onClick={() => setTab("Delivered")}
            className={`focus:outline-none  sm:w-40 w-24 transition duration-300 ease-in-out ${
              tab === "Delivered"
                ? "text-primary border-b-2 border-primary "
                : "text-custom_gray "
            }`}
          >
            Delivered
          </button>
        </div>
      </div>
      <div>
        <div className=" flex-col justify-center text-custom_gray bg-white shadow-md overflow-auto rounded-xl bg-clip-border mt-8">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr class="border-b border-primary">
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Product
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Order reference
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Order Placed
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Quantity (Kg)
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((values) => {
                const {
                  orderID,
                  productTitle,
                  orderedDate,
                  totalQuantity,
                  productImageUrl,
                  totalPrice,
                  orderStatus,
                } = values; //destructuring
                return (
                  <tr
                    key={orderID}
                    onClick={() => handleRowClick(orderID)}
                    onMouseEnter={() => setSelectedRow(orderID)}
                    onMouseLeave={() => setSelectedRow(null)}
                    className={
                      selectedRow === orderID
                        ? "bg-gray-200 cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    <td class="p-3 w-24 text-center align-middle">
                      <div className="flex space-x-5 ">
                        <Avatar
                          src={
                            "https://syntecblobstorage.blob.core.windows.net/products/" +
                            productImageUrl
                          }
                          size="sm"
                        />
                        <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                          {productTitle}
                        </p>
                      </div>
                    </td>

                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        {orderID}
                      </p>
                    </td>

                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        {formatDate(orderedDate)}
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        {totalQuantity}Kg
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        Rs.{totalPrice}
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      {orderStatus.toLowerCase() === "ready to pickup" && (
                        <p className=" bg-red-200 rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                          Ready to Pickup
                        </p>
                      )}
                      {orderStatus.toLowerCase() === "picked up" && (
                        <p className=" bg-indigo-200 rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                          Picked up
                        </p>
                      )}
                      {(orderStatus.toLowerCase() === "review" ||
                        orderStatus.toLowerCase() === "return") && (
                        <p className=" bg-primary rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                          Delivered
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden">
          {filteredData.map((values) => {
            const {
              orderId,
              product,
              orderedDate,
              totalQuantity,
              photoName,
              totalPrice,
              status,
            } = values; //destructuring
            return (
              <div
                key={orderId}
                className="group bg-gray-200 border hover:border hover:border-primary hover:bg-green-50 transition duration-300 ease-out  p-4  rounded-lg shadow mt-8  "
              >
                <Link to={`/dashboard/my-orders/${orderId}`}>
                  <img
                    src={photoName}
                    alt={product}
                    className="w-24 h-14 pl-8"
                  />

                  <div className="grid grid-cols-2 gap-x-10 mt-2 ">
                    <div className="col-span-1 pl-3">
                      <div className="text-md pb-2 font-medium text-gray-700 ">
                        {product} - {totalQuantity}Kg
                      </div>
                      <div className="text-sm  text-primary ">
                        Rs.{totalPrice}
                      </div>
                      <div className="text-sm italic text-gray-400">
                        {orderedDate}
                      </div>
                    </div>
                    <div className="col-span-1 text-gray-600 flex flex-col space-y-3  group-hover:text-custom_gray">
                      <div className="">
                        {status === "Ready to pickup" && (
                          <p className=" bg-red-200 rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                            Ready to pickup
                          </p>
                        )}
                        {status === "Picked up" && (
                          <p className=" bg-indigo-200 rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                            Picked up
                          </p>
                        )}
                        {(status === "review" || status === "return") && (
                          <p className=" bg-primary rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                            Delivered
                          </p>
                        )}
                      </div>
                      <div className="text-md font-semibold pl-3">
                        {" "}
                        {orderId}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
