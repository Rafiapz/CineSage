import { FC, useEffect, useState } from "react";
import { submitReview } from "../../service/apiService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchallReviewsApiCall, loginWithGoogle } from "../../store/actions/userActions";
import { useGoogleLogin } from "@react-oauth/google";

const ReviewForm: FC<any> = ({ id }) => {
   const [rating, setRating] = useState<number>(0);
   const [review, setReview] = useState("");
   const [ratingError, setRatingError] = useState("");
   const [reviewError, setReviewError] = useState("");
   const auth = useSelector((state: RootState) => state?.user?.auth?.status);
   const [reviewed, setReviewed] = useState<boolean>(false);
   const allReviews: any = useSelector((state: RootState) => state?.user?.reviews?.data);
   const userData: any = useSelector((state: RootState) => state?.user?.auth?.data);

   useEffect(() => {
      fetchDataAllReviews().then(() => {
         allReviews?.map((ob: any) => {
            if (ob?.userId === userData?.userId) {
               setReviewed(true);
            }
         });
      });
   }, []);

   const fetchDataAllReviews = async () => {
      dispatch(fetchallReviewsApiCall(id));
   };

   const dispatch = useDispatch<AppDispatch>();

   const handleRatingChange = (newRating: any) => {
      setRatingError("");
      setRating(newRating);
   };

   const handleReviewChange = (event: any) => {
      setReviewError("");
      setReview(event.target.value);
   };

   const handleSubmit = async (event: any) => {
      if (!auth) {
         googleAuth();
      }
      event.preventDefault();
      if (rating === 0) {
         setRatingError("Please select atleast one start");
         return;
      } else if (review === "") {
         setReviewError("This field is required");
         return;
      }
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("review", review);
      formData.append("movieId", id);
      setRating(0);
      setReview("");

      try {
         const response = await submitReview(formData);
         if (response?.data?.status === "ok") {
            toast.success("Successfully submitted");
            dispatch(fetchallReviewsApiCall(id));
         }
      } catch (error) {
         console.log(error);
         toast.error("Failed to submit review");
      }
   };

   const handleGoogleLoginSuccess = (tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;
      dispatch(loginWithGoogle(accessToken)).then(() => {
         toast.success("Login success");
      });
   };

   const handleGoogleLoginError = (error: any) => {
      toast(error.message);
   };

   const googleAuth = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess, onError: handleGoogleLoginError });

   return (
      <>
         {!reviewed && (
            <>
               {!auth ? (
                  <div className="mx-auto bg-white shadow-lg max-w-4xl   overflow-hidden p-6">
                     <button
                        onClick={() => googleAuth()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                     >
                        Add my review
                     </button>
                  </div>
               ) : (
                  <div className=" mx-auto bg-white shadow-lg max-w-4xl   overflow-hidden p-6">
                     <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                     <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                           <label className="block text-gray-700 text-sm font-bold mb-2">Your Rating</label>
                           <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                 <svg
                                    key={star}
                                    className={`w-8 h-8 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => handleRatingChange(star)}
                                 >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                 </svg>
                              ))}
                           </div>
                           <p className="text-red-500">{ratingError}</p>
                        </div>
                        <div className="mb-4">
                           <label htmlFor="review" className="block text-gray-700 text-sm font-bold mb-2">
                              Your Review
                           </label>
                           <textarea
                              id="review"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Write your review here..."
                              value={review}
                              onChange={handleReviewChange}
                           ></textarea>
                           <p className="text-red-500">{reviewError}</p>
                        </div>
                        <div className="flex items-center justify-between">
                           <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                           >
                              Submit Review
                           </button>
                        </div>
                     </form>
                  </div>
               )}
            </>
         )}
      </>
   );
};

export default ReviewForm;
