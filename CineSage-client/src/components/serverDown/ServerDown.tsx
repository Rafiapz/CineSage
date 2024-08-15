import React from "react";

const ServerDown = () => {
   return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
         <div className="px-8 py-10 text-center bg-white rounded-xl shadow-2xl transform transition-all hover:scale-105 duration-500">
            <div className="mb-6">
               <svg
                  className="w-16 h-16 mx-auto text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <h1 className="mb-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Server is Down</h1>
            <p className="mb-8 text-lg text-gray-600">We're experiencing technical difficulties. Our team is working on it.</p>
            <button
               onClick={() => window.location.reload()}
               className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
               Refresh Page
            </button>
         </div>
      </div>
   );
};

export default ServerDown;
