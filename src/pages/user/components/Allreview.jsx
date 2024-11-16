import React, { useState, useEffect } from 'react';
import { Rating } from '@material-tailwind/react';
import ImageGallery from '../../seller/SellerDashboard/dashboard/components/ImageGallery';
import ImageModal from '../../seller/SellerDashboard/dashboard/components/ImageModal';
import { getOrderDetails, getReviewsForProduct, getSellerDetails } from '@/services/reviewServices';
import { SingleReview } from '@/seller/SellerDashboard/dashboard/Review';
import { formatDate } from '@/seller/SellerDashboard/dashboard/components/reviews/components/ReviewCard';

const AllReview = ({id}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

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
    <div>
       {reviews && reviews.map((r) => (
            <SingleReview
              userImg={"https://syntecblobstorage.blob.core.windows.net/profilepic/" + r?.buyerProfileImageUrl}
              name={r?.buyerFirstName + " " + r?.buyerLastName}
              date={r?.reviewDate ? formatDate(r.reviewDate.split('T')[0]) : ""}
              rating={r?.productRating}
              comment={r?.comment}
              imgs={["https://syntecblobstorage.blob.core.windows.net/reviews/" + r?.reviewImageUrl]}
              // sellerImg={"https://syntecblobstorage.blob.core.windows.net/profilepic/" + seller?.farmerProfileUrl}
              // sellerName={seller?.farmerFName + " " + seller?.farmerLName}
              // // replyDate={}
              // reply={r?.reply}
              // open={open}
              // setOpen={setOpen}
              // handleOpen={handleOpen}
              // handlePopupOpen={handlePopupOpen}
              // isSubmited={isSubmited}
            />
          ))}
    </div>
    
    // <div>
    //     <hr className='pt-11'></hr>
    //   <div className='flex '>
    //     <div>
    //       <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" alt="" className='w-[50px] h-auto rounded-[20px] py-2 ml-1' />
    //     </div>
    //     <div className='ml-1'>
    //       <p>Emma Robet</p>
    //       <p className='text-blue-gray-400'>14 February 2023</p>
    //     </div>
    //     <div className='ml-8'>
    //       <Rating value={4} />
    //     </div>
    //     <p className='ml-96 text-blue-gray-800'>2 years ago...</p>
    //   </div>
    //   <div className='pt-4 mr-24'>
    //     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae corrupti totam labore, eveniet tenetur alias pariatur praesentium ducimus unde mollitia. Natus dolore optio ullam quisquam totam eligendi repellat illo neque?
    //   </div>
    //   <div className='pt-9'>
    //     <ImageModal images={returnImgs} open={open} setOpen={setOpen} />
    //     <ImageGallery returnImgs={returnImgs} handleOpen={handleOpen} />
    //   </div>
    // </div>
  );
};

export default AllReview;
