import React, { useState } from "react";
import AddOrderPopup from "./AddOrderPopup";
import Button from '@mui/material/Button';

const AddOrderButton = ({productId, quantity}) => {
  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <>
     

      <button className='bg-green-500 border-green-500 border rounded-full inline-flex items-center 
                  justify-center py-2 px-8 text-center text-sm font-medium text-white
                  disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'
        onClick={() => setShowPopup(true)}
> 
  Buy Now
</button>
      {showPopup && (
        <AddOrderPopup
        onClose={() => setShowPopup(false)}  // Corrected: passing onClose as a function
        productId={productId}                // Corrected: passing productId prop
        selectedQuantity={quantity}                  // Corrected: passing quantity prop
          
        />
      )}
    </>
  );
};

const styles = {
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default AddOrderButton;