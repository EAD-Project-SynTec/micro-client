import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MainNav from './components/MainNav';
import { CartTable } from './components/CartTable';
import { getCartItems } from '@/services/productServices';
import { jwtDecode } from 'jwt-decode';
import { set } from 'date-fns';
import CartOrderModal from './components/CartOrderModel';
import {Alert} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';
import CheckoutCard from './components/CheckoutCard';

import CartServices from '@/services/cartServices';
import {getDecodedToken,hasRole} from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import {getUsername} from "../../services/authService"


export default function AddToCart() {

    const [cartItems, setCartItems] = useState([]);
    //const [buyerID, setBuyerID] = useState('kwalskinick@gmail.com');
    const [open, setOpen] = useState(false);
    const [successOrder, setSuccessOrder] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [cartEmail, setCartEmail] = useState('');

    
    const [cartUpdate, setCartUpdate] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
  //retrieve cart items and buyer user id from the database
  const navigate = useNavigate();

  //setBuyerID(getUsername());

  const buyerID = getUsername();
  
  useEffect(() => {
    const getCart = async () => {
      setLoading(true);
      try {


        const token = sessionStorage.getItem('jwtToken');
            const decodedData = jwtDecode(token);

        // const userId = decodedData.email; // Replace with dynamic email if needed

        // Sending a GET request to retrieve cart data
        const response = await axios.get(
          `http://localhost:8084/api/v1/cart?email=${userId}`, // Updated API endpoint with query parameter
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((response) => {
          // console.log(response.data.orderItems);
          console.log(response.data.cartItems);
          setCartEmail(userId);
          setCartData(response.data.cartItems); // Set the cart data if successful
          setSuccessOrder(true);
        });

        // Replace with dynamic email if needed

        const userId = getUsername(); // Replace with dynamic email if needed

        const data = await CartServices.getCart(userId);
        
        console.log(data.cartItems.length);
        setCartTotal(data.cartItems.length);
        setCartEmail(userId);
        setCartData(data.cartItems);
        setSuccessOrder(true);
      } catch (error) {
        setError("Error retrieving cart: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    getCart();
 
            // // Retrieve and decode JWT token
            const decodedToken = getDecodedToken();
            if (decodedToken) {
                const hasDefaultRole = hasRole(decodedToken, 'buyer');
                console.log('user is :', hasDefaultRole);
                if(!hasDefaultRole){
                  navigate('/login');
                }
            }else{
              navigate('/login');
            } 
  }, [cartUpdate]); 




  
  //delete item from the cart
    const handleDeleteItem = (item) => {
      setCartItems(item);
    }
  //open the order modal
    const modelOpenHandler = () => {
     open ? setOpen(false) :
      setOpen(true);   
    };
  //handle the success order alert
    const handleSuccessOrder = (success) => {
      setSuccessOrder(success);
    }
  return (
    <>
    <MainNav/>
    {/* <Alert
      icon={<Icon />}
      open={successOrder}
      onClose={()=>handleSuccessOrder(false)}
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
      className="rounded-none border-l-4 border-[#ee7f25] bg-[#c9812e]/10 font-medium text-[#ee7f25] max-w-2xl mx-12"
    >
      Your orders have been successfully placed! <Link to="/buyers/my-orders" className="text-[#ff9f50] font-bold underline ml-2">View My Orders</Link>
    </Alert> */}
    <CartOrderModal open={open} setOpen={modelOpenHandler} cartItems={cartItems} buyerID={buyerID} setSuccessOrder={handleSuccessOrder}  />
    <div className='px-8 bg-secondary'>
      <div className='md:grid grid-cols-3'>
        <div className='md:col-span-2 mx-8 mt-4'>
          <CartTable cartItems={cartData} setCartUpdate={setCartUpdate} cartEmail={cartEmail} handleDeleteItem={handleDeleteItem} />
        </div>
        <div className='mx-3 mt-5'>
          <CheckoutCard cartData={cartData} openModel={modelOpenHandler} />
        </div>
      </div>
    </div>
  </>  
  )}
