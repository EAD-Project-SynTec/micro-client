import React from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const ReturnCard = (props) => {
  const navigate = useNavigate();
     
  return (
    <div>        
    
    <div className='bg-white px-8 py-5 rounded-lg my-2 pb-1'>
        <div className='flex gap-[400px] text-[#878787]'>
            <div className='mb-4'>
                <h1>{props.type} </h1>
                <h1>{props.who}</h1>
            </div>
            <div>
                <h1>{props.dili}</h1>
                <h1>{props.diliDate}</h1>
            </div>
        </div>
        <hr className='py-2'></hr>
        <div className='flex w-full gap-4 items-end'>
            <img
                src={props.img}
                alt=""
                className='w-[160px] h-[120px]'
            />

            <div className='w-full px-3'>
                <h1 className='font-semibold text-gray-800 text-lg my-3'>{props.iType}</h1>
                <p className='text-blue-gray-500'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Exercitationem, libero optio voluptate accusantium temporibus quis
                    aperiam soluta nihil est magnam omnis, aliquam architecto
                    necessitatibus quaerat delectus eveniet in totam quos.
                </p>
            </div>
        </div>
        
            <div className='mt-8'>{props.rq}</div>
            <div className='py-3 flex place-items-center'>
            <div>{props.cof}</div>
            <div className='ml-auto '>
                <Button className="color bg-green-400 " onClick={() => navigate('/buyers/return')} >{props.Button}</Button>
            </div>
        </div>
    </div>
</div>
  )
}

export default ReturnCard