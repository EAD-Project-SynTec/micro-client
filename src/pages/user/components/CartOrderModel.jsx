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
import axios from 'axios';
import { createNewOrderList } from '@/services/orderServices';

const CartOrderModal = ({ open, setOpen,cartItems,buyerID ,setSuccessOrder}) => {
    const addL1Ref = useRef(null);
    const addL2Ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleModalOPen = () => {
        open ? setOpen(false) :
            setOpen(true);   
    };
    const handlePost = async (formData) => {
        setLoading(true);
        try {
          await createNewOrderList(formData);
          setLoading(false);
          handleModalOPen();
          setSuccessOrder(true);
        } catch (error) {
          console.error('Error creating new order:', error);
          setLoading(false);
        }
      };
    const createOrdersFromCart = async () => {
        try {
            const ordersToCreate = cartItems.map(item => ({
                buyerID: buyerID,
                productID: item.productId,
                deliveryAddressLine1: addL1Ref.current.value,
                deliveryAddressLine2: addL2Ref.current.value,
                deliveryAddressLine3: 'Srilanka',
                orderStatus: "new",
                deliveryFee: 200,
                totalQuantity: item.quantity,
                orderedDate: new Date().toISOString(),
                totalPrice: item.price, 
                courierID: null,
                pickupDate: null, 
                deliveryDate: null, 
            }))
           
           handlePost(ordersToCreate);
        } catch (error) {
            console.error('Error creating orders:', error);
        }
    };
    return (
        <div>
            <Dialog open={open} handler={setOpen}>
                <DialogHeader>Your Orders are ready !</DialogHeader>
                <DialogBody className='overflow-y-scroll'>
                    <Card>
                        <CardBody>
                            <Typography color="blue-gray">Delivery Address</Typography>
                            <div className='flex flex-col space-y-2'>
                                <input ref={addL1Ref} type='text' placeholder='Address Line 1' className='border border-gray-300 p-2 rounded-md' />
                                <input ref={addL2Ref} type='text' placeholder='Address Line 2' className='border border-gray-300 p-2 rounded-md' />
                            </div>
                        </CardBody>
                    </Card>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={handleModalOPen}>
                        cancel
                    </Button>
                    <Button variant="gradient" color="green" onClick={createOrdersFromCart}>
                       {loading ? 'Processing...' : 'Confirm Order'} 
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}
export default CartOrderModal