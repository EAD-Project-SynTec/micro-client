import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "@/pages/auth";
import MyProducts from "./pages/dashboard/MyProducts";
import MyOrders from "./pages/dashboard/MyOrders";
import MyReviews from "./pages/dashboard/MyReviews";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "My Products",
        path: "/my-products",
        element: <MyProducts />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "My Orders",
        path: "/my-orders",
        element: <MyOrders />,
      },
    ],
  },
  

];

export default routes;
