import { Card, IconButton, Typography,Tooltip } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { MdOutlineClose } from "react-icons/md";
import { deleteCartItem } from "@/services/productServices";
import { jwtDecode } from "jwt-decode";
const TABLE_HEAD = ["Item", "Price", "Qty", "Sub Total", ""];   
export function CartTable({ cartItems,cartEmail}) {
  const[cartItemss, setCartItems] = useState([]);
  console.log(cartEmail)
  const PopupHandler = (productId) => {
    // Find the selected item in the cart using the provided productId
    const selectedItem = cartItems.find((item) => item.productID === productId);
  
    // Prepare the object with the required structure for the DELETE request
    let obj = {
      customerEmail: cartEmail, // Assuming cartEmail is available in the scope
      itemID: selectedItem.productID // Using the selected item's productID
    };
  
    // Show a confirmation prompt to the user
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44bd32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      // If the user confirms the action
      if (result.isConfirmed) {
        console.log(selectedItem);
  
        // Make the DELETE request to the backend with the object as the body
        axios
          .delete(`http://localhost:8084/api/v1/cart`, { data: obj }) // Pass the data in the body of the request
          .then((response) => {
            console.log("Item deleted successfully", response);
  
            // Show success alert
            Swal.fire({
              title: "Removed!",
              text: "Your item has been removed.",
              icon: "success",
            });
  
            // Update the UI by removing the deleted item from cartItems
            const updatedCartItems = cartItems.filter(
              (item) => item.cartItemId !== selectedItem.cartItemId
            );
            setCartItems(updatedCartItems); // Update the cart items state
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
  
            // Show error alert if the request fails
            Swal.fire({
              title: "Error!",
              text: "Failed to remove item.",
              icon: "error",
            });
          });
      } else {
        console.log("Canceled deletion for item ID:", productId);
      }
    });
  };
  
  
  
  // const deleteConfirmHandler = async (itemId) => {
  //   console.log(itemId);
  //   try {
  //     const data = await deleteCartItem(buyerID, itemId);
  //     console.log("handle delete")
  //     handleDeleteItem(data);
  //   } catch (error) {
  //     console.error('Error deleting cart item:', error);
     
  //   }
  // };
console.log(cartItems)
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-200 bg-white p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item ,index) => {
             const key =  item.cartItemId|| index;
          
            const classes = "p-4 border-b border-blue-gray-50 ";
 
            return (
              <tr key={key}>
                <td className={classes}>
                    <div className="flex items-center">
                        <img
                       src={ item.imageUrl} alt={item.productName}
                        className="w-36 h-24 rounded-sm object-cover"
                        />
                        <div className="ml-4">
                        <Typography
                            color="blue-gray"
                            className="font-medium text-lg" 
                        >
                            {item.productId}
                        </Typography>
                        </div>
                    </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.price.toFixed(2)}
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
                    {(item.quantity * item.price).toFixed(2)}
                  </Typography>
                </td>
                <td className={classes}>
                <Tooltip content="Remove">
                        <IconButton variant="text" color='red'
                        onClick={() => PopupHandler(item.productID)}
                        >
                          <MdOutlineClose className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </Card>
  );
}