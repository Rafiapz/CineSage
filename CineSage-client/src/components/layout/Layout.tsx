import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";

const Layout = () => {
   return (
      <div>
         <Header />
         <div className="w-full h-10 flex justify-center items-center w-lg rounded-md p-4">
            <h1 className="text-3xl font-bold text-gray-600 tracking-wide">Now Playing</h1>
         </div>
         <Outlet />
      </div>
   );
};

export default Layout;
