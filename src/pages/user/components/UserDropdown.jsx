import React, { useState } from 'react';
import logout from "../auth/Logout";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Avatar,
  } from "@material-tailwind/react";
import { IoLogOutOutline } from 'react-icons/io5';
const UserDropdown = ({userName , userImage}) => {

  return (
    <div>
        <Popover placement="bottom-end">
      <PopoverHandler>
      <button
        className="flex items-center text-sm  px-3 py-1 font-medium text-gray-900 rounded-full ring-white hover:text-primary  md:me-0 focus:ring-4  bg-white dark:text-white"
      >
        <Avatar src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="avatar" />
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      </PopoverHandler>
      <PopoverContent>
        <p className='text-sm py-3 text-gray-800 border-b border-gray-200'>{userName}</p>
        <button className="flex items-center mt-3 text-red-500 hover:bg-gray-100" onClick={logout}>
          <p
            className="block text-sm font-normal  w-full text-left"
          > 
            Sign out
          </p>
          <IoLogOutOutline size={25}/>
        </button>
      </PopoverContent>
    </Popover>
    </div>
  );
};

export default UserDropdown;
