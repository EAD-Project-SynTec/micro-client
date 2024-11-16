// Popup.js
import React from 'react';
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";

export function Popup({ title, text, icon, confirmButtonText, handleConfirm, buttoncolor }) {
  const handlePopup = () => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      buttoncolor
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm();
      }
    });
  };

  return (
    <Button color={buttoncolor} onClick={handlePopup}>{confirmButtonText}</Button>
  );
}
