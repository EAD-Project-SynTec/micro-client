
import React from 'react';
import { Rating } from '@material-tailwind/react';

const AllReview = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 py-4">
          <div className="flex items-center">
            <div>
              <Rating value={review.rating} readOnly />
              <p className="text-gray-800">{review.comment}</p>
              {/* {review.reply && <p className="text-gray-500">Reply: {review.reply}</p>} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllReview;