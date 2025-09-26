"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Star, ShoppingCart, Truck, RotateCcw, Shield } from "lucide-react"
import Layout from "../result"
import { useCart } from "../context/CartContext.jsx"
import Skeleton from "./Skeleton"

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [error, setError] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        setError("Failed to load product")
        console.error("Error fetching product:", err)
      }
    }

    fetchProduct()
  }, [id])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
      />
    ))
  }

  if (!product && !error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0">
              <div className="p-4 sm:p-6 bg-white lg:col-span-1">
                <div className="mb-4">
                  <Skeleton className="w-full aspect-square rounded-lg" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-12 w-12 sm:h-16 sm:w-16 rounded-md flex-shrink-0" />
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
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-red-500 text-base sm:text-lg">{error || "Product not found"}</p>
      </div>
    )
  }

  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100

  return (
    <Layout>
      <div className="max-w-7xl mx-auto ">
        <div
          className="rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Product Info Section - Mobile First */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 lg:col-span-1 order-2 lg:order-1">
              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Price</h3>
                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
              </div>
              

              {/* Stock Info */}
              <span className="text-xs sm:text-sm text-gray-600 block">(Only {product.stock} in stock)</span>

              {/* Image Thumbnail Buttons - Mobile optimized */}
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

            {/* Image Gallery Section */}
            <div className="p-4 sm:p-6 lg:col-span-1 order-1 lg:order-2">
              {/* Main Image Display */}
              <div className="mb-4 bg-white/30 border-t-gray-400 border-t-1 border-b-gray-400 border-b-1 p-2 sm:p-4 rounded-full">
                <div className="relative aspect-square rounded-full overflow-hidden bg-white/30">
                  <img
                    src={product.images[selectedImageIndex] || product.thumbnail}
                    alt={`${product.title} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>

            
            </div>

            {/* Actions and Details Section */}
            <div className="p-4 sm:p-6 lg:col-span-1 order-3 space-y-4 sm:space-y-6">
              {/* Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="font-semibold text-gray-900 text-sm sm:text-base">Ratings:</h1>
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
              </div>
                {/* Desktop Thumbnail Buttons */}
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

              {/* Action Buttons */}
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
              

              {/* Product Features */}
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

      {/* Similar Products Section */}
      {product.category && <SimilarProducts category={product.category} currentId={product.id} />}
    </Layout>
  )
}

function SimilarProducts({ category, currentId }) {
  const [products, setProducts] = useState([])
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=8`)
      .then((res) => res.json())
      .then((data) => {
        setProducts((data.products || []).filter((p) => p.id !== currentId))
      })
  }, [category, currentId])

  if (!products.length) return null

  // Slide logic for similar products
  const showSlide = products.length >= 4
  const slideSize = 4
  const maxSlide = Math.ceil(products.length / slideSize) - 1

  // Comments placeholder
  const handlePrev = () => setSlideIndex((i) => Math.max(i - 1, 0))
  const handleNext = () => setSlideIndex((i) => Math.min(i + 1, maxSlide))

  return (
    <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8"></div>
    </div>
  )
}
