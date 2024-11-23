import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SellerReviewCard from './components/reviews/components/SellerReviewCard';
import { getReviewsForFarmer } from '@/services/reviewServices';
import { FARMER_ID } from '@/usersID';

const data = [
  {
    type: 'Vegetable Gallery',
    pDate: 'Purchased on 16 Dec 2023',
    img: 'https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220',
    iType: 'Leeks Stock-500kg',
    Button: 'View',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    type: 'Vegetable Gallery',
    pDate: 'Purchased on 16 Dec 2023',
    img: 'https://purepng.com/public/uploads/large/purepng.com-carrotscarrotvegetablesfreshdeliciousefoodhealthycarrots-481521740717jmglq.png',
    iType: 'Leeks Stock-500kg',
    Button: 'View',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    type: 'Vegetable Gallery',
    pDate: 'Purchased on 16 Dec 2023',
    img: 'https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/pumpkin.jpg?itok=IXGgRg1X',
    iType: 'Leeks Stock-500kg',
    Button: 'View',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  }
]

export function MyReviews() {
  const farmerId = FARMER_ID;
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const data = await getReviewsForFarmer(farmerId);
    setReviews(data);
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <>
      <div className='bg-white rounded-lg px-8 py-2'>
        <h1 className='text-[#00000082]'> View Reviws </h1>
      </div>

      {reviews && reviews.map((item, index) => (
        <SellerReviewCard
          key={index}
          id={item.orderID}
          productId={item.productID}
          type={item.productType}
          iType={item.productTitle}
          Button={"View"}
          img={item.productImageUrl}
          description={item.productDescription}
          stock={item.availableStock}
          pDate={item.orderedDate?.split("T")[0]}
          quantity={item.totalQuantity}
        />
      ))}
    </>


  );
}

export default MyReviews;