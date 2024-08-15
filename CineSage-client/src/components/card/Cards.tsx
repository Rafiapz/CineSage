import { Card } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../../service/apiService";

export const Cards: FC = () => {
   const [movies, setMovies] = useState<any>(null);

   useEffect(() => {
      fetchAllMovies();
   }, []);

   const fetchAllMovies = async () => {
      const response = await fetchMovies();
      const data = response?.data?.data;
      setMovies(data);
   };

   const navigate = useNavigate();

   const handleView = (id: any) => {
      navigate(`/detailed?id=${id}`);
   };

   return (
      <div className="p-2 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
         {movies?.map((ob: any) => (
            <div key={ob?._id} className="flex justify-center">
               <Card className="w-full max-w-sm" onClick={() => handleView(ob?._id)}>
                  <div className="w-full h-48 bg-white">
                     <img src={ob?.poster} className="w-full h-full object-cover" alt={ob?.title} />
                  </div>
                  <div className="p-5">
                     <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">{ob?.title}</h5>
                     <p className="font-normal text-gray-700 dark:text-gray-400 mb-3 line-clamp-3">{ob?.description}</p>
                     <div className="flex items-center">
                        {Array.from({ length: ob?.rating }).map((_, index) => (
                           <svg
                              key={index}
                              className="w-5 h-5 text-yellow-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                        ))}
                     </div>
                  </div>
               </Card>
            </div>
         ))}
      </div>
   );
};
