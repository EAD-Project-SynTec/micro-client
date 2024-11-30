import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getOrdersByUserId } from "@/services/orderService";
import { Link, useLocation, useNavigate } from "react-router-dom";





const BuyerOrders = () => {
  const TABLE_HEAD = [
    "Order Reference",
    "Date Created",
    "Status",
    "Product",
    "Quantity",
    "Unit Price",
    "Total Price",
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState(""); // Error state for better UI feedback
  const [tab, setTab] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const location = useLocation();
  const navigate = useNavigate();
  const userId = "kavin@gmail.com"; // Assume this is the user ID

  // Fetch all orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Function to fetch all orders
  const fetchAllOrders = () => {
    getOrdersByUserId(userId)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch orders");
        console.error(error);
      });
  };

  
  // Filter data based on tab selection
  useEffect(() => {
    const filterResult = (statusItem) => {
      let result = [];
      if (statusItem === "All") {
        result = data; // No filter applied for "All"
      } else if (statusItem === "delivered") {
        result = data.filter(
          (item) => item.status?.toLowerCase() === "delivered"
        );
      } else {
        result = data.filter(
          (item) => item.status?.toLowerCase() === statusItem.toLowerCase()
        );
      }

      // Apply search filter
      if (searchQuery) {
        result = result.filter((item) =>
          item.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredData(result);
    };

    filterResult(tab);
  }, [data, tab, searchQuery]);

  const handleRowClick = (id) => {
    navigate(`/buyer/orders/${id}`);
  };
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
      
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h3" color="blue-gray">
                Orders Overview
              </Typography>
            </div>
            {/* <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Button onClick={() => {}}>Add Order</Button>
            </div> */}
          <div className="flex justify-end m-5">
            <div className="w-full md:w-72">
              <Input
                label="Search by Order Reference"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
            </div>
          </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {error ? (
            <Typography color="red" className="text-center mb-4">
              {error}
            </Typography>
          ) : (
            <div>
              <div className="flex sm:justify-end justify-center sm:mr-16 mr-0 text-custom-gray font-medium">
                <div className="flex sm:text-sm text-xs border-b-2 p-5">
                  <button
                    onClick={() => setTab("All")}
                    className={`focus:outline-none sm:w-40 w-24 transition duration-300 ease-in-out ${
                      tab === "All"
                        ? "text-green-500 font-bold border-b-2 border-green-500"
                        : "text-blue-gray"
                    }`}
                  >
                    All
                  </button>

                  <button
                    onClick={() => setTab("Pending")}
                    className={`focus:outline-none sm:w-40 w-24 transition duration-300 ease-in-out ${
                      tab === "Pending"
                        ? "text-green-500 font-bold border-b-2 border-green-500"
                        : "text-blue-gray"
                    }`}
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => setTab("Processing")}
                    className={`focus:outline-none sm:w-40 w-24 transition duration-300 ease-in-out ${
                      tab === "Processing"
                        ? "text-green-500 font-bold border-b-2 border-green-500"
                        : "text-blue-gray"
                    }`}
                  >
                    Processing
                  </button>

                  <button
                    onClick={() => setTab("Delivered")}
                    className={`focus:outline-none sm:w-40 w-24 transition duration-300 ease-in-out ${
                      tab === "Delivered"
                        ? "text-green-500 font-extrabold border-b-2 border-green-500"
                        : "text-blue-gray"
                    }`}
                  >
                    Delivered
                  </button>
                </div>
              </div>
              <div className=" flex-col justify-center text-custom_gray bg-white shadow-md overflow-auto rounded-xl bg-clip-border mt-8 ml-5 mr-5">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          scope="col"
                          className="p-5 font-bold w-24 text-left align-middle bg-green-500"
                        >
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal leading-none opacity-100"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((order) =>
                      order.items?.map((item, index) => {
                        const isLast = index === order.items.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr
                            key={`${order.id}-${item.productID}-${index}`}
                            onClick={() => handleRowClick(order.orderId)}
                            className="cursor-pointer hover:bg-gray-200" // Hover effect
                          >
                            {index === 0 && (
                              <>
                                <td
                                  className="p-4 border-b border-blue-gray-200"
                                  rowSpan={order.items.length}
                                >
                                  <Typography variant="small" color="blue-gray">
                                    {order.orderId}
                                  </Typography>
                                </td>
                                <td
                                  className="p-4 border-b border-blue-gray-200"
                                  rowSpan={order.items.length}
                                >
                                  <Typography variant="small" color="blue-gray">
                                    {formatDate(order.dateCreated)}
                                  </Typography>
                                </td>
                                <td
                                  className="p-4 border-b border-blue-gray-200"
                                  rowSpan={order.items.length}
                                >
                                  <Typography variant="small" color="blue-gray">
                                    {order.status}
                                  </Typography>
                                </td>
                              </>
                            )}

                            <td className="p-4 border-b border-blue-gray-200">
                              <Typography variant="small" color="blue-gray">
                                {item.productName}
                              </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-200">
                              <Typography variant="small" color="blue-gray">
                                {item.quantity}
                              </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-200">
                              <Typography variant="small" color="blue-gray">
                                Rs.{item.price}
                              </Typography>
                            </td>

                            {index === 0 && (
                              <>
                              <td
                                className="p-4 border-b border-blue-gray-200"
                                rowSpan={order.items.length}
                              >
                                <Typography variant="small" color="blue-gray">
                                  Rs.{calculateTotalPrice(order.items)}
                                </Typography>
                              </td>
                            </>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                </div>  
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default BuyerOrders;
