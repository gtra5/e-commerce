import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Star, ShoppingCart, Eye, Clock } from "lucide-react";
import { ProductGridSkeleton } from "./Skeleton";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setError(null);

    const searchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setSearchResults(data.products || []);
      } catch (err) {
        setError(err.message);
      }
    };

    searchProducts();
  }, [query]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  const getStockStatus = (stock) => {
    if (stock <= 5)
      return { text: "Only few left!", color: "text-red-600 bg-red-50" };
    if (stock <= 15)
      return { text: "Limited stock", color: "text-orange-600 bg-orange-50" };
    return { text: "In stock", color: "text-green-600 bg-green-50" };
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

  if (searchResults.length === 0 && !error && query) {
    return (
      <div className="max-w-7xl mx-auto p-6 font-montserrat">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Search Results for "{query}"
            </h1>
          </div>
        </div>
        <ProductGridSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 font-montserrat">
      {/* Search Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Search Results for "{query}"
          </h1>
        </div>
        <p className="text-gray-600">
          Found {searchResults.length} product
          {searchResults.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Results */}
      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No products found
          </h2>
          <p className="text-gray-500 mb-4">
            Try searching with different keywords or browse our categories
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchResults.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            const discountedPrice = getDiscountedPrice(
              product.price,
              product.discountPercentage
            );

            return (
              <div
                key={product.id}
                className="bg-white shadow-lg hover:shadow-2xl p-4 rounded-2xl flex flex-col h-full group transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                onClick={() => navigate(`/details/${product.id}`)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-gray-50">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{Math.round(product.discountPercentage)}%
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors">
                      <ShoppingCart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  {/* Stock Status */}
                  <div
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full mb-2 w-fit ${stockStatus.color}`}
                  >
                    <Clock className="w-3 h-3" />
                    {stockStatus.text}
                  </div>

                  {/* Product Title */}
                  <h2 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 flex-1 leading-tight lg:text-base">
                    {product.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price Section */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(discountedPrice)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      Only {product.stock} left in stock
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
