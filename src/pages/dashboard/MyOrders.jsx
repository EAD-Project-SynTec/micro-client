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
import { getAllOrders } from "@/services/orderService";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyOrders = () => {
  const TABLE_HEAD = [
    "Product ID",
    "Quantity",
    "Price",
    "Order Reference",
    "Order Placed",
    "Status",
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState(""); // Error state for better UI feedback
  const [tab, setTab] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
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
      })
      .catch((error) => {
        setError("Failed to fetch orders");
        console.error(error);
      });
  };

  

  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Dispatched Orders
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about your dispatched orders
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Button onClick={() => {}}>Add Order</Button>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {error ? (
            <Typography color="red" className="text-center mb-4">
              {error}
            </Typography>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      scope="col"
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((order) => {
                  // Iterate over the items array for each order
                  return order.items.map((item, index) => {
                    const isLast = index === order.items.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={item.productID + index}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.productID}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.quantity}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            ${item.price}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {order.id}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {order.dateCreated}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {order.status}
                          </Typography>
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default MyOrders;
