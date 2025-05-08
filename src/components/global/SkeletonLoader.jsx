import React from "react";

// Custom Skeleton Loader for charts and text
const SkeletonLoader = () => (
  <div className="skeleton-container w-full  bg-white rounded-xl ">
  
    <div className="skeleton-box w-full h-64 bg-gray-300 rounded animate-pulse"></div>
  </div>
);

export default SkeletonLoader;