import { Rating } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import AllReview from './AllReview';
import { getReviewsForProduct } from '@/services/reviewServices';

const Review = ({ id }) => {

  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    const data = await getReviewsForProduct(id);
    setReviews(data);
  }

  useEffect(() => {
    getReviews()
  }, [id])

  return (
    <div>
      {reviews && reviews.length > 0 && <div className='bg-white px-8 py-10 rounded-lg my-4 m-8'>
        <div className='flex gap-28'>
          <div className='pr-72 border-r-2'>
            <p className='my-8'>Rating & Reviews</p>
            <div className='bg-orange-400'>
              4.5 Top Rated
            </div>
            <Rating value={4} />
            <p>651 Ratings</p>
          </div>
          <div>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={index} className="flex items-center mt-4 w-full">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">{rating} star</a>
                <div className="w-96 h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-orange-400 rounded" style={{ width: `${(index + 1) * 17}%` }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{(index + 1) * 17}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className='pt-20'>
          <AllReview id={id} />
        </div>
      </div>}
    </div>
  );
};

export default Review;
