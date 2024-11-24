import React,{useState,useEffect} from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
 import axios from 'axios';
import { formatDate } from './ReviewCard';

const SellerReviewCard = (props) => {
  const navigate = useNavigate();
  // const [productData, setProductData] = useState([]);
  // const fetchProducts = async () => {
  //   const client = axios.create({
  //     baseURL: "https://localhost:7144/api/Review/get-history"
  //   });

  //   try {
  //     client.get().then((response) => {
  //       setProductData(response.data)
  //       // console.log(response)
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // console.log(data);
  // }

  // useEffect(() => {
  //   fetchProducts();
  // }, []);


  return (
    <div>    <div className=' bg-white px-8 py-5 rounded-lg my-2'>
      <div className=' mb-5'>
        <h1 className='my-2 capitalize'>{props.type} Gallery</h1>
        <p>Purchased on {formatDate(props.pDate)}</p>
      </div>
      <div className=' flex w-full gap-4 items-end'>
        <img src={"https://syntecblobstorage.blob.core.windows.net/products/" + props.img}
          alt="" className=' w-[160px] h-[150px]' />

        <div className='w-full px-3'>
          <h1 className=' font-semibold text-gray-800 text-lg my-3 capitalize'>{props.iType} - {props.quantity}kg</h1>
          <p className='text-blue-gray-500'>{props.description}</p>
        </div>

        <div className='items-end my-8'>
          <Button className="color bg-green-400" onClick={() => navigate('/dashboard/my-reviews/review/' + props.id)} >{props.Button}</Button>
        </div>
      </div>

    </div></div>
  )
}

export default SellerReviewCard