import React from 'react'
import MainNav from './components/MainNav'
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Rating,
  Alert
} from "@material-tailwind/react";
import ProductQuantity from './components/ProductQuantity';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeliveryFee from './courier/components/DeliveryFee';
import { set } from 'date-fns';
import SellerDetails from './components/SellerDetails';
import PlaceOrderModal from './components/PlaceOrderModal';
import { addToCartProducts, getProductDetails } from './services/productServices';
import { jwtDecode } from 'jwt-decode';
import Review from './components/Review';
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [destination, setDestination] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(false);
  const { id } = useParams();
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const [buyerID, setBuyerID] = useState('');
  // useEffect(() => {
  //   try{
  //     const token = sessionStorage.getItem('jwtToken');
  //     const decodedData = jwtDecode(token);
  //     setBuyerID(decodedData.email);
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
  // }, []);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProductDetails(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);
  const handleModalOPen = () => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      if (!token) {
        console.error('Token not found in sessionStorage.');
        return;
      }
      let decodedData;
      try {
        decodedData = jwtDecode(token);
        console.log('Decoded Data:', decodedData);
      } catch (error) {
        console.error('Failed to decode token:', error);
        return;
      }
      if (decodedData.role === 'User') {
        if (deliveryFee === 0) {
          alert('Please set the delivery location');
        }
        else {
          modelOpen ? setModelOpen(false) :
            setModelOpen(true);
        }
      } else {
        navigate('/login');
        console.log('Cannot buy, user not logged in or does not have proper role');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const handleSelectDestination = (destination) => {
    setDestination(destination);
  }

  const handleDeliveryFee = (fee) => {
    setDeliveryFee(fee);
  }

  const handleSuccessOrder = (success) => {
    setSuccessOrder(success);
  }
  const handleAddToCart = (productId) => {
    console.log(product)
    const data = {
      customerEmail: 'kwalskinick@gmail.com',
      price: product.price,
      productID: product.id,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
      name: product.name
    };
  
    console.log('Adding to cart:', data);
  
    axios.post('http://localhost:8084/api/v1/cart', data)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('There was an error adding to the cart!', error);
      });
  };
  

  // const addToCart = async (productId) => {
  //   try {
  //     console.log('Adding to cart:', productId, selectedQuantity,"émail",buyerID,"price is",product.price );
      
  //     const token = sessionStorage.getItem('jwtToken');
  //     if (!token) {
  //       console.error('Token not found in sessionStorage.');
  //       navigate('/login');
  //       return;
  //     }
  //     let decodedData;
  //     try {
  //       decodedData = jwtDecode(token);
  //       console.log('Decoded Data:', decodedData);
  //     } catch (error) {
  //       console.error('Failed to decode token:', error);
  //       navigate('/login');
  //       return;
  //     }

  //     // Check if the user has the 'User' role
  //     if (decodedData.role === 'User') {
  //       setLoading(true);
  //       const cart = {
  //         buyerId: buyerID,
  //         productId: productId,
  //         quantity: selectedQuantity
  //       };

  //       try {
  //         // Attempt to add the product to the cart
  //         await addToCartProducts(cart);
  //         setOpen(true); // Open the success message or modal
  //         console.log('Product added to cart successfully.');
  //       } catch (error) {
  //         console.error('Error adding items to the cart:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       // Navigate to login if the user role is not 'User'
  //       console.log('User role is not authorized. Redirecting to login.');
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     console.error('An unexpected error occurred:', error);
  //   }
  // }


  // const token = sessionStorage.getItem('jwtToken');
  // const decodedData = jwtDecode(token);
  // if (decodedData.Role === 'User') {
  //   setLoading(true);
  //   var cart = {
  //     buyerId: buyerID,
  //     productId: productId,
  //     quantity: selectedQuantity
  //   }
  //   try {
  //     await addToCartProducts(cart);
  //     setOpen(true);
  //   } catch (error) {
  //     console.error('Error adding items to the cart:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // else{
  //   <Navigate to={"/login"}/>
  // }


  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  return (
    <div className=' bg-secondary'>
      <MainNav />
      <Alert
        icon={<Icon />}
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946] max-w-2xl mx-12"
      >
        Your item has been successfully added to the cart! <Link to="/cart" className="text-primary font-bold underline ml-2">View cart</Link>
      </Alert>
      <Alert
        icon={<Icon />}
        open={successOrder}
        onClose={() => setSuccessOrder(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className="rounded-none border-l-4 border-[#ee7f25] bg-[#c9812e]/10 font-medium text-[#ee7f25] max-w-2xl mx-12"
      >
        Your order has been successfully placed! <Link to="/buyers/my-orders" className="text-[#ff9f50] font-bold underline ml-2">View My Orders</Link>
      </Alert>
      <PlaceOrderModal
        open={modelOpen}
        setOpen={setModelOpen}
        product={product}
        selectedQuantity={selectedQuantity}
        deliveryFee={deliveryFee}
        destination={destination}
        setSuccessOrder={handleSuccessOrder}

      />
      <div className=' md:grid grid-cols-4 px-8 pb-12 gap-4'>
        <div className=' col-span-3 h-auto bg-white rounded-md border-gray-100'>

          <div className=' md:grid grid-cols-3 px-4 md:px-8 pb-8 md:pb-0'>
            {/* product image section */}
            <div className='py-4 md:py-8'>
              <img src={product.imageUrl} alt={product.name}
                className='object-cover rounded-lg w-full'
              />
            </div>
            {/* product details section */}
            <div className=' col-span-2 md:px-8 md:py-12'>
              <div className=' md:flex justify-between items-start'>
                {/* product name */}
                <div>
                  <h1 className='text-2xl md:text-3xl font-semibold text-gray-800'>{product.name}</h1>
                  <div className="mb-3 flex md:gap-5 gap-3 items-center md:justify-between">
                    <Rating value={4} readonly />
                    <p className=' text-sm text-gray-700'>Reviews (4)</p>
                  </div>
                </div>
                <p className=' flex items-center gap-3 font-semibold text-gray-600 text-lg'><span><FaLocationDot /></span>{product.farmerAddL3}</p>
              </div>
              {/* product description */}
              <div className=' mb-3'>
                <p className='mt-3 md:mt-0 text-gray-700'>{product.description}</p>
              </div>
              {/* product price */}
              <div>
                <h1 className=' text-primary text-2xl font-semibold'>Rs.{product.price}</h1>
              </div>

              {/* product quantity */}
              <div>
                <h1 className='mt-8 mb-4 text-gray-800 text-sm'>Select Quantity :</h1>
                <ProductQuantity minimumQuantity={1} availableStock={product.quantity} onQuantityChange={handleQuantityChange} />
              </div>
              <div className='flex gap-3 md:justify-end mt-8'>
              <button className='bg-green-500 border-green-500 border rounded-full inline-flex items-center 
                  justify-center py-2 px-8 text-center text-sm font-medium text-white
                  disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'
        onClick={handleModalOPen}
>
  Buy Now
</button>

<button className='border-green-500 border rounded-full inline-flex items-center 
                  justify-center py-2 px-7 text-center text-sm font-medium text-green-500 hover:bg-green-500/10
                  disabled:bg-gray-300 disabled:border-gray-300 disabled:text-dark-500' disabled={loading}
                  // onClick={() => { addToCart(id) }}
                  onClick={()=>{handleAddToCart(id)}}
                // onClick={() => { handleUser}}
                >
                  {loading ? 'Adding to cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>

        </div>
        {/* courier charges section */}
        <div className='mt-4 md:mt-0'>
          <DeliveryFee originData={product.farmerAddL3 + ', Sri Lanka'} handleDeliveryFee={handleDeliveryFee} handleSelectDestination={handleSelectDestination} />
          <SellerDetails
            farmerFName={product.farmerFName}
            farmerLName={product.farmerLName}
            farmerAddL1={product.farmerAddL1}
            farmerAddL2={product.farmerAddL2}
            farmerAddL3={product.farmerAddL3}
            farmerContact={product.farmerContact}
            farmerProfileUrl={product.farmerProfileUrl}
          />
        </div>
      </div>
      <Review id={id}/>
    </div>
  )
}

export default ProductDetails