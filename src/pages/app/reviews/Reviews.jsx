import React from "react";
import { FaStar } from "react-icons/fa";
import { useReviews } from "../../../hooks/api/Get";

const Reviews = () => {
  const { reviews, reviewsLoading, reviewsError, loadMoreReviews, pagination } = useReviews();

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
    : 0;

  return (
    <div className="min-h-screen bg-white p-2 mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ratings and Reviews</h1>
      
      {reviewsLoading && <p>Loading reviews...</p>}
      {reviewsError && <p className="text-red-500">{reviewsError}</p>}

      <div className="border p-4 rounded-xl mt-4 shadow-xl bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ratings</h2>
        
        <div className="flex items-center gap-1 text-yellow-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"} />
          ))}
          <span className="text-sm text-gray-800 ml-2">({averageRating.toFixed(1)}) {totalReviews} reviews</span>
        </div>

        <div className="space-y-2 mb-6">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((review) => review.rating === stars).length;
            const percent = (count / totalReviews) * 100;
            return (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="w-10 text-gray-600">{stars} stars</span>
                <div className="flex-1 bg-purple-100 rounded-full h-2">
                  <div
                    className="bg-gray-700 h-2 rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="w-6 text-right text-gray-600">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border p-4 rounded-xl mt-4 ">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>

  {reviews.length === 0 && !reviewsLoading && (
    <p className="text-gray-500  text-center">No reviews submitted yet. </p>
  )}

  {reviews.map((review) => (
    <div key={review._id} className="mb-2 border p-4 rounded-lg shadow-xl">
      {/* User */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={review.userRecord.profilePicture}
          alt={review.userRecord.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">{review.userRecord.name}</p>
        </div>
      </div>

      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`mr-1 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>

      <p className="text-sm text-gray-700 mb-3">{review.comments}</p>

      <div className="text-sm text-gray-500 mb-2">
        <span className="font-medium">Service: </span>{review.serviceRecord}
      </div>
    </div>
  ))}
</div>


      {pagination.hasNextPage && (
        <button
          className="w-full p-2 bg-gray-50 text-gray-600 rounded-md mt-4"
          onClick={loadMoreReviews}
          disabled={reviewsLoading}
        >
          {reviewsLoading ? "Loading more..." : "Load More Reviews"}
        </button>
      )}
    </div>
  );
};

export default Reviews;
