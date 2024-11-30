import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TbCategory } from "react-icons/tb";
import { MdOutlineRateReview, MdOutlineInput, MdOutlineHistory } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { HomeModernIcon } from "@heroicons/react/24/solid";
export function SideBar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const sidenavColor = "green";
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className='flex justify-end px-6 pt-4 '
      >
        <IconButton
          variant="text"
          color="blue-gray"
          className="xl:hidden block"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div>
      <Link to="/" className="px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            <h1>Courier Dashboard</h1>
          </Typography>
        </Link>
      </div>
      <div className="mx-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li className="mx-3.5 mt-4 mb-2">
            <Typography
              variant="small"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
              className="font-black uppercase opacity-75"
            >
              Orders
            </Typography>
          </li>
          <li>
            <NavLink to='new-orders'>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TbCategory size={24} />

                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    New Orders
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to='my-orders'>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <MdOutlineInput size={24} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    My Orders
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to='my-history'>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  < MdOutlineHistory size={24} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Order History
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          <li className="mx-3.5 mt-4 mb-2">
            <Typography
              variant="small"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
              className="font-black uppercase opacity-75"
            >
              Profile
            </Typography>
          </li>
          <li>
            <NavLink to='profile'>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <FaRegUserCircle size={24} />

                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Profile
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}


export default SideBar;
