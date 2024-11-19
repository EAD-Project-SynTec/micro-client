import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { getAllOrders } from "@/services/orderService";

const OrderTable = ({ defaultTab }) => {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(defaultTab || "All");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = "user456"; // Assume this is the user ID

  // Fetch all orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Function to fetch all orders
  const fetchAllOrders = () => {
    getAllOrders(userId)
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch orders", error);
      });
  };

  // Update tab and filter data when location changes
  useEffect(() => {
    if (location.pathname === "/my-orders") {
      setTab(defaultTab);
    }
  }, [location.pathname, defaultTab]);

  // Filter data based on the selected tab
  useEffect(() => {
    const filterOrders = (status) => {
      if (status === "All") {
        return data.filter(
          (item) =>
            item.orderStatus &&
            ["ready to pickup", "picked up", "review", "return"].includes(
              item.orderStatus.toLowerCase()
            )
        );
      }
      if (status === "Delivered") {
        return data.filter(
          (item) =>
            item.orderStatus &&
            ["review", "return"].includes(item.orderStatus.toLowerCase())
        );
      }
      return data.filter(
        (item) =>
          item.orderStatus &&
          item.orderStatus.toLowerCase() === status.toLowerCase()
      );
    };

    setFilteredData(filterOrders(tab));
  }, [data, tab]);

  // Navigate to the order details page
  const handleRowClick = (id) => navigate(`/dashboard/my-orders/${id}`);

  // Format the date string
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex sm:justify-end justify-center sm:mr-16 mr-0 text-custom-gray font-medium">
        <div className="flex sm:text-sm text-xs border-b-2">
          {["All", "Ready to pickup", "Picked up", "Delivered"].map((tabName) => (
            <button
              key={tabName}
              onClick={() => setTab(tabName)}
              className={`focus:outline-none sm:w-40 w-24 transition duration-300 ease-in-out ${
                tab === tabName
                  ? "text-primary border-b-2 border-primary"
                  : "text-custom_gray"
              }`}
            >
              {tabName}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="flex-col justify-center text-custom_gray bg-white shadow-md overflow-auto rounded-xl bg-clip-border mt-8">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr className="border-b border-primary">
              {["Product", "Order Reference", "Order Placed", "Quantity", "Price"].map(
                (header) => (
                  <th key={header} className="py-5 font-bold w-24 text-center align-middle">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(
              ({
                orderID,
                productTitle,
                orderedDate,
                totalQuantity,
                totalPrice,
                orderStatus,
              }) => (
                <tr
                  key={orderID}
                  onClick={() => handleRowClick(orderID)}
                  onMouseEnter={() => setSelectedRow(orderID)}
                  onMouseLeave={() => setSelectedRow(null)}
                  className={
                    selectedRow === orderID ? "bg-gray-200 cursor-pointer" : "cursor-pointer"
                  }
                >
                  <td className="p-3 w-24 text-center align-middle">
                    <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                      {productTitle}
                    </p>
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
                    <p
                      className={`rounded-lg block font-sans text-sm antialiased leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center ${
                        orderStatus?.toLowerCase() === "ready to pickup"
                          ? "bg-red-200"
                          : orderStatus?.toLowerCase() === "picked up"
                          ? "bg-indigo-200"
                          : "bg-primary"
                      }`}
                    >
                      {orderStatus || "Unknown Status"}
                    </p>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
