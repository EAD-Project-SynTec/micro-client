import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import SearchBar from './SearchBar';
import { TbTruckDelivery } from "react-icons/tb";
import { BsCoin } from "react-icons/bs";
import { Badge, IconButton, Avatar } from "@material-tailwind/react";
import { HomeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const MainNavSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',

    }
  }
  return (
    <div>
      <section className="md:hidden font-poppins">
        <div className=" px-8 mx-auto">
          <nav className="flex items-center justify-between gap-6 py-4">
            <div className="lg:flex">
              <button
                className="flex items-center px-3 py-2 text-primary border border-primary rounded navbar-burger"
                onClick={toggleNavbar}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
            </div>
            <SearchBar />

            {/* shopping cart button */}
            <div className=" items-center ">
              <Badge content="5" color="green" className="mx-3">
                <IconButton color="gray" variant="outlined" className="rounded-full">
                  <ShoppingCartIcon className="h-3 w-3" />
                </IconButton>
              </Badge>
            </div>
          </nav>
          {/* Mobile Sidebar */}
          {isOpen && (
            <>
              <div className="fixed inset-0 w-full bg-gray-800 opacity-50 dark:bg-gray-500" onClick={toggleNavbar}></div>
              <div
                className={`absolute inset-0 z-10 h-screen p-3 text-gray-400 transform bg-green-50  w-80 lg:w-96 lg:block transition-transform duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
              >
                <div className="px-4">
                  <div className="flex justify-end">
                    <button className="p-2 text-gray-700 rounded-md hover:text-green-500 lg:block" onClick={toggleNavbar}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                  </div>
                  <ul className="text-left mt-7">
                    <li className=' my-4'><NavLink className="text-2xl my-5 text-gray-800 hover:text-green-700" style={navLinkStyle} to='/'>Home</NavLink></li>
                    <li className=' my-4'><NavLink className="text-2xl my-5 text-gray-800 hover:text-green-700" style={navLinkStyle} to='/about'>About</NavLink></li>
                    <li className=' my-4'><NavLink className="text-2xl my-5 text-gray-800 hover:text-green-700" style={navLinkStyle} to='/buyers/my-orders'>My Orders</NavLink></li>
                    <li className=' my-4'><NavLink className="text-2xl my-5 text-gray-800 hover:text-green-700" style={navLinkStyle} to='/dashboard/my-products'>Become a Seller</NavLink></li>
                    <li className=' my-4'><NavLink className="text-2xl my-5 text-gray-800 hover:text-green-700" style={navLinkStyle} to='/couriers/new-orders'>Delivery Partner</NavLink></li>
                    <li className=' my-4'><NavLink className="text-xl font-semibold my-5 text-white rounded-md bg-primary px-5 py-2"  to='/login'>Login</NavLink></li>
                    <li className=' my-4'><NavLink className="text-xl font-semibold my-5 text-white rounded-md bg-primary px-5 py-2"  to='/create'>SignUp</NavLink></li>
                  </ul>

                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default MainNavSide