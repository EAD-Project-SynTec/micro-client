import React, { useState } from "react";
import AddOrderPopup from "./AddOrderPopup";
import Button from '@mui/material/Button';


const AddOrderButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setShowPopup(true)} style={styles.button}>
        Add Order
      </Button>
      {showPopup && <AddOrderPopup onClose={() => setShowPopup(false)} />}
      
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
