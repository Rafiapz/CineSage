import { FC } from "react";
import { Cards } from "../../components/card/Cards";
import ServerDown from "../../components/serverDown/ServerDown";

const Home: FC = () => {
   return (
      <div className="">
         {/* <div className="w-full h-10 flex justify-center items-center w-lg rounded-md p-4">
            <h1 className="text-3xl font-bold text-gray-600 tracking-wide">Now Playing</h1>
         </div> */}

         {/* <Cards /> */}
         <ServerDown />
      </div>
   );
};

export default Home;
