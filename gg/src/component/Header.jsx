"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserRoundCheck, CheckCircle, Grid } from "lucide-react";
import Subheader from "./Subheader";

// API constants
const CATEGORIES_API = "https://dummyjson.com/products/categories";

// Popular search terms
const popularSearches = [
  "laptop",
  "smartphone",
  "headphones",
  "shoes",
  "dress",
  "watch",
  "camera",
  "books",
  "gaming",
  "fitness",
];

// Search suggestions based on categories
const searchSuggestions = {
  electronics: [
    "laptop",
    "smartphone",
    "headphones",
    "camera",
    "tablet",
    "speakers",
  ],
  fashion: ["dress", "shoes", "jeans", "shirt", "jacket", "accessories"],
  home: ["furniture", "decor", "kitchen", "bedding", "lighting", "storage"],
  beauty: ["skincare", "makeup", "perfume", "haircare", "cosmetics"],
  sports: ["fitness", "running", "yoga", "equipment", "clothing", "shoes"],
};

// Reusable Clock SVG Icon Component
const ClockIcon = ({ className, strokeColor = "#f59e0b" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={strokeColor}
      strokeWidth="2"
      fill="#fff"
    />
    <path
      d="M12 6v6l4 2"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Header = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const searchRef = useRef(null);
  const { cartCount = 0 } = useCart(); // Fallback to 0 if cartCount is undefined
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Fetch categories for mobile menu
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch(CATEGORIES_API);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
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
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Helper functions for categories
  const formatCategoryName = (category) => {
    // Handle both string and object category formats
    let categoryName;

    if (typeof category === "string") {
      categoryName = category;
    } else if (typeof category === "object" && category !== null) {
      categoryName = category.name || category.slug || String(category);
    } else {
      categoryName = String(category);
    }

    return categoryName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getCategoryIcon = (category) => {
    // Handle both string and object category formats
    let categoryKey;

    if (typeof category === "string") {
      categoryKey = category;
    } else if (typeof category === "object" && category !== null) {
      categoryKey = category.slug || category.name || String(category);
    } else {
      categoryKey = String(category);
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
    };
    return iconMap[categoryKey] || "📦";
  };

  const handleCategoryClick = (category) => {
    // Handle both string and object category formats
    const categorySlug =
      typeof category === "string"
        ? category
        : category.slug || category.name || category;
    navigate(`/eletronics?category=${encodeURIComponent(categorySlug)}`);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Save recent searches to localStorage
  const saveRecentSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== trimmed);
      const updated = [trimmed, ...filtered].slice(0, 5);
      localStorage.setItem("recent-searches", JSON.stringify(updated));
      return updated;
    });
  };

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query.trim()) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    const suggestions = new Set();

    // Add matching popular searches
    popularSearches.forEach((term) => {
      if (term.toLowerCase().includes(lowerQuery)) {
        suggestions.add(term);
      }
    });

    // Add matching category-based suggestions
    Object.values(searchSuggestions)
      .flat()
      .forEach((term) => {
        if (term.toLowerCase().includes(lowerQuery)) {
          suggestions.add(term);
        }
      });

    // Add matching recent searches
    recentSearches.forEach((term) => {
      if (term.toLowerCase().includes(lowerQuery)) {
        suggestions.add(term);
      }
    });

    return Array.from(suggestions).slice(0, 8);
  };

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      const suggestions = generateSuggestions(value);
      setFilteredSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    saveRecentSearch(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      try {
        if (authUser) {
          const userDoc = await getDoc(doc(db, "users", authUser.uid));
          setUser({
            ...authUser,
            username: userDoc.exists() ? userDoc.data().username : null,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-white shadow-sm z-50">
      {/* Top bar */}
      <div className="w-full bg-gray-100 text-xs text-gray-700 flex flex-col md:flex-row justify-between items-center px-2 md:px-4 py-2 space-y-1 md:space-y-0">
        <div className="flex items-center space-x-2">
          <ClockIcon className="inline h-4 w-4 mr-1" />
          <a href="#" className="hover:underline text-orange-500 font-medium">
            Sell on Travelstore
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-gray-400 font-semibold">
          <span className="flex items-center space-x-1">
            <a className="text-gray-700 font-bold" href="/home">
              Travelstore
            </a>
            <ClockIcon className="inline h-4 w-4" />
          </span>
          <span>PAY</span>
          <span>DELIVERY</span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 md:py-4 flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
        {/* Logo and Mobile Actions */}
        <div className="flex items-center flex-shrink-0 w-full md:w-auto justify-between">
          <span className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <a href="/home">
              Travel
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 leading-none tracking-tight">
                Store
              </span>
            </a>
            <ClockIcon className="ml-1 h-6 w-6" />
          </span>
          <div className="flex items-center space-x-3 md:hidden">
            <button
              className="flex items-center space-x-1 hover:text-blue-500 focus:outline-none"
              onClick={() => navigate("/cart")}
              aria-label="View cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {cartCount > 0 && (
                <span className="ml-1 bg-blue-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="ml-2 p-2 rounded focus:outline-none hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="h-7 w-7 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className="w-full md:flex-1 md:mx-8 max-w-full md:max-w-3xl order-3 md:order-none mt-2 md:mt-0 relative"
        >
          <form onSubmit={handleSearch} className="flex w-full shadow-sm">
            <span className="inline-flex items-center px-3 bg-white border border-r-0 border-gray-300 rounded-l-md">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => {
                if (searchQuery.trim() || recentSearches.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Search products, brands and categories"
              className="w-full px-4 py-2 md:py-3 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="px-4 md:px-6 py-2 md:py-2 bg-blue-400 text-white font-semibold rounded-r-md shadow hover:bg-orange-600 transition-colors duration-200 focus:outline-none"
              aria-label="Submit search"
            >
              Search
            </button>
          </form>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Recent Searches
                  </h4>
                  <div className="space-y-1">
                    {recentSearches.slice(0, 3).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Suggestions */}
              {searchQuery.trim() && filteredSuggestions.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Suggestions
                  </h4>
                  <div className="space-y-1">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              {!searchQuery.trim() && (
                <div className="p-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.slice(0, 6).map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(term)}
                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions (desktop) */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 text-base">
          {/* Account */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 hover:text-blue-500 focus:outline-none"
              onClick={() => {
                setIsAccountOpen((v) => !v);
                setIsHelpOpen(false);
              }}
              aria-expanded={isAccountOpen}
              aria-label={
                user?.username ? `Account for ${user.username}` : "Account"
              }
            >
              {user ? (
                <UserRoundCheck />
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
              <span>{user?.username || "Account"}</span>
              <svg
                className="h-4 w-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                {user ? (
                  <>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="/cart"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </a>
                    <button
                      onClick={() => auth.signOut()}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/signIn"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </a>
                    <a
                      href="/signUp"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Help */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 hover:text-blue-500 focus:outline-none"
              onClick={() => {
                setIsHelpOpen((v) => !v);
                setIsAccountOpen(false);
              }}
              aria-expanded={isHelpOpen}
              aria-label="Help"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="#fff"
                />
                <path
                  d="M12 16h.01M12 8a4 4 0 00-2 7.465"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Help</span>
              <svg
                className="h-4 w-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isHelpOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                <a
                  href="/customer-care"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Customer Care
                </a>
                <a
                  href="/faqs"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  FAQs
                </a>
                <a
                  href="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Contact Us
                </a>
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            className="flex items-center space-x-1 hover:text-blue-500 focus:outline-none"
            onClick={() => navigate("/cart")}
            aria-label={`View cart with ${cartCount} items`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-blue-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Actions (mobile) */}
        {isMobileMenuOpen && (
          <div className="w-full flex flex-col items-start space-y-2 mt-2 md:hidden bg-white rounded shadow-lg p-4 z-50">
            <button
              className="flex items-center space-x-2 w-full hover:text-blue-500"
              onClick={() => setIsAccountOpen((v) => !v)}
              aria-expanded={isAccountOpen}
              aria-label={
                user?.username ? `Account for ${user.username}` : "Account"
              }
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{user?.username || "Account"}</span>
            </button>
            {isAccountOpen && (
              <div className="w-full bg-gray-50 rounded shadow-inner py-2">
                {user ? (
                  <>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </a>
                    <button
                      onClick={() => auth.signOut()}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/signIn"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </a>
                    <a
                      href="/signUp"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            )}
            <button
              className="flex items-center space-x-2 w-full hover:text-blue-500"
              onClick={() => setIsHelpOpen((v) => !v)}
              aria-expanded={isHelpOpen}
              aria-label="Help"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="#fff"
                />
                <path
                  d="M12 16h.01M12 8a4 4 0 00-2 7.465"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Help</span>
            </button>
            {isHelpOpen && (
              <div className="w-full bg-gray-50 rounded shadow-inner py-2">
                <a
                  href="/customer-care"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Customer Care
                </a>
                <a
                  href="/faqs"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  FAQs
                </a>
                <a
                  href="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Contact Us
                </a>
              </div>
            )}

            {/* Categories Section */}
            <div className="w-full border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center space-x-2 mb-3">
                <Grid className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Categories
                </h3>
                {loadingCategories && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                )}
              </div>

              {!loadingCategories && categories.length > 0 && (
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {/* All Products */}
                  <button
                    onClick={() => {
                      navigate("/eletronics");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">🏪</span>
                      <span>All Products</span>
                    </div>
                  </button>

                  {/* Category List */}
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <span className="text-base">
                        {getCategoryIcon(category)}
                      </span>
                      <span className="flex-1">
                        {formatCategoryName(category)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {!loadingCategories && categories.length === 0 && (
                <p className="text-gray-500 text-sm">No categories available</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Subheader with Categories */}
      <Subheader />
    </header>
  );
};

export default Header;
