import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchallReviewsApiCall } from "../../store/actions/userActions";

const Reviews: FC<any> = ({ id }) => {
   const allReviews: any = useSelector((state: RootState) => state?.user?.reviews?.data);

   useEffect(() => {
      fetchDataAllReviews();
   }, []);

   const dispatch = useDispatch<AppDispatch>();

   const fetchDataAllReviews = async () => {
      dispatch(fetchallReviewsApiCall(id));
   };

   let totalRating = 0;
   allReviews?.forEach((ob: any) => {
      const val = parseInt(ob?.rating);
      totalRating += val;
   });

   let avg = Math.floor(totalRating / allReviews?.length);

   let percent = new Array(5);
   let one = 0;
   let two = 0;
   let three = 0;
   let four = 0;
   let five = 0;
   allReviews?.forEach((ob: any) => {
      const val = parseInt(ob?.rating);
      if (val === 1) {
         one++;
      } else if (val === 2) {
         two++;
      } else if (val === 3) {
         three++;
      } else if (val === 4) {
         four++;
      } else if (val === 5) {
         five++;
      }
   });
   percent[4] = five;
   percent[3] = four;
   percent[2] = three;
   percent[1] = two;
   percent[0] = one;
   return (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
         {allReviews?.length > 0 ? (
            <>
               <h2 className="text-3xl font-bold mb-6">Reviews & Ratings</h2>

               <div className="flex items-center mb-6">
                  <span className="text-5xl font-bold mr-4">{avg}</span>
                  <div>
                     <div className="flex items-center">
                        {Array.from({ length: avg }).map((_, i) => (
                           <svg
                              key={i}
                              className="w-6 h-6 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                        ))}
                     </div>
                     <p className="text-gray-600">Based on {allReviews?.length} reviews</p>
                  </div>
               </div>

               <div className="mb-6">
                  {percent?.map((rating, i) => (
                     <div key={i} className="flex items-center mb-2">
                        <span className="w-10 text-sm text-gray-600">{i + 1} stars</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                           <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${rating * 20}%` }}></div>
                        </div>
                        <span className="w-10 text-sm text-gray-600 ml-2">{rating * 20}%</span>
                     </div>
                  ))}
               </div>

               <div>
                  <h3 className="text-2xl font-bold mb-4">User Reviews</h3>
                  {allReviews?.map((review: any) => (
                     <div key={review?._id} className="border-b border-gray-200 pb-4 mb-4">
                        <div className="flex items-center mb-2">
                           <span className="font-bold mr-2">{review?.userId?.fullName}</span>
                           <div className="flex">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                 <svg
                                    key={i}
                                    className="w-4 h-4 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                 </svg>
                              ))}
                           </div>
                        </div>
                        <p className="text-gray-700">{review?.review}</p>
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <div>No reviews yet</div>
         )}
      </div>
   );
};

export default Reviews;
