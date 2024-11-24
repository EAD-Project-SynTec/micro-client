import { React, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import { getAllCourierOrders } from "@/services/orderServices";
export default function TabAndTables({ defaultTab }) {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(defaultTab);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuyerOrders = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        const decodedData = jwtDecode(token);
        const courierID = decodedData.email;
        const orders = await getAllCourierOrders(courierID);
        setData(orders);
      } catch (error) {
        console.error("Error while fetching buyer orders:", error);
      }
    };
    fetchBuyerOrders();
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleRowClick = (id) => {
    navigate(`/couriers/my-orders/${id}`);
  };
  return (
    <div>
      <div className="flex sm:justify-end justify-center sm:mr-16 mr-0 text-custom-gray  font-medium">
        <div className="flex  -mt-10 sm:text-sm text-xs border-b-2 ">
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
        <div class="relative w-11/12   h-full ml-12 content-center  text-custom_gray bg-white shadow-md overflow-auto rounded-xl bg-clip-border mt-8 hidden sm:block  ">
          <table class="w-full text-left table-auto  ">
            <thead>
              <tr class="border-b border-primary ">
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Product
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Order reference
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Delivery Date
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Pickup Date
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Delivery Fee
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((values) => {
                const {
                  orderID,
                  productTitle,
                  customerAddL3,
                  deliveryDate,
                  pickupDate,
                  productImageUrl,
                  deliveryFee,
                  orderStatus,
                } = values; //destructuring
                return (
                  <>
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
                      <td class="p-3 w-24 text-center align-middle ">
                        <div class="flex space-x-5  ">
                          <Avatar
                            src={
                              "https://syntecblobstorage.blob.core.windows.net/products/" +
                              productImageUrl
                            }
                            size="sm"
                          />
                          <p class="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                            {productTitle}
                          </p>
                        </div>
                      </td>

                      <td class="p-3 w-24 text-center align-middle">
                        <p class="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                          {orderID}
                        </p>
                      </td>

                      <td class="p-3 w-24 text-center align-middle">
                        <p class="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                          {formatDate(deliveryDate)}
                        </p>
                      </td>
                      <td class="p-3 w-24 text-center align-middle">
                        <p class="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                          {formatDate(pickupDate)}
                        </p>
                      </td>
                      <td class="p-3 w-24 text-center align-middle">
                        <p class="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                          Rs.{deliveryFee}
                        </p>
                      </td>
                      {/* <td class="p-3 w-24 text-center align-middle">
                            <p class="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                              {customerAddL3}
                            </p>
                          </td> */}
                      <td className="p-3 w-24 text-center align-middle ">
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
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        <div class="sm:hidden">
          {filteredData.map((values) => {
            const {
              orderID,
              productTitle,
              customerAddL3,
              deliveryDate,
              pickupDate,
              productImageUrl,
              deliveryFee,
              orderStatus,
            } = values; //destructuring
            return (
              <>
                <div className="group bg-gray-200 border hover:border hover:border-primary hover:bg-green-50 transition duration-300 ease-out  p-4  rounded-lg shadow mt-8  ">
                  <Link to={`/couriers/my-orders/${orderID}`}>
                    <div className="grid grid-cols-2 gap-x-10 mt-2">
                      <div>
                        <Avatar
                          src={
                            "https://syntecblobstorage.blob.core.windows.net/products/" +
                            productImageUrl
                          }
                          size="lg"
                        />
                        <div className="pl-5 mt-8">
                          <div className="text-md pb-2 font-medium text-gray-700 ">
                            {productTitle}
                          </div>
                          <div className="text-sm  text-primary ">
                            Rs.{deliveryFee}
                          </div>
                          <div className="text-sm italic text-gray-400">
                            {orderID}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600  p-2  group-hover:text-custom_gray flex flex-col space-y-5">
                          <div>
                            <div className="text-sm "> Location:</div>
                            <div className="text-md font-semibold">
                              {" "}
                              {customerAddL3}
                            </div>
                          </div>
                          <div>
                            {orderStatus === "Ready to pickup" && (
                              <p class=" bg-red-200 rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                                Ready to Pickup
                              </p>
                            )}
                            {orderStatus === "Picked up" && (
                              <p class=" bg-indigo-200 rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                                Picked up
                              </p>
                            )}
                            {(orderStatus === "review" ||
                              orderStatus === "return") && (
                              <p class=" bg-primary rounded-lg block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                                Delivered
                              </p>
                            )}
                          </div>
                          <div>
                            <div className="text-sm "> Delivery Date:</div>
                            <div className="text-md font-semibold">
                              {" "}
                              {formatDate(deliveryDate)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm "> Pickup Date:</div>
                            <div className="text-md font-semibold">
                              {" "}
                              {formatDate(pickupDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
