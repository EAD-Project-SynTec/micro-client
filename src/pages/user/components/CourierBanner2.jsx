import React from 'react';
import CourierVector from '/img/courier.png';
import { GiMoneyStack } from "react-icons/gi";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
export default function CourierBanner2() {
  return (
    <div className='md:flex justify-between mx-16 px-8'>
        <div className='w-[42rem] shrink pb-7'>
          <div className=''>
            <p className='text-white font-bold text-5xl my-6'>What are you waiting for?</p>
            <p className='text-white'>If you're passionate about delivering excellence and driving innovation in logistics, 
                we invite you to explore partnership opportunities with us.
            </p>
          </div>
          <div className='flex mt-7'>
            <div className='w-28'>
              <GiMoneyStack size={35} className='m-auto  text-white'/>
              <p className='text-center text-gray-100'>No Registration Fee</p>
            </div>
            <div className='w-28 ml-9'>
              <LiaMapMarkedAltSolid size={35} className='m-auto  text-white'/>
              <p className='text-center text-gray-100'>Extensive coverage</p>
            </div>
            <div className='w-28 ml-9'>
              <GiTakeMyMoney size={35} className='m-auto text-white'/>
              <p className='text-center text-gray-100'>Grow your Business</p>
            </div>
          </div>
          <div className='mt-8'>
            <Link to={"/couriercreate"} className='bg-transparent border-white border rounded-full inline-flex items-center 
                                        justify-center py-3 px-12 text-center text-lg font-medium  text-white
                                        disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'>
                            Get started <span className='ml-3'><FaArrowRight /></span>
                          </Link>
            </div>
        </div>
        <img src={CourierVector} className='md:w-[38rem] w-full h-auto shrink'/>
    </div>
  )
}
