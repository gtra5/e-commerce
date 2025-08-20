import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import Layout from "../result";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error || "Product not found"}</p>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Gallery Section */}
            <div className="p-6 bg-white">
              {/* Main Image Display */}
              <div className="mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#F2F0EA]">
                  <img
                    src={
                      product.images[selectedImageIndex] || product.thumbnail
                    }
                    alt={`${product.title} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>

              {/* Image Thumbnail Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 p-1 h-16 w-16 rounded-md border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <div className="w-full h-full rounded overflow-hidden">
                      <img
                        src={image || "/placeholder.svg?height=64&width=64"}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Image Counter */}
              <div className="text-center mt-3">
                <span className="text-sm text-gray-500">
                  {selectedImageIndex + 1} of {product.images.length}
                </span>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-6 bg-gray-50">
              <div className="space-y-4">
                {/* Brand and Category */}
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.brand}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700 bg-white">
                    {product.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.stock} in stock)
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-blue-500">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discountPercentage > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {product.discountPercentage.toFixed(0)}% OFF
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`w-full mt-6 px-6 py-3 rounded-lg font-medium text-white transition-colors duration-200 flex items-center justify-center gap-2 ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  }`}
                  disabled={product.stock === 0}
                  onClick={() =>
                    addItem({
                      id: product.id,
                      title: product.title,
                      price: discountedPrice,
                      unitPrice: discountedPrice,
                      stock: product.stock,
                      thumbnail: product.thumbnail,
                      images: product.images,
                    })
                  }
                >
                  <ShoppingCart className="h-4 w-4" />
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Similar Products Section */}
      {product.category && (
        <SimilarProducts category={product.category} currentId={product.id} />
      )}
    </Layout>
  );
}

function SimilarProducts({ category, currentId }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      `https://dummyjson.com/products/category/${encodeURIComponent(
        category
      )}?limit=8`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts((data.products || []).filter((p) => p.id !== currentId));
      });
  }, [category, currentId]);

  if (!products.length) return null;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Similar Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {products.map((item) => {
          const discountedPrice =
            item.price - (item.price * item.discountPercentage) / 100;
          return (
            <div
              key={item.id}
              className="bg-white shadow-lg hover:shadow-2xl p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col h-full group transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 cursor-pointer"
              onClick={() => (window.location.href = `/details/${item.id}`)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4 aspect-square bg-gray-50">
                <img
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Discount Badge */}
                {item.discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{Math.round(item.discountPercentage)}%
                  </div>
                )}
                {/* Quick Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                <h2 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800 mb-2 line-clamp-2 flex-1 leading-tight">
                  {item.title}
                </h2>
                {/* Rating */}
                <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                          i < Math.floor(item.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({item.rating})</span>
                </div>
                {/* Price Section */}
                <div className="mt-auto">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {item.discountPercentage > 0 && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mb-2 sm:mb-3">
                    Only {item.stock} left in stock
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
