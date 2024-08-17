import { Card } from "flowbite-react";

function Loading() {
   return (
      <div className="p-2 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[...Array(8)].map((_, index) => (
            <div key={index} className="flex justify-center">
               <Card className="w-full max-w-sm animate-pulse">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-5">
                     <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                     <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                     <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                     <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
                     <div className="flex items-center">
                        {[...Array(5)].map((_, starIndex) => (
                           <div key={starIndex} className="w-5 h-5 bg-gray-300 rounded-full mr-1"></div>
                        ))}
                     </div>
                  </div>
               </Card>
            </div>
         ))}
      </div>
   );
}

export default Loading;
