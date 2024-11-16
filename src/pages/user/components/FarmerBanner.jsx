import React from 'react';
import farmerVector from '/img/farmer.jpg';
import { GiMoneyStack } from "react-icons/gi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaHandHoldingDollar } from "react-icons/fa6";

export default function FarmerBanner() {
  return (
    <div className='flex flex-wrap flex-row justify-center gap-x-9'>
      <img src={farmerVector} className='w-[32rem] h-auto shrink'/>
      
        <div className='w-[32rem] shrink pb-7'>
          <div className=''>
            <p className='text-gray-800 font-bold text-5xl my-6'>Fuel Your Success</p>
            <p className='text-gray-600'>Start your seller journey today.</p>
            <p className='text-gray-600'>Sign Up and Sell Online</p>
          </div>
          <div className='flex mt-7'>
            <div className='w-28'>
              <GiMoneyStack size={35} className='m-auto'/>
              <p className='text-center text-gray-600'>No Registration Fee</p>
            </div>
            <div className='w-28 ml-9'>
              <LiaShippingFastSolid size={35} className='m-auto'/>
              <p className='text-center text-gray-600'>Convenient Shipping Methods</p>
            </div>
            <div className='w-28 ml-9'>
              <FaHandHoldingDollar size={35} className='m-auto'/>
              <p className='text-center text-gray-600'>Reduce Cost Of Doing Business</p>
            </div>
          </div>
        </div>
    </div>
  )
}
