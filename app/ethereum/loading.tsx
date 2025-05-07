import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
}

export default Loading;
