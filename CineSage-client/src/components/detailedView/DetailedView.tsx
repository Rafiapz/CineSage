import { useEffect, useState } from "react";
import Reviews from "../reviews/Reviews";
import ReviewForm from "../forms/ReviewForm";
import { useSearchParams } from "react-router-dom";
import { fetchMovieDetailsApi } from "../../service/apiService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchallReviewsApiCall } from "../../store/actions/userActions";

const DetailedView = () => {
   const [searchQuery] = useSearchParams();
   const [movie, setMovie] = useState<any>(null);
   const id = searchQuery.get("id");
   const allReviews: any = useSelector((state: RootState) => state?.user?.reviews?.data);
   const userData: any = useSelector((state: RootState) => state?.user?.auth?.data);

   useEffect(() => {
      fetchDataAllReviews();
   }, []);

   const dispatch = useDispatch<AppDispatch>();

   const fetchDataAllReviews = async () => {
      dispatch(fetchallReviewsApiCall(id));
   };

   useEffect(() => {
      fetchMovieDetails();
   }, []);

   const fetchMovieDetails = async () => {
      try {
         const response = await fetchMovieDetailsApi(id);
         const data = response?.data?.data;
         setMovie(data);
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   useEffect(() => {
      checkDuplicate();
   });
   const checkDuplicate = () => {
      let flag = false;
      allReviews?.forEach((ob: any) => {
         if (ob?.userId?._id == userData?._id) {
            flag = true;
            return false;
         }
         console.log(ob?.userId?._id, "===", userData?._id);
      });
      if (!flag) {
         return true;
      } else {
         return false;
      }
   };

   return (
      <>
         <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
               <img src={movie?.poster} alt="Movie Title" className="w-full h-96 object-cover" />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h1 className="text-4xl font-bold text-white">{movie?.title}</h1>
               </div>
            </div>
            <div className="p-6">
               <p className="text-gray-700 text-lg leading-relaxed">{movie?.description}</p>
            </div>
         </div>
         {checkDuplicate() && <ReviewForm id={id} />}

         <Reviews id={id} />
      </>
   );
};

export default DetailedView;
