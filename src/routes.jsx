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
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "My Reviews",
      //   path: "/my-reviews",
      //   element: <MyReviews />,
      // },
    ],
  },
  
  
 
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     // {
  //     //   icon: <ServerStackIcon {...icon} />,
  //     //   name: "sign in",
  //     //   path: "/sign-in",
  //     //   element: <SignIn />,
  //     // },
  //     // {
  //     //   icon: <RectangleStackIcon {...icon} />,
  //     //   name: "sign up",
  //     //   path: "/sign-up",
  //     //   element: <SignUp />,
  //     // },
  //   ],
  // },
];

export default routes;
