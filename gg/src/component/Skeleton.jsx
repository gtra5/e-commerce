import React from "react";

const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
      {...props}
    />
  );
};

// Product card skeleton
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Skeleton className="w-full h-48" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-8 w-full" />
    </div>
  </div>
);

// Product grid skeleton
export const ProductGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

// Text skeleton
export const TextSkeleton = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton key={index} className="h-4 w-full" />
    ))}
  </div>
);

// Image skeleton
export const ImageSkeleton = ({ className = "" }) => (
  <Skeleton className={`w-full h-48 ${className}`} />
);

// Button skeleton
export const ButtonSkeleton = ({ className = "" }) => (
  <Skeleton className={`h-10 w-24 rounded ${className}`} />
);

// Header skeleton
export const HeaderSkeleton = () => (
  <div className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-32 rounded" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

// Footer skeleton
export const FooterSkeleton = () => (
  <div className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-32" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Skeleton;


