import { useState, useEffect } from "react";
import { Clock, Star, ShoppingCart, Eye, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopSales() {
  const [limitedStockDeals, setLimitedStockDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const lowStockProducts = data.products
          .filter((product) => product.stock < 40)
          .slice(0, 10); // Limit to 10 products for better performance
        setLimitedStockDeals(lowStockProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });
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

  const getStockStatus = (stock) => {
    if (stock <= 5)
      return { text: "Only few left!", color: "text-red-600 bg-red-50" };
    if (stock <= 15)
      return { text: "Limited stock", color: "text-orange-600 bg-orange-50" };
    return { text: "Low stock", color: "text-yellow-600 bg-yellow-50" };
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  if (error) {
    return (
      <div className="relative w-full max-w-7xl mx-auto py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Oops! Something went wrong
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto py-4 sm:py-6 font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-none shadow-lg md:rounded-t-2xl">
        <div className="flex flex-col items-start p-4 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg">
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Limited Stock Deals
              </h1>
              <p className="text-blue-100 text-xs sm:text-sm">
                Hurry up! These won't last long
              </p>
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base mt-3 sm:mt-0">
            See All Deals
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-b-2xl">
        {loading ? (
          <div className="p-4 sm:p-8">
            <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-3 sm:p-4 animate-pulse"
                >
                  <div className="bg-gray-200 aspect-square rounded-lg mb-3 sm:mb-4"></div>
                  <div className="bg-gray-200 h-3 sm:h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 sm:h-4 rounded w-2/3 mb-2"></div>
                  <div className="bg-gray-200 h-4 sm:h-6 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {limitedStockDeals.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              const discountedPrice = getDiscountedPrice(
                product.price,
                product.discountPercentage
              );

              return (
                <div
                  className="bg-white shadow-lg hover:shadow-2xl p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col h-full group transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100"
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
                    <div
                      className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full mb-2 w-fit ${stockStatus.color}`}
                    >
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="text-xs sm:text-sm">
                        {stockStatus.text}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 line-clamp-2 flex-1 leading-tight lg:text-base">
                      {product.title}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
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
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>

                      {/* Stock Counter */}
                      <div className="text-xs text-gray-600 mb-2 sm:mb-3">
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
    </div>
  );
}

export default TopSales;
