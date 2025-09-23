"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CATEGORIES_API = "https://dummyjson.com/products/categories"

const Subheader = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch(CATEGORIES_API)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setCategories(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError("Failed to load categories")
        // Fallback categories in case API fails
        setCategories([
          "smartphones",
          "laptops",
          "fragrances",
          "skincare",
          "groceries",
          "home-decoration",
          "furniture",
          "tops",
          "womens-dresses",
          "womens-shoes",
          "mens-shirts",
          "mens-shoes",
          "mens-watches",
          "womens-watches",
          "womens-bags",
          "womens-jewellery",
          "sunglasses",
          "automotive",
          "motorcycle",
          "lighting",
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (category) => {
    // Handle both string and object category formats
    const categorySlug = typeof category === "string" ? category : category.slug || category.name || category
    navigate(`/electronics?category=${encodeURIComponent(categorySlug)}`)
  }

  const formatCategoryName = (category) => {
    // Handle both string and object category formats
    let categoryName

    if (typeof category === "string") {
      categoryName = category
    } else if (typeof category === "object" && category !== null) {
      categoryName = category.name || category.slug || String(category)
    } else {
      categoryName = String(category)
    }

    return categoryName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const getCategoryIcon = (category) => {
    // Handle both string and object category formats
    let categoryKey

    if (typeof category === "string") {
      categoryKey = category
    } else if (typeof category === "object" && category !== null) {
      categoryKey = category.slug || category.name || String(category)
    } else {
      categoryKey = String(category)
    }

    const iconMap = {
      smartphones: "📱",
      laptops: "💻",
      fragrances: "🌸",
      skincare: "🧴",
      groceries: "🛒",
      "home-decoration": "🏠",
      furniture: "🪑",
      tops: "👕",
      "womens-dresses": "👗",
      "womens-shoes": "👠",
      "mens-shirts": "👔",
      "mens-shoes": "👟",
      "mens-watches": "⌚",
      "womens-watches": "⌚",
      "womens-bags": "👜",
      "womens-jewellery": "💍",
      sunglasses: "🕶️",
      automotive: "🚗",
      motorcycle: "🏍️",
      lighting: "💡",
    }
    return iconMap[categoryKey] || "📦"
  }

  if (loading) {
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Loading categories...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-b border-red-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            <span className="text-red-600">⚠️ {error}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Desktop Categories */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-sm font-medium text-gray-600">
              <span>Categories:</span>
            </div>
            <div className="flex items-center space-x-6 overflow-x-auto hide-scrollbar">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="relative group flex-shrink-0"
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all duration-200 whitespace-nowrap"
                  >
                    <span className="text-base">{getCategoryIcon(category)}</span>
                    <span>{formatCategoryName(category)}</span>
                  </button>

                  {/* Hover tooltip */}
                  {hoveredCategory === category && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                      {formatCategoryName(category)}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Categories</span>
            <div className="text-xs text-gray-500">{categories.length} items</div>
          </div>

          {/* Mobile scrollable categories */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="flex flex-col items-center space-y-1 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex-shrink-0 min-w-[80px]"
              >
                <span className="text-lg">{getCategoryIcon(category)}</span>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {formatCategoryName(category)}
                </span>
              </button>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default Subheader
