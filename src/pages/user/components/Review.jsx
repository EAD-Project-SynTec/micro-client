import { Rating } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import AllReview from './Allreview';
import { getReviewsForProduct } from '@/services/reviewServices';

const Review = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const getReviews = async () => {
    const data = await getReviewsForProduct(id);
    setReviews(data);
    if (data.length > 0) {
      const avgRating = data.reduce((acc, review) => acc + review.rating, 0) / data.length;
      setAverageRating(avgRating);
    }
  };

  useEffect(() => {
    getReviews();
  }, [id]);

  return (
    <div className="container mx-auto my-8">
      {reviews && reviews.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Customer Reviews</h2>
            {/* <Rating value={averageRating} readOnly /> */}
          </div>
          <div className="pt-4">
            <AllReview reviews={reviews} />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No reviews available</div>
      )}
    </div>
  );
};

export default Review;