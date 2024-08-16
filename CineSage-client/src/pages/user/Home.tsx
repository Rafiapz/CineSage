import { FC, useEffect, useState } from "react";
import { Cards } from "../../components/card/Cards";
import ServerDown from "../../components/serverDown/ServerDown";
import apiClient from "../../utils/axios";

const Home: FC = () => {
   const [serverIsDown, setServerIsDown] = useState(false);

   useEffect(() => {
      fetchMovies();
   });

   const fetchMovies = () => {
      apiClient
         .get("/movies/fetch-movies")
         .then((res) => {
            setServerIsDown(false);
         })
         .catch((err) => {
            console.log("err", err);
            setServerIsDown(true);
         });
   };
   return (
      <div className={`${!serverIsDown ? "mt-8" : ""}`}>
         {!serverIsDown && (
            <div className="w-full h-10 flex justify-center items-center w-lg rounded-md p-4">
               <h1 className="text-3xl font-bold text-gray-600 tracking-wide">Now Playing</h1>
            </div>
         )}

         {!serverIsDown ? <Cards /> : <ServerDown />}
         {/* <Cards />
         <ServerDown /> */}
      </div>
   );
};

export default Home;
