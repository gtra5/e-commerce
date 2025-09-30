import React, { useState, useEffect, useRef } from "react";
import { Droplets, Star, Eye, ShoppingCart, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Skincare() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);

    const fetchSkincare = async () => {
      try {
        // Fetch motorcycle products
        const skincareResponse = await fetch(
          "https://dummyjson.com/products/category/skin-care"
        );
        const beautyResponse = await fetch(
          "https://dummyjson.com/products/category/beauty"
        );
        const beautyData = await beautyResponse.json();
        const skincareData = await skincareResponse.json();

        const skincareProducts = [
          ...(skincareData.products || []),
          ...(beautyData.products || []),
        ];
        // If no automotive products found, fetch some general products as fallback
        if (skincareProducts.length === 0) {
          const generalResponse = await fetch(
            "https://dummyjson.com/products?limit=8"
          );
          const generalData = await generalResponse.json();
          setProducts(generalData.products || []);
        } else {
          setProducts(skincareProducts);
        }
        if (skincareProducts.length === 0) {
          const generalResponse = await fetch(
            "https://dummyjson.com/products?limit=8"
          );
          const generalData = await generalResponse.json();
          setProducts(generalData.products || []);
        } else {
          setProducts(skincareProducts);
        }
      } catch (error) {
        console.error("Error loading skincare products:", error);
        setProducts([]);
        setError(error.message);
      }
    };
    fetchSkincare();
  }, []);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"
        }`}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
      />
    ));
  };
  if (products.length === 0 && !error) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-lg text-gray-600">
          No automotive products found
        </div>
      </div>
    );
  }

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };
  return (
    <div className="relative w-full mx-auto  sm:py-5 font-montserrat">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-t-none shadow-lg flex flex-col items-start p-4 sm:p-6 md:flex-row md:items-center md:rounded-t-xs md:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg">
            <Droplets className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Skincare
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm">
              Hurry up! These won't last long
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/electronics?category=skin-care")}
          className="bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base mt-3 sm:mt-0"
        >
          See more
        </button>
      </div>
      <div className="relative bg-white px-0 py-0 lg:rounded-b-xl px-2 py-2 group/slider">
        {/* Left Arrow */}
        <button
          onClick={() => scrollBy(-350)}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 sm:p-2 shadow text-2xl items-center justify-center hidden sm:flex opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200"
          aria-label="Scroll left"
        >
          <svg
            className="w-5 h-5 sm:w-7 sm:h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-2 py-2 scroll-smooth hide-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {products.map((product) => {
            const discountedPrice = getDiscountedPrice(
              product.price,
              product.discountPercentage
            );

            return (
              <div
                className="bg-white shadow-lg hover:shadow-2xl p-3  sm:p-4 rounded-xl sm:rounded-2xl flex flex-col h-[250px] group transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 min-w-[160px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[200px] md:h-[300px] lg:h-[350px]"
                key={product.id}
                onClick={() => navigate(`/details/${product.id}`)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4 aspect-square bg-gray-50">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      -{Math.round(product.discountPercentage)}%
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-colors">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                    <button className="bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-colors">
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  {/* Stock Status */}

                  {/* Product Title */}
                  <h2 className="font-extralight sm:text-sm sm:font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h2>

                  {/* Rating */}
                  <div className="hidden md:flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price Section */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {formatPrice(discountedPrice)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="hidden md:block text-xs sm:text-sm text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 mb-2 sm:mb-3">
                      Only {product.stock} left in stock
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollBy(350)}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 sm:p-2 shadow text-2xl items-center justify-center hidden sm:flex opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200"
          aria-label="Scroll right"
        >
          <svg
            className="w-5 h-5 sm:w-7 sm:h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Skincare;
