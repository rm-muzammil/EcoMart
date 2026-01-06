import React from "react";

function CardLoading() {
  return (
    <div>
      <div className="animate-pulse border border-gray-200 rounded-md p-4 w-48">
        <div className="bg-gray-300 h-32 w-full mb-4"></div>
        <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 mb-2 w-1/2"></div>
        <div className="h-8 bg-gray-300 w-full"></div>
      </div>
    </div>
  );
}

export default CardLoading;
