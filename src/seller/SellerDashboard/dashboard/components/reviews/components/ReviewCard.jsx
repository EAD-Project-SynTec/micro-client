import React from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function formatDate(dateString) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  const monthName = monthNames[month - 1];

  return `${day} ${monthName} ${year}`;
}

const ReviewCard = (props) => {
  const navigate = useNavigate();
  return (
    <div>    <div className=' bg-white px-8 py-5 rounded-lg my-2'>
      <div className=' mb-5'>
        <h1 className='my-2 capitalize'>{props.type} Gallery</h1>
        <p>Purchased on {formatDate(props.pDate)}</p>
      </div>
      <div className=' flex w-full gap-4 items-center'>
        <img src={"https://syntecblobstorage.blob.core.windows.net/products/" + props.img} alt={props.type}
          className=' w-[160px] h-[150px]' />

        <div className='w-full px-3'>
          <h1 className=' font-semibold text-gray-800 text-lg my-3'>{props.iType} - {props.quantity}Kg</h1>
          <p className='text-blue-gray-500'>
            {props.description}
          </p>
        </div>

        <div className='items-end my-8'>
          <Button className="color bg-green-400" onClick={() => navigate('/buyers/add-review/' + props.id)} >{props.Button}</Button>
        </div>
      </div>

    </div></div>
  )
}

export default ReviewCard