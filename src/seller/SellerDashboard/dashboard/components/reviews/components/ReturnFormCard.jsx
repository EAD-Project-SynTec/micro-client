import React, { useState, useRef, useEffect } from 'react';
import { MdPhotoCamera } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import FileSelect from '@/buyer/components/reuseble/FileSelect';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from './ReviewCard';
import { addReturn, getReturnOrderDetails } from '@/services/returnServices';

const ReturnFormCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(0);
    const incrementInterval = useRef(null);
    const decrementInterval = useRef(null);
    const [costPerUnit, setCostPerunit] = useState(3000);
    const [maxQuantity, setMaxQuantity] = useState(100)
    // const costPerUnit = costPerProduct / 2; // Assuming 2 kg for Rs.30000.00

    const [selectedFiles, setSelectedFiles] = useState([])
    const [reason, setReason] = useState("")

    const startIncrement = () => {
        stopIncrement();
        incrementInterval.current =
            setQuantity(prevQuantity => Math.min(prevQuantity + 1, maxQuantity));

    };

    const stopIncrement = () => {
        if (incrementInterval.current) {
            clearInterval(incrementInterval.current);
        }
    };

    const startDecrement = () => {
        stopDecrement();
        decrementInterval.current =
            setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));

    };

    const stopDecrement = () => {
        if (decrementInterval.current) {
            clearInterval(decrementInterval.current);
        }
    };

    const amountPerQuantity = quantity * costPerUnit;

    const [orderData, setOrderData] = useState({})

    const fetchOrderDetails = async () => {
        const data = await getReturnOrderDetails(id);
        console.log(data);
        setOrderData(data);
        setQuantity(data?.totalQuantity)
        setCostPerunit(data?.totalPrice)
        setMaxQuantity(data?.totalQuantity)
    }

    const addFormData = () => {
        const formData = new FormData();
        formData.append("OrderID", id);
        formData.append("Reason", reason);
        formData.append("ReturnQuantity", quantity);
        formData.append("ReturnPrice", quantity * costPerUnit);
        formData.append("ReturnPrice", quantity * costPerUnit);
        if (selectedFiles.length > 0) {
            formData.append("file", selectedFiles[0]);
        }

        handleAddReturn(formData);
    };

    const handleAddReturn = async (formData) => {
        try {
            const response = await addReturn(formData);
            if (response.status === 200) {
                console.log('Return added successfully!', response);
                navigate('/buyers/my-returns');
            }
        } catch (error) {
            console.error('Error adding return:', error);
        }
    };

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    return (
        <div>
            <div className='bg-white rounded-lg px-8 py-2'>
                <h1 className='text-[#00000082]'>Select Product to Return and Refund</h1>
            </div>
            <div className='bg-white px-8 py-2 rounded-lg my-2 pb-1'>
                <div className='flex gap-[400px] text-[#878787]'>
                    <div className='mb-4'>
                        <h1 className='capitalize'>{orderData?.productType} Gallery</h1>
                        <h1>Sold by {orderData?.sellerName}</h1>
                    </div>
                    <div>
                        <h1>Delivered</h1>
                        <h1>Delivered on {orderData?.returnDate ? formatDate(orderData?.returnDate.split('T')[0]) : ""}</h1>
                    </div>
                </div>
                <hr className='py-2' />
                <div className='flex w-full gap-4 items-end'>
                    <img
                        src={"https://syntecblobstorage.blob.core.windows.net/products/" + orderData?.productImageUrl}
                        alt=""
                        className='w-[160px] h-[120px]'
                    />

                    <div className='w-full px-3'>
                        <h1 className='font-semibold text-gray-800 text-lg my-3'>{orderData?.productTitle} - {orderData?.totalQuantity}kg</h1>
                        <p className='text-blue-gray-500'>
                            {orderData?.productDescription}
                        </p>
                    </div>
                </div>
                <div className='py-8 text-gray-600 font-semibold'>
                    <h1>Cost Of Product : Rs.{orderData?.totalPrice}</h1>
                    <div className='flex gap-6'>
                        <h1 className='mt-1 text-base'>Select Quantity - {quantity} kg</h1>
                        <button
                            onClick={startDecrement}
                            className='bg-[#5fe53e] px-4 py-1 rounded-lg text-white transform transition duration-300 ease-in-out hover:bg-black hover:scale-105'
                        >
                            -
                        </button>
                        <button
                            onClick={startIncrement}
                            className='bg-[#5fe53e] px-4 py-1 rounded-lg text-white transform transition duration-300 ease-in-out hover:bg-black hover:scale-105'
                        >
                            +
                        </button>
                    </div>
                    <h1>Amount per quantity : Rs.{amountPerQuantity.toFixed(2)}</h1>
                </div>
            </div>

            <div className='bg-white rounded-lg my-2 py-5'>
                <h1 className='px-8'>Add Photos</h1>
                <FileSelect selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            </div>

            <div className='bg-[#ffff] rounded-lg'>
                <div className='flex mx-6 py-5 pt-5'>
                    <div>
                        <h1>Add Written Reason</h1>
                    </div>
                    <div className='ml-auto opacity-60'>
                        <h1>0/500</h1>
                    </div>
                </div>
                <div className='text-center'>
                    <input type='text' placeholder='Type the reason....' onChange={(e) => {
                        setReason(e.target.value)
                    }} className='w-[600px] h-12 bg-[#F7FFF1] rounded-lg text-center' />
                </div>
                <div className='pt-5'></div>
            </div>

            <div>
                <div className='bg-white my-2 rounded-lg'>
                    <br />
                    <input type="radio" className='mx-5 w-5 h-5' name='select' required value='To buy the same type or a different type' id='To buy the same type or a different type' />
                    <label htmlFor='To buy the same type or a different type'>To buy the same type or a different type</label>
                </div>
            </div>
            <div className='bg-white text-center my-2 rounded-lg pt-6 pb-4'>
                <div>
                    <button type='submit' onClick={(e) => {
                        e.preventDefault();
                        addFormData();
                    }} className='bg-[#44BD32] px-28 rounded-lg h-9 text-white'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ReturnFormCard;
