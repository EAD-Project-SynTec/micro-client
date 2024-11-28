import React from 'react'
import { IoMdCall } from "react-icons/io";
const SellerDetails = ({ farmerFName, farmerLName, farmerProfileUrl, farmerAddL1, farmerAddL2, farmerAddL3, farmerContact }) => {
    const defaultProfileUrl = 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg';
    return (
        <>
            <div className='bg-white rounded-md px-2 py-3 mt-3' >
                <h1 className='text-gray-900 font-semibold text-xl mx-3'>Seller Details</h1>
                <div className='flex gap-3 items-start mt-3'>
                    <img
                        src={farmerProfileUrl ? ('https://syntecblobstorage.blob.core.windows.net/profilepic/' +farmerProfileUrl) : defaultProfileUrl}
                        alt="seller"
                        className="w-20 h-20 rounded-full"
                    />
                    <div>
                        <h1 className='text-gray-800 font-semibold'>{farmerFName + ' ' + farmerLName}</h1>
                        <div>
                            <p className='text-gray-700'>{'No:' + farmerAddL1 + ','}</p>
                            <p className='text-gray-700'>{farmerAddL2 + ','}</p>
                            <p className='text-gray-700'>{farmerAddL3}</p>

                        </div>
                        <div className='flex items-center gap-2'>
                            <IoMdCall className='text-gray-800' />
                            <p className='text-gray-800'>{farmerContact}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerDetails