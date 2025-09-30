"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Truck,
  RotateCcw,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import Layout from "../result";
import { useCart } from "../context/CartContext.jsx";
import Skeleton from "./Skeleton";

// SimilarProducts component moved above ProductDetails
function SimilarProducts({ category, currentId }) {
  const [products, setProducts] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"
        }`}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
      />
    ));
  };
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

  // Utility function to calculate discounted price
  function getDiscountedPrice(price, discountPercentage) {
    return price - (price * discountPercentage) / 100;
  }

  // Utility function to format price
  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }

  // Slide logic for similar products
  const showSlide = products.length >= 4;
  const slideSize = 4;
  const maxSlide = Math.ceil(products.length / slideSize) - 1;

  const handlePrev = () => setSlideIndex((i) => Math.max(i - 1, 0));
  const handleNext = () => setSlideIndex((i) => Math.min(i + 1, maxSlide));

  return (
    <div className="mt-5">
      <h1 className="p-4 sm:p-6 space-y-3 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight flex-1">
        Similar product
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white rounded-xl gap-4 lg:gap-6 p-4 sm:p-6">
        {(showSlide
          ? products.slice(slideIndex * slideSize, (slideIndex + 1) * slideSize)
          : products
        ).map((product) => {
          const discountedPrice = getDiscountedPrice(
            product.price,
            product.discountPercentage
          );
          return (
            <div
              key={product.id}
              onClick={() => navigate(`/details/${product.id}`)}
              className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-b-2xl flex flex-col font-montserrat hover:shadow-xl transition-shadow cursor-pointer p-4 md:p-6"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-gray-50">
                <img
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
              </div>
              <h2 className="font-light md:text-sm md:font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.title}
              </h2>
              <div className="hidden md:flex items-center gap-1 mb-2">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-500">
                  ({product.rating})
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text:xs md:text-lg font-bold text-gray-900">
                  {formatPrice(discountedPrice)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="hidden md:block text-xs text-gray-500 line-through">
                    {Math.ceil(product.price)}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-600">
                Only {product.stock} left in stock
              </div>
            </div>
          );
        })}
      </div>
      {showSlide && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={handlePrev}
            disabled={slideIndex === 0}
            className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700">
            {slideIndex + 1} / {maxSlide + 1}
          </span>
          <button
            onClick={handleNext}
            disabled={slideIndex === maxSlide}
            className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { addItem, increment, decrement, cartItems } = useCart();

  const cartItem = cartItems.find((item) => item.id === parseInt(id));
  const currentQuantity = cartItem ? cartItem.quantity : 1;

  const mockReviews = [
    {
      id: 1,
      name: "John D.",
      rating: 5,
      comment: "Excellent quality! Highly recommend.",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah M.",
      rating: 4,
      comment: "Good product, fast shipping.",
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Mike R.",
      rating: 5,
      comment: "Perfect fit and great material.",
      date: "2024-01-08",
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
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
      }
    };

    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"
        }`}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
      />
    ));
  };

  const handleAddToCart = () => {
    if (!cartItem) {
      addItem({
        id: product.id,
        title: product.title,
        price: discountedPrice,
        unitPrice: discountedPrice,
        stock: product.stock,
        thumbnail: product.thumbnail,
        images: product.images,
        quantity: currentQuantity,
        size: selectedSize,
        color: selectedColor,
      });
    } else {
      increment(product.id);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!product && !error) {
    return (
      <Layout>
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0">
              <div className="p-4 sm:p-6 bg-white lg:col-span-1">
                <div className="mb-4">
                  <Skeleton className="w-full aspect-square rounded-lg" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-12 w-12 sm:h-16 sm:w-16 rounded-md flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
              <div className="p-4 sm:p-6 bg-gray-50 lg:col-span-2">
                <Skeleton className="h-6 sm:h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 sm:h-6 w-1/2 mb-4" />
                <Skeleton className="h-6 sm:h-8 w-1/3 mb-6" />
                <Skeleton className="h-10 sm:h-12 w-full mb-4" />
                <Skeleton className="h-4 sm:h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 sm:h-6 w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-red-500 text-base sm:text-lg">
          {error || "Product not found"}
        </p>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <Layout>
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all">
          Product added to cart!
        </div>
      )}
      <div className=" ">
        <div
          className="rounded-xl overflow-hidden lg:shadow-md "
          style={{
            backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 lg:col-span-1 order-2 lg:order-1">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight flex-1">
                  {product.title}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full border transition-colors ${
                      isWishlisted
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {product.brand}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Price
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                        -{product.discountPercentage.toFixed(0)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              <span className="text-xs sm:text-sm text-gray-600 block">
                (Only {product.stock} in stock)
              </span>

              <div className="lg:hidden">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 p-1 h-12 w-12 sm:h-16 sm:w-16 rounded-md border-2 transition-all duration-200 ${
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
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:col-span-1 order-1 lg:order-2">
              <div className="mb-4 bg-white/30 border-t-gray-400 border-t-1 border-b-gray-400 border-b-1 p-2 sm:p-4 rounded-full">
                <div className="relative aspect-square rounded-full overflow-hidden bg-white/30">
                  <img
                    src={
                      product.images[selectedImageIndex] || product.thumbnail
                    }
                    alt={`${product.title} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:col-span-1 order-3 space-y-4 sm:space-y-6 2xl:h-50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Ratings:
                </h1>
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-1 text-sm font-medium">
                    {product.rating}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({mockReviews.length} reviews)
                  </span>
                </div>
              </div>

              <div className="hidden lg:block">
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
              </div>

              <div className="flex items-center gap-3 justify-end p-4">
                <button
                  onClick={() => decrement(product.id)}
                  disabled={currentQuantity <= 1}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center">
                  {currentQuantity}
                </span>
                <button
                  onClick={() => increment(product.id)}
                  disabled={currentQuantity >= product?.stock}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="ml-2 text-xs text-gray-600">
                  (Only {product?.stock} in stock)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="w-full bg-white border border-1 border-black text-black px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 hover:border-black hover:border-2 text-sm sm:text-base">
                  Buy now
                </button>
                <button
                  className={`w-full px-4 sm:px-6 py-3 rounded-lg font-medium text-white transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-white hover:text-black active:bg-black active:text-white"
                  }`}
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck className="w-4 h-4 flex-shrink-0" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RotateCcw className="w-4 h-4 flex-shrink-0" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="p-4 sm:p-6 space-y-3 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight flex-1">
          Product details
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-10 lg:gap-6">
          <div
            className="p-4 sm:p-6 space-y-4 sm:space-y-4 border-1 border-[#e2e8f0] lg:col-span-1 order-2 lg:order-1 bg-white/30 rounded-xl lg:shadow-md"
            style={{
              backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
              backgroundSize: "40px 40px",
            }}
          >
            <h1 className="text-xl lg:text-xl font-semibold text-gray-900 leading-tight">
              Description
            </h1>
            <div className="text-gray-700 text-sm sm:text-base">
              {product.description}
            </div>
            <h1 className="text-xl lg:text-xl font-semibold text-gray-900 leading-tight">
              Warranty Information
            </h1>
            <div className="text-gray-700 text-sm sm:text-base">
              We stand behind the quality of our products. Our product comes
              with a 10-year warranty, guaranteeing against defects in materials
              and workmanship under normal use. In the unlikely event that you
              encounter any issues with your product, contact our customer
              service team, and we will be happy to assist you with a
              replacement or repair.
            </div>
          </div>

          <div
            className="p-4 sm:p-4 space-y-4 sm:space-y-6 lg:col-span-1 order-2 lg:order-1 border-1 border-[#e2e8f0] bg-white/30 rounded-xl lg:shadow-md"
            style={{
              backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
              backgroundSize: "40px 40px",
            }}
          >
            <div className="px-5 pb-5 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    General
                  </h4>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-600 font-medium">Brand:</dt>
                      <dd className="font-semibold text-gray-900">
                        {product.brand}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-600 font-medium">Category:</dt>
                      <dd className="font-semibold text-blue-600">
                        {product.category}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-600 font-medium">SKU:</dt>
                      <dd className="font-semibold text-gray-900">
                        SKU-{product.id}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-gray-600 font-medium">Weight:</dt>
                      <dd className="font-semibold text-gray-900">1.2 kg</dd>
                    </div>
                  </dl>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Dimensions
                  </h4>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-600 font-medium">Length:</dt>
                      <dd className="font-semibold text-gray-900">25 cm</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-600 font-medium">Width:</dt>
                      <dd className="font-semibold text-gray-900">15 cm</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-600 font-medium">Height:</dt>
                      <dd className="font-semibold text-gray-900">10 cm</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-gray-600 font-medium">Material:</dt>
                      <dd className="font-semibold text-gray-900">
                        Premium Quality
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div
            className="p-4 sm:p-4 space-y-4 sm:space-y-6 lg:col-span-1 order-2 lg:order-1 border-1 border-[#e2e8f0] bg-white/30 rounded-xl lg:shadow-md"
            style={{
              backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
              backgroundSize: "40px 40px",
            }}
          >
            <h2 className="text-xl font-semibold text-gray-900">Ratings</h2>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
              <div className="flex flex-col bg-blue-200 p-4 rounded-lg items-center gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  {product.rating}/5
                </span>
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {mockReviews.length} reviews
                </span>
              </div>
              <div className="flex flex-col justify-center">
                {(() => {
                  const ratingData = [
                    { star: 5, count: 0 },
                    { star: 4, count: 0 },
                    { star: 3, count: 0 },
                    { star: 2, count: 0 },
                    { star: 1, count: 0 },
                  ];
                  mockReviews.forEach((r) => {
                    const idx = ratingData.findIndex(
                      (rd) => rd.star === r.rating
                    );
                    if (idx !== -1) ratingData[idx].count += 1;
                  });
                  const total =
                    ratingData.reduce((sum, r) => sum + r.count, 0) || 1;
                  return (
                    <div className="space-y-2">
                      {ratingData.map((r) => (
                        <div key={r.star} className="flex items-center gap-2">
                          <Star
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                          />
                          <span className="text-xs text-gray-700 w-4">
                            {r.star}
                          </span>
                          <span className="text-xs text-gray-500 w-10">
                            ({r.count})
                          </span>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-3 bg-yellow-400 rounded-full"
                              style={{ width: `${(r.count / total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {product.category && (
        <SimilarProducts category={product.category} currentId={product.id} />
      )}
    </Layout>
  );
}