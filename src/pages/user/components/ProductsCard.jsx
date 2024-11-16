import React from 'react'
import {
  Rating,
} from "@material-tailwind/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaWeight } from "react-icons/fa";
import { Link } from 'react-router-dom';
const ProductsCard = (props) => {
  
  return (
    <div>
      <Link to={`/product-details/${props.productID}`}>
        <div className="relative bg-white rounded-2xl dark:bg-gray-700">
          <div className="px-3 pt-3">
            <img
              src={"https://syntecblobstorage.blob.core.windows.net/products/" + props.productImageUrl} alt={props.productTitle} 
              className="object-cover w-[190px]  h-[150px] rounded-lg"
            />
          </div>
          {/* card body */}
          <div className='px-4 py-4'>
            <div className="mb-3 flex items-center justify-between">
              <Rating value={4} readonly  />
              <div>
                <p className=' text-xs text-gray-700'>Reviews (4)</p>
              </div>
            </div>
            <div className=' my-3'>
              <h1 className='text-lg font-semibold text-gray-800'>{props.productTitle}</h1>
            </div>
            <div className='flex justify-between text-gray-800'>
              <p className='flex items-center gap-2 text-sm'><FaWeight />{props.minimumQuantity}kg - {props.availableStock}kg</p>
            </div>
            <div className='flex justify-start mt-6'>
              <h1 className='text-primary text-xl'>Rs.{props.unitPrice.toFixed(2)}</h1>
            </div>
          </div>
        
        </div>
      </Link >
    </div>
  )
}

export default ProductsCard