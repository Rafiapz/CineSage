import { FC, useEffect, useState } from "react";
import ServerDown from "../../components/serverDown/ServerDown";
import apiClient from "../../utils/axios";
import Cards from "../../components/card/Cards";

const Home: FC = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [serverIsDown, setServerIsDown] = useState(false);

   useEffect(() => {
      fetchMovies();
   });

   useEffect(() => {
      let timer: any;

      timer = setTimeout(() => {
         if (isLoading) setServerIsDown(true);
      }, 12000);

      return () => {
         clearTimeout(timer);
      };
   }, [isLoading]);

   const fetchMovies = () => {
      setIsLoading(true);
      apiClient.get("/movies/fetch-movies").finally(() => {
         setIsLoading(false);
      });
   };
   return (
      <>
         {!serverIsDown ? (
            <div className="mt-8">
               <div className="w-full h-10 flex justify-center items-center w-lg rounded-md p-4">
                  <h1 className="text-3xl font-bold text-gray-600 tracking-wide">Now Playing</h1>
               </div>
               <Cards />
            </div>
         ) : (
            <ServerDown />
         )}
      </>
   );
};

export default Home;
