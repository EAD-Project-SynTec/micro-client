import React, { useState } from "react";
import CheckoutPopUp from "./CheckOutPopup";
import Button from '@mui/material/Button';
import {getUsername} from "../../../services/authService"

const CheckoutButton = ({orderTotal}) => {
  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <>
      <button className='bg-green-500 border-green-500 border rounded-full inline-flex items-center 
                  justify-center py-2 px-8 text-center text-sm font-medium text-white
                  disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'
        onClick={() => setShowPopup(true)}
> 
  Checkout
</button>
      {showPopup && (
        <CheckoutPopUp
          onClose={() => setShowPopup(false)}
          userId={getUsername()} // Pass the user ID here
          orderTotal={orderTotal}
        />
      )}
    </>
  );
};

export default CheckoutButton;