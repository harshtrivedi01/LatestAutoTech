import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12 mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
