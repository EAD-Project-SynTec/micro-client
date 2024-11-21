import React, { useEffect, useState } from 'react';
import { Rating } from "@material-tailwind/react";
import ImageModal from './components/ImageModal';
import ImageGallery from './components/ImageGallery';
import {
  Button,
} from "@material-tailwind/react";
import PopupBox from './components/reviews/components/PopupBox';
import NormalReviewCard from './components/reviews/components/NormalReviewCard';
import { getOrderDetails, getReviewsForProduct, getSellerDetails } from '@/services/reviewServices';
import { formatDate } from './components/reviews/components/ReviewCard';
import { useParams } from 'react-router-dom';

const paragraStyles = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
};

const data = [
  {
    type: 'Vegetable Gallery',
    pDate: 'Purchased on 16 Dec 2023',
    img: "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
    diliDate: 'Returned on 16 Dec 2023',
    iType: 'Leeks Stock-500kg',
    rq: 'Returned Quantity - 100kg',
    cof: 'Amount Returned Quantity - Ru.10000.00',
    Button: 'View'
  }
];

export const SingleReview = (props) => {
  return (
    <>
      <div className='flex'>
        <div>
          <img src={props.userImg} alt="" className='w-[50px] h-auto rounded-[20px] py-2 ml-8' />
        </div>
        <div className='ml-6'>
          <p>{props.name}</p>
          <p className='text-blue-gray-400'>{props.date}</p>
        </div>
        <div className='ml-8'>
          <Rating value={props.rating} />
        </div>
        <p className='ml-96 text-blue-gray-800'>2 years ago...</p>
      </div>
      <p className='py-5 px-28 text-blue-gray-800' style={{ ...paragraStyles }}>
        {props.comment}
      </p>
      <div className='ml-28'>
        <ImageModal images={props.imgs} open={props.open} setOpen={props.setOpen} />
        <ImageGallery returnImgs={props.imgs} handleOpen={props.handleOpen} />
      </div>
      {props.reply && <>
        <div className='flex py-7 ml-52'>
          <div>
            <img src={props.sellerImg} alt="" className='w-[50px] h-auto rounded-[20px] py-2 ml-8' />
          </div>
          <div className='ml-6'>
            <p>{props.sellerName}</p>
            <p className='text-blue-gray-400'>{props.replyDate}</p>
          </div>
        </div>
        <p className='ml-80'>{props.reply}</p>
      </>}

      {props.sellerName && <div className=' my-8 flex ml-[750px]'>
        <Button className="color bg-green-400 " onClick={props.handlePopupOpen} >{props.isSubmited ? "Edit" : "Reply"}</Button>
      </div>}

      <div className='pb-2 mb-2'></div>

      <hr className='py-2' />
    </>
  )
}

const Review = () => {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [isSubmited, setIsSubmited] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handlePopupOpen = () => setPopupOpen(true);

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [seller, setSeller] = useState({});

  const getProductData = async () => {
    const data = await getOrderDetails(id);
    setProduct(data);
  }

  const getReviews = async () => {
    const data = await getReviewsForProduct(product?.productId);
    console.log(data);
    setReviews(data);
  }

  const getSellerData = async () => {
    const data = await getSellerDetails(product?.productId);
    console.log(data);
    setSeller(data);
  }

  useEffect(() => {
    getProductData()
  }, [])

  useEffect(() => {
    getReviews()
    getSellerData();
  }, [product])

  return (
    <>
      <PopupBox
        open={popupOpen}
        setOpen={setPopupOpen}
        // handleSubmit={handlePopupSubmit}
        id={product?.reviewId}
      />
      <div>

        <div className='bg-white rounded-lg px-8 py-2 '>
          <h1 className='text-[#00000082]'> Reply Reviews</h1>
        </div>
        <div className='bg-white rounded-lg'>
          <NormalReviewCard
            key={product?.reviewId}
            type={product?.productType}
            pDate={product?.orderedDate ? formatDate(product.orderedDate.split('T')[0]) : ""}
            iType={product?.productTitle}
            img={"https://syntecblobstorage.blob.core.windows.net/products/" + product?.productImageUrl}
            quantity={product?.totalQuantity}
            desc={product?.productDescription}
          />

          <hr className='py-2' />

          {reviews && reviews.map((r) => (
            <SingleReview
              userImg={"https://syntecblobstorage.blob.core.windows.net/profilepic/" + r?.buyerProfileImageUrl}
              name={r?.buyerFirstName + " " + r?.buyerLastName}
              date={r?.reviewDate ? formatDate(r.reviewDate.split('T')[0]) : ""}
              rating={r?.productRating}
              comment={r?.comment}
              imgs={["https://syntecblobstorage.blob.core.windows.net/reviews/" + r?.reviewImageUrl]}
              sellerImg={"https://syntecblobstorage.blob.core.windows.net/profilepic/" + seller?.farmerProfileUrl}
              sellerName={seller?.farmerFName + " " + seller?.farmerLName}
              // replyDate={}
              reply={r?.reply}
              open={open}
              setOpen={setOpen}
              handleOpen={handleOpen}
              handlePopupOpen={handlePopupOpen}
              isSubmited={isSubmited}
            />
          ))}

        </div>

      </div>
      <div>

      </div>
    </>
  );
}

export default Review;

