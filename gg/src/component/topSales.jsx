import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Star } from 'lucide-react'

function TopSales() {
  const [activeHeader, setActiveHeader] = useState("Laptops")
  const categories = ["Laptops", "mens-watches", "tablets", "tops"]
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (activeHeader) {
      setLoading(true)
      fetch(`https://dummyjson.com/products/category/${activeHeader}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products.slice(0, 12)) // Limit to 12 products
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching products:", error)
          setLoading(false)
        })
    }
  }, [activeHeader])

  const handleHeaderClick = (categoryName) => {
    setActiveHeader(categoryName)
    console.log(`${categoryName} category clicked`)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        }`}
      />
    ))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100
  }

  const renderCards = () => {
    if (loading) {
      return (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-card text-card-foreground p-6 rounded-lg shadow-sm animate-pulse">
              <div className="w-full h-32 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      )
    }

    return (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-6">
        {products.map((product) => {
          const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
          return (
            <div
              key={product.id}
              onClick={() => navigate(`/details/${product.id}`)}
              className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-b-2xl  flex flex-col font-montserrat hover:shadow-xl transition-shadow cursor-pointer p-4  md:p-6"
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
              <h2 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h2>
              <div className="flex items-center gap-1 mb-2">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-500">({product.rating})</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text:xs md:text-lg font-bold text-gray-900">{formatPrice(discountedPrice)}</span>
                {product.discountPercentage > 0 && (
                  <span className="md:text-xs text-gray-500 line-through ">{Math.ceil(product.price)}</span>
                )}
              </div>
              <div className="text-xs text-gray-600">Only {product.stock} left in stock</div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="px-4 py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Trending Products</h1>

  <div className="flex space-x-2 overflow-x-auto custom-scrollbar  [&::-webkit-scrollbar]:hidden  mb-2">
        {categories.map((category) => (
          <div key={category} className="inline-block p-1 md:p-0">
            {/* Mobile enhanced button */}
            <button
              key={`${category}-mobile`}
              onClick={() => handleHeaderClick(category)}
              className={`md:hidden relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap ${
                activeHeader === category
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              <span className="relative z-10">
                {category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>

              {/* Active glow effect */}
              {activeHeader === category && (
                <div className="absolute inset-0  rounded-full bg-gradient-to-r from-blue-400 to-blue-500 opacity-20 blur-sm animate-pulse" />
              )}
            </button>

            {/* Desktop original button */}
            <button
              key={`${category}-desktop`}
              onClick={() => handleHeaderClick(category)}
              className={`hidden md:block px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeHeader === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          </div>
        ))}
      </div>

      {activeHeader && renderCards()}
    </div>
  )
}

export default TopSales
