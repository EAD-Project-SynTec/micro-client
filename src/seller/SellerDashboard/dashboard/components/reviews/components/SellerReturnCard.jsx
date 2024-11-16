import React from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { formatDate } from './ReviewCard';

const SellerReturnCard = (props) => {
    const navigate = useNavigate();

    console.log(props)

    return (
        <div>

            <div className='bg-white px-8 py-5 rounded-lg my-2 pb-1'>
                <div className='flex gap-[400px] text-[#878787]'>
                    <div className='mb-4'>
                        <h1 className='capitalize'>{props.type} Gallery</h1>
                        <h1>Purchased on {formatDate(props.orderDate)}</h1>
                    </div>
                    <div>
                        <h1>{props.dili}</h1>
                        <h1>Returned on {formatDate(props.diliDate)}</h1>
                    </div>
                </div>
                <hr className='py-2'></hr>
                <div className='flex w-full gap-4 items-end'>
                    <img
                        src={"https://syntecblobstorage.blob.core.windows.net/products/" + props.img}
                        alt=""
                        className='w-[160px] h-[120px]'
                    />

                    <div className='w-full px-3'>
                        <h1 className='font-semibold text-gray-800 text-lg my-3'>{props.iType} - {props.quantity}Kg</h1>
                        <p className='text-blue-gray-500'>
                            {props.description}
                        </p>
                    </div>
                </div>

                <div className='mt-8'>{props.rq}</div>
                <div className='py-3 flex place-items-center'>
                    <div>
                        <div>Returned Quantity: {props.cof}kg</div>
                        <div>Returned Price: LKR {props.returnPrice?.toFixed(2)}</div>
                    </div>
                    <div className='ml-auto '>
                        <Button className="color bg-green-400 " onClick={() => navigate(props.path + props.orderId)} >{props.Button}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerReturnCard