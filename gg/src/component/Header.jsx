"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const categories = [
  {
    name: "Electronics",
    links: "/eletronics",
  },
  { name: "Fashion", links: "/Fashion" },
  { name: "Home", links: "/eletronics" },
  { name: "Beauty", links: "/eletronics" },
  { name: "Sports", links: "/eletronics" },
  { name: "Phones", links: "/eletronics" },
  { name: "Groceries", links: "/eletronics" },
  { name: "Appliances", links: "/eletronics" },
  { name: "Gaming", links: "/eletronics" },
  { name: "More", links: "/eletronics" },
];

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

const Header = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

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

    const suggestions = [];
    const lowerQuery = query.toLowerCase();

    // Add popular searches that match
    popularSearches.forEach((term) => {
      if (
        term.toLowerCase().includes(lowerQuery) &&
        !suggestions.includes(term)
      ) {
        suggestions.push(term);
      }
    });

    // Add category-based suggestions
    Object.entries(searchSuggestions).forEach(([category, terms]) => {
      terms.forEach((term) => {
        if (
          term.toLowerCase().includes(lowerQuery) &&
          !suggestions.includes(term)
        ) {
          suggestions.push(term);
        }
      });
    });

    // Add recent searches that match
    recentSearches.forEach((term) => {
      if (
        term.toLowerCase().includes(lowerQuery) &&
        !suggestions.includes(term)
      ) {
        suggestions.push(term);
      }
    });

    return suggestions.slice(0, 8);
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

  return (
    <header className="bg-white shadow-sm z-50">
      {/* Top bar */}
      <div className="w-full bg-gray-100 text-xs text-gray-700 flex flex-col md:flex-row justify-between items-center px-2 md:px-4 py-2 space-y-1 md:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-orange-500">
            <svg
              className="inline h-4 w-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
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
                d="M12 6v6l4 2"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <a href="#" className="hover:underline text-orange-500 font-medium">
            Sell on Travelstore
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-gray-400 font-semibold">
          <span className="flex items-center space-x-1">
            <a className="text-gray-700 font-bold" href="/home">
              Travelstore
            </a>
            <svg
              className="inline h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#f59e0b"
                strokeWidth="2"
                fill="#fff"
              />
              <path
                d="M12 6v6l4 2"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="">PAY</span>
          <span className="">DELIVERY</span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 md:py-4 flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 w-full md:w-auto justify-between">
          <span className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <a href="/home">
              Travel
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 leading-none tracking-tight">
                Store
              </span>
            </a>
            <svg
              className="ml-1 h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#f59e0b"
                strokeWidth="2"
                fill="#fff"
              />
              <path
                d="M12 6v6l4 2"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden ml-2 p-2 rounded focus:outline-none hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <svg
              className="h-7 w-7 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className="w-full md:flex-1 md:mx-8 max-w-full md:max-w-2xl order-3 md:order-none mt-2 md:mt-0 relative"
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
            />
            <button
              type="submit"
              className="px-4 md:px-6 py-2 md:py-2 bg-blue-400 text-white font-semibold rounded-r-md shadow hover:bg-orange-600 transition-colors duration-200 focus:outline-none"
            >
              Search
            </button>
          </form>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {/* Recent Searches */}
              {recentSearches.length > 0 && !searchQuery.trim() && (
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
              <span>Account</span>
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
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Register
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </a>
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
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Customer Care
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  FAQs
                </a>
                <a
                  href="#"
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
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-shopping-cart-icon lucide-shopping-cart"
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
              <span>Account</span>
            </button>
            {isAccountOpen && (
              <div className="w-full bg-gray-50 rounded shadow-inner py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Register
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </a>
              </div>
            )}
            <button
              className="flex items-center space-x-2 w-full hover:text-blue-500"
              onClick={() => setIsHelpOpen((v) => !v)}
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
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Customer Care
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  FAQs
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Contact Us
                </a>
              </div>
            )}
            <button
              className="flex items-center space-x-2 w-full hover:text-blue-500"
              onClick={() => navigate("/cart")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-shopping-cart-icon lucide-shopping-cart"
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
        )}
      </div>

      {/* Categories Bar */}
      <nav className="w-full bg-white border-t border-b border-gray-200 py-2 overflow-x-auto scrollbar-hide">
        <ul className="flex items-center gap-6 px-4 whitespace-nowrap">
          {categories.map((cat) => (
            <li key={cat}>
              <a
                href={cat.links}
                className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 md:px-3 py-1 rounded hover:bg-blue-50"
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
