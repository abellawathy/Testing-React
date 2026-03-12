import React from 'react';

function ThreadSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 mb-5 shadow animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-1/2 mb-3" />

      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />

      <div className="mt-4 h-8 w-20 bg-gray-300 rounded" />
    </div>
  );
}

export default ThreadSkeleton;
