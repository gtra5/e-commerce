import { useState, useEffect } from "react";
import Skeleton from "../component/Skeleton";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/mobile-accessories"
        );
        const data = await response.json();
        // Get first 6 products for our 3 sections (2 products each)
        setProducts(data.products.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="grid bg-[#F5F7F8] rounded-2xl font-sans w-full min-h-[200px] gap-4 grid-cols-1 md:grid-cols-3 xl:min-h-[300px]">
        <div className="rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 p-4">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white flex-col lg:flex-row items-center gap-3 h-full">
            <div className="flex-1 text-center lg:text-left">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            <Skeleton className="w-full lg:w-32 xl:w-40 h-32 md:h-40 xl:h-48 rounded flex-shrink-0" />
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-green-600 to-green-700 p-4">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white flex-col lg:flex-row items-center gap-3 h-full">
            <div className="flex-1 text-center lg:text-left">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            <Skeleton className="w-full lg:w-32 xl:w-40 h-32 md:h-40 xl:h-48 rounded flex-shrink-0" />
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-gray-700 to-black p-4">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white flex-col lg:flex-row items-center gap-3 h-full">
            <div className="flex-1 text-center lg:text-left">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            <Skeleton className="w-full lg:w-32 xl:w-40 h-32 md:h-40 xl:h-48 rounded flex-shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  // Mobile: side-scrollable, Desktop: grid
  return (
    <div className="w-full">
      {/* Mobile: side-scrollable */}
      <div className="flex  gap-4 overflow-x-auto scrollbar-hide px-1 py-2 sm:hidden">
        {[0, 2, 4].map((start, idx) => (
          <div
            key={idx}
            className="min-w-[85vw] max-w-[90vw] rounded-2xl bg-gradient-to-r p-4"
            style={{
              background:
                idx === 0
                  ? "linear-gradient(to right, #ea580c, #c2410c)"
                  : idx === 1
                  ? "linear-gradient(to right, #16a34a, #166534)"
                  : "linear-gradient(to right, #374151, #000)",
            }}
          >
            {products.slice(start, start + 1).map((product) => (
              <div
                key={product.id}
                className="flex bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white flex-col items-center gap-3 h-full"
              >
                <div className="flex-1 text-center">
                  <h3 className="text-base font-semibold line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm opacity-90 mt-1">${product.price}</p>
                  <button className="bg-black text-white hover:bg-gray-800 text-sm px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-3">
                    Shop Now
                  </button>
                </div>
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded flex-shrink-0"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className="hidden sm:grid bg-[#F5F7F8] rounded-2xl font-sans w-full min-h-[200px] gap-4 grid-cols-1 md:grid-cols-3 xl:min-h-[300px]">
        {/* First Section - Orange Gradient */}
        <div className="rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 p-4">
          {products.slice(0, 1).map((product) => (
            <div
              key={product.id}
              className="flex bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white flex-col lg:flex-row items-center gap-3 h-full"
            >
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base xl:text-lg opacity-90 mt-1">
                  ${product.price}
                </p>
                <button className="bg-black text-white hover:bg-gray-800 text-xs md:text-sm lg:text-base px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-3">
                  Shop Now
                </button>
              </div>
              <img
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
                className="w-full lg:w-32 xl:w-40 h-32 md:h-40 xl:h-48 object-cover rounded flex-shrink-0"
              />
            </div>
          ))}
        </div>
        {/* Second Section - Green Gradient */}
        <div className="rounded-2xl bg-gradient-to-r from-green-600 to-green-700 p-4">
          {products.slice(2, 3).map((product) => (
            <div
              key={product.id}
              className="flex bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white flex-col lg:flex-row items-center gap-3 h-full"
            >
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base xl:text-lg opacity-90 mt-1">
                  ${product.price}
                </p>
                <button className="bg-black text-white hover:bg-gray-800 text-xs md:text-sm lg:text-base px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-3">
                  Shop Now
                </button>
              </div>
              <img
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
                className="w-full lg:w-32 xl:w-40 h-32 md:h-40 xl:h-48 object-cover rounded flex-shrink-0"
              />
            </div>
          ))}
        </div>
        {/* Third Section - Gray to Black Gradient */}
        <div className="rounded-2xl bg-gradient-to-r from-gray-700 to-black p-4">
          {products.slice(4, 5).map((product) => (
            <div
              key={product.id}
              className="flex bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white flex-col lg:flex-row items-center gap-3 h-full"
            >
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base xl:text-lg opacity-90 mt-1">
                  ${product.price}
                </p>
                <button className="bg-black text-white hover:bg-gray-800 text-xs md:text-sm lg:text-base px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-3">
                  Shop Now
                </button>
              </div>
              <img
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
                className="w-full lg:w-32 xl:w-40 h-32 md:h-40 xl:h-48 object-cover rounded flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
