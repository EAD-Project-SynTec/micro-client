import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Card,
    CardBody,
} from "@material-tailwind/react";
import { createNewOrder } from '@/services/orderServices';
import { jwtDecode } from 'jwt-decode';
const PlaceOrderModal = ({ open, setOpen, product, selectedQuantity, deliveryFee, destination ,setSuccessOrder }) => {
    const [buyerID, setBuyerID] = useState('');
    const addL1Ref = useRef(null);
    const addL2Ref = useRef(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      try{
        const token = sessionStorage.getItem('jwtToken');
        const decodedData = jwtDecode(token);
        setBuyerID(decodedData.email);
        console.log(decodedData.email)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }, []);
    const handleModalOPen = () => {
        open ? setOpen(false) :
            setOpen(true);   
    };
    var subTotal = 0;
    var delivery = 0;
    subTotal = (product.unitPrice * selectedQuantity);
    delivery = deliveryFee * 1.0;
    var total = (subTotal + delivery);

    //create a new order
    const handlePost = async (formData) => {
        setLoading(true);
        try {
          await createNewOrder(formData);
          setLoading(false);
          handleModalOPen();
          setSuccessOrder(true);
        } catch (error) {
          console.error('Error creating new order:', error);
          setLoading(false);
        }
      };

    const handleSubmit = () => {
        setLoading(true);
        var formData = {
            buyerID: buyerID,
            productID: product.productId,
            deliveryAddressLine1: addL1Ref.current.value,
            deliveryAddressLine2: addL2Ref.current.value,
            deliveryAddressLine3: destination,
            orderStatus: "new",
            deliveryFee: 200,
            totalQuantity: 40,
            orderedDate: new Date().toISOString(), // Current timestamp
            totalPrice: 400,
            courierID: null,
            pickupDate: null, // Adjust as needed
            deliveryDate: null, // Adjust as needed
        };
        handlePost(formData);
    }
    return (
        <div>
            <Dialog open={open} handler={setOpen}>
                <DialogHeader>Your Order is ready !</DialogHeader>
                <DialogBody className='overflow-y-scroll'>
                    <div className=' grid grid-cols-3 px-8 '>
                        {/* product image section */}
                        <div>
                            <img src={"https://syntecblobstorage.blob.core.windows.net/products/" + product.productImageUrl} alt={product.productTitle}
                                className='object-cover rounded-lg w-full'
                            />
                            <div className=' mt-4'>
                                {/* delivery address detais */}
                                <h1 className='text-gray-600 font-semibold  text-lg my-3'>Delivery Address :</h1>
                                <div className='my-3'>
                                    <input placeholder="Address Line 1"  ref={addL1Ref} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' />
                                </div>
                                <div className='my-2'>
                                    <input placeholder="Address Line 2"  ref={addL2Ref} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'/>
                                </div>
                                <div className='my-2'>
                                  <p>{destination}.</p>
                                </div>
                            </div>
                        </div>
                       
                        {/* product details section */}
                        <div className=' col-span-2 px-8'>
                            <div className=' flex justify-between items-start'>
                                {/* product name */}
                                <div>
                                    <h1 className=' text-2xl font-semibold text-gray-800'>{product.productTitle}</h1>
                                    <div className="mb-2 flex gap-5 items-center justify-between">
                                    </div>
                                </div>
                            </div>
                            {/* product description */}
                            <div >
                                <p className=' text-gray-700'>{product.productDescription}</p>
                            </div>
                            <div className='flex-col justify-start mt-2'>
                                <div className=' flex justify-between my-3 border-b-2 py-3 text-gray-600 font-semibold  text-lg'>
                                    <h1>Unit Price :</h1>
                                    <p>Rs {product.unitPrice.toFixed(2)}</p>
                                </div>
                                <div className=' flex justify-between my-3 border-b-2 py-3 text-gray-600 font-semibold  text-lg'>
                                    <h1>Quantity :</h1>
                                    <p>{selectedQuantity.toFixed(2)} kg</p>
                                </div>
                                <div className=' flex justify-between my-3 border-b-2 py-3 text-gray-600 font-semibold  text-lg'>
                                    <h1>Sub Total :</h1>
                                    <p>Rs {subTotal.toFixed(2)}</p>
                                </div>
                                <div className=' flex justify-between my-3 border-b-2 py-3 text-gray-600 font-semibold  text-lg'>
                                    <h1>Shipping Cost :</h1>
                                    <p>Rs {deliveryFee}</p>
                                </div>
                                <div className=' flex justify-between my-4 py-4 text-gray-900 font-semibold '>
                                    <h1>Order Total :</h1>
                                    <p>Rs {total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={handleModalOPen}>
                        cancel
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                       {loading ? 'Processing...' : 'Confirm Order'} 
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default PlaceOrderModal