import React from 'react';
import CourierVector from '/img/courier.jpg';
import { GiMoneyStack } from "react-icons/gi";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { GiTakeMyMoney } from "react-icons/gi";

export default function CourierBanner() {
  return (
    <div className='flex flex-wrap flex-row justify-center gap-x-9'>
      <img src={CourierVector} className='w-[32rem] h-auto shrink'/>
      
        <div className='w-[32rem] shrink pb-7'>
          <div className=''>
            <p className='text-gray-800 font-bold text-4xl my-6'>What are you waiting for?</p>
            <p className='text-gray-600'>If you're passionate about delivering excellence and driving innovation in logistics, 
                we invite you to explore partnership opportunities with us.
            </p>
          </div>
          <div className='flex mt-7'>
            <div className='w-28'>
              <GiMoneyStack size={35} className='m-auto'/>
              <p className='text-center text-gray-600'>No Registration Fee</p>
            </div>
            <div className='w-28 ml-9'>
              <LiaMapMarkedAltSolid size={35} className='m-auto'/>
              <p className='text-center text-gray-600'>Extensive coverage</p>
            </div>
            <div className='w-28 ml-9'>
              <GiTakeMyMoney size={35} className='m-auto'/>
              <p className='text-center text-gray-600'>Grow your Business</p>
            </div>
          </div>
        </div>
    </div>
  )
}
