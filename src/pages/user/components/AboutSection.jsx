import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { RiVerifiedBadgeFill } from "react-icons/ri"
const AboutSection = () => {
  return (
    <div className='bg-primary px-16 py-12 flex flex-wrap justify-center'>
        <div className='px-16'>
            <FaShippingFast className='text-5xl text-white mx-auto' />
            <p className='mx-auto text-lg font-medium my-3 text-center text-white'>Delivery within 24 Hours</p>
        </div>
        <div className=' border-y-2 md:border-y-0 md:border-x-2 py-12 md:py-0 px-16'>
            <RiVerifiedBadgeFill className='text-5xl text-white mx-auto' />
            <p className='mx-auto text-lg font-medium my-3 text-center text-white'>Freshness Guaranteed</p>
        </div>
        <div className=' px-16 pt-8 md:pt-0'>
            <BiSolidLike className='text-5xl text-white mx-auto' />
            <p className='mx-auto text-lg font-medium my-3 text-center text-white'>Amazing Deals</p>
        </div>
    </div>
  )
}

export default AboutSection