"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Star,
  Search,
  Filter,
  ShoppingCart,
  Heart,
  RotateCcw,
  Grid,
  List,
  Compass as Compare,
  Zap,
  TrendingUp,
  Truck,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  AlertCircle,
  Menu,
} from "lucide-react";
import Layout from "../result";

const CATEGORIES_API = "https://dummyjson.com/products/categories";
const PRODUCTS_API = "https://dummyjson.com/products/category/";
const ALL_PRODUCTS_API = "https://dummyjson.com/products";

const ProductSkeleton = () => (
  <div className="bg-card rounded-xl p-6 animate-pulse">
    <div className="aspect-square bg-muted rounded-lg mb-4 shimmer"></div>
    <div className="h-4 bg-muted rounded mb-2 shimmer"></div>
    <div className="h-3 bg-muted rounded w-3/4 mb-2 shimmer"></div>
    <div className="h-4 bg-muted rounded w-1/2 shimmer"></div>
  </div>
);

const ComparisonModal = ({ products, onClose, onRemove }) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Product Comparison
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-card rounded-xl p-4 relative">
                <button
                  onClick={() => onRemove(product.id)}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform"
                >
                  <X className="w-3 h-3" />
                </button>

                <img
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-semibold text-primary">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    <span
                      className={
                        product.stock > 10
                          ? "text-green-600"
                          : "text-orange-600"
                      }
                    >
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="text-secondary font-semibold">
                      {product.discountPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) => {
  if (!product) return null;

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Quick View</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.title}
              className="w-full aspect-square object-cover rounded-xl"
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images?.slice(1, 5).map((img, idx) => (
                <img
                  key={idx}
                  src={img || "/placeholder.svg"}
                  alt=""
                  className="aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-secondary text-secondary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating})
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.price}
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <div className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-sm">
                  <Zap className="w-3 h-3" />
                  Save {product.discountPercentage}%
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-primary" />
              <span>Free shipping on orders over $50</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors ${
                  isInWishlist
                    ? "bg-destructive text-destructive-foreground border-destructive"
                    : "border-border hover:bg-muted"
                }`}
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Electronics() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Moved before useState
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get("category") || "all");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category") || "all";
    if (categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [location.search]);

  // Fetch categories on mount
  useEffect(() => {
    fetch(CATEGORIES_API)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch categories");
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingCategories(false);
      });
  }, []);

  // Fetch products when a category is selected
  useEffect(() => {
    if (!selectedCategory) return;

    setLoadingProducts(true);
    const apiUrl =
      selectedCategory === "all"
        ? ALL_PRODUCTS_API
        : `${PRODUCTS_API}${selectedCategory}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoadingProducts(false);
        generateRecommendations(data.products);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingProducts(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setLoadingProducts(true);
      fetch(ALL_PRODUCTS_API)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch products");
          return response.json();
        })
        .then((data) => {
          setProducts(data.products);
          setLoadingProducts(false);
          generateRecommendations(data.products);
        })
        .catch((err) => {
          setError(err.message);
          setLoadingProducts(false);
        });
    }
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesPrice && matchesRating;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            getDiscountedPrice(a.price, a.discountPercentage) -
            getDiscountedPrice(b.price, b.discountPercentage)
          );
        case "price-high":
          return (
            getDiscountedPrice(b.price, b.discountPercentage) -
            getDiscountedPrice(a.price, a.discountPercentage)
          );
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return b.discountPercentage - a.discountPercentage;
        case "popular":
          return b.rating * b.stock - a.rating * a.stock;
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, priceRange, sortBy, minRating]);

  const generateRecommendations = (productList) => {
    const topRated = productList
      .filter((p) => p.rating >= 4.0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    setRecommendations(topRated);
    setShowRecommendations(topRated.length > 0);
  };

  const addToCompare = (product, e) => {
    if (e) e.stopPropagation();
    if (compareList.length >= 3) {
      alert("You can compare up to 3 products at a time");
      return;
    }
    if (!compareList.find((p) => p.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareList(compareList.filter((p) => p.id !== productId));
  };

  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    setError(null);
    setSearchTerm("");
    setCompareList([]);
    setSidebarOpen(false);
    navigate(`/electronics?category=${encodeURIComponent(slug)}`);
  };

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (product, e) => {
    if (e) e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange({ min: 0, max: 10000 });
    setMinRating(0);
    setSortBy("name");
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-500 text-yellow-500"
            : "fill-muted text-muted"
        }`}
      />
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  if (loadingCategories) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-destructive text-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex gap-4 min-h-screen bg-background">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
          fixed lg:relative z-50 lg:z-auto
          w-80 lg:w-69 bg-white border-r border-[#e2e8f0]
          h-screen overflow-y-auto hide-scrollbar
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          lg:rounded-l-lg
        `}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h3 className="text-3xl font-semibold text-sidebar-foreground">
                Categories
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              {compareList.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-secondary/20">
                  <div className="flex items-center gap-2">
                    <Compare className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium text-sidebar-foreground">
                      Compare
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-semibold">
                      {compareList.length}
                    </span>
                    <button
                      onClick={() => setShowComparison(true)}
                      className="text-xs text-secondary hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-[#374151] mb-4 uppercase tracking-wide hidden lg:block">
              Categories
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleCategoryClick("all")}
                  className={`w-full text-left px-4 py-3 text-sidebar-foreground rounded-xl transition-all duration-200 ${
                    selectedCategory === "all"
                      ? "bg-blue-500 text-white font-semibold shadow-lg"
                      : "hover:bg-sidebar-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Products</span>
                    {selectedCategory === "all" && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <button
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`w-full text-left px-4 py-3 text-sidebar-foreground rounded-xl transition-all duration-200 ${
                      selectedCategory === category.slug
                        ? "bg-blue-500 text-white font-semibold shadow-lg"
                        : "hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize">{category.name}</span>
                      {selectedCategory === category.slug && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 bg-white h-screen overflow-y-auto hide-scrollbar lg:border-l-[#e2e8f0] lg:rounded-r-lg">
          <div className="p-4 lg:p-8">
            <div className="flex items-center gap-4 mb-6 lg:hidden">
              <h1 className="text-xl font-bold text-[#374151]">
                {selectedCategory === "all"
                  ? "All Products"
                  : categories.find((c) => c.slug === selectedCategory)?.name ||
                    selectedCategory}
              </h1>
            </div>

            {selectedCategory && (
              <>
                <div className="hidden lg:flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-[#374151] mb-2">
                      {selectedCategory === "all"
                        ? "All Products"
                        : categories.find((c) => c.slug === selectedCategory)
                            ?.name || selectedCategory}
                    </h1>
                    <p className="text-[#374151]">
                      {selectedCategory === "all"
                        ? "Discover all our premium products with advanced features and competitive prices"
                        : `Discover premium ${selectedCategory} with advanced features and competitive prices`}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      onClick={() =>
                        setViewMode(viewMode === "grid" ? "list" : "grid")
                      }
                      className="p-3 border border-[#e2e8f0] rounded-xl hover:bg-muted transition-colors"
                    >
                      {viewMode === "grid" ? (
                        <List className="w-4 h-4" />
                      ) : (
                        <Grid className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-4 py-3 border border-[#e2e8f0] rounded-xl hover:bg-muted transition-colors"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                      {showFilters ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
                  <div className="flex gap-2 lg:hidden">
                    <button
                      onClick={() =>
                        setViewMode(viewMode === "grid" ? "list" : "grid")
                      }
                      className="p-2 border border-[#e2e8f0] rounded-lg hover:bg-muted transition-colors"
                    >
                      {viewMode === "grid" ? (
                        <List className="w-4 h-4" />
                      ) : (
                        <Grid className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-3 py-2 border border-[#e2e8f0] rounded-lg hover:bg-muted transition-colors flex-1"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                      {showFilters ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 lg:py-4 bg-[#f8fafc] border border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#374151] placeholder:text-[#374151]"
                    />
                  </div>

                  {showFilters && (
                    <div className="bg-blue-100 border border-[#374151] p-4 lg:p-6 rounded-2xl space-y-4 lg:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#475569] mb-3">
                            Price Range
                          </label>
                          <div className="space-y-3">
                            <input
                              type="range"
                              min="0"
                              max="10000"
                              value={priceRange.max}
                              onChange={(e) =>
                                setPriceRange({
                                  ...priceRange,
                                  max: Number.parseInt(e.target.value),
                                })
                              }
                              className="w-full accent-primary"
                            />
                            <div className="text-sm text-[#475569]">
                              Up to {formatPrice(priceRange.max)}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#475569] mb-3">
                            Min Rating
                          </label>
                          <select
                            value={minRating}
                            onChange={(e) =>
                              setMinRating(Number.parseFloat(e.target.value))
                            }
                            className="w-full p-3 bg-[#f8fafc] border border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="0">Any Rating</option>
                            <option value="1">1+ Stars</option>
                            <option value="2">2+ Stars</option>
                            <option value="3">3+ Stars</option>
                            <option value="4">4+ Stars</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#475569] mb-3">
                            Sort By
                          </label>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full p-3 bg-[#f8fafc] border border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="name">Name A-Z</option>
                            <option value="price-low">
                              Price: Low to High
                            </option>
                            <option value="price-high">
                              Price: High to Low
                            </option>
                            <option value="rating">Highest Rated</option>
                            <option value="discount">Best Discount</option>
                            <option value="popular">Most Popular</option>
                          </select>
                        </div>

                        <div className="flex items-end">
                          <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-4 py-3 text-[#475569] hover:bg-[#f1f5f9] transition-colors rounded-lg w-full sm:w-auto"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Clear Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {filteredProducts.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-muted-foreground gap-2">
                      <span>
                        Showing {filteredProducts.length} of {products.length}{" "}
                        products
                      </span>
                      {compareList.length > 0 && (
                        <button
                          onClick={() => setShowComparison(true)}
                          className="flex items-center gap-2 text-[#f59e0b] hover:underline"
                        >
                          <Compare className="w-4 h-4" />
                          Compare {compareList.length} products
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {showRecommendations && recommendations.length > 0 && (
                  <div className="mb-6 lg:mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
                      <h2 className="text-lg lg:text-xl font-semibold text-foreground">
                        Recommended for You
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                      {recommendations.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => navigate(`/details/${product.id}`)}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-xl flex flex-col font-montserrat hover:shadow-xl transition-shadow cursor-pointer p-3 lg:p-6"
                        >
                          <div className="relative overflow-hidden rounded-lg mb-3 lg:mb-4 aspect-square bg-gray-50">
                            <img
                              src={product.images?.[0] || "/placeholder.svg"}
                              alt={product.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {product.discountPercentage > 0 && (
                              <div className="absolute top-1 lg:top-2 left-1 lg:left-2 bg-red-500 text-white text-xs font-bold px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full">
                                -{Math.round(product.discountPercentage)}%
                              </div>
                            )}
                          </div>
                          <h2 className="text-xs lg:text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                            {product.title}
                          </h2>
                          <div className="hidden sm:flex items-center gap-1 mb-2">
                            {renderStars(product.rating)}
                            <span className="text-xs text-gray-500">
                              ({product.rating})
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            Only {product.stock} left in stock
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {loadingProducts ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
                {Array.from({ length: 8 }, (_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : selectedCategory && filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => {
                  const discountedPrice = getDiscountedPrice(
                    product.price,
                    product.discountPercentage
                  );
                 

                  return (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/details/${product.id}`)}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-xl flex flex-col font-montserrat hover:shadow-xl transition-shadow cursor-pointer p-3 lg:p-6"
                    >
                      <div className="relative overflow-hidden rounded-lg mb-3 lg:mb-4 aspect-square bg-gray-50">
                        <img
                          src={product.images?.[0] || "/placeholder.svg"}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {product.discountPercentage > 0 && (
                          <div className="absolute top-1 lg:top-2 left-1 lg:left-2 bg-red-500 text-white text-xs font-bold px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full">
                            -{Math.round(product.discountPercentage)}%
                          </div>
                        )}
                      </div>
                      <h2 className="text-xs lg:text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.title}
                      </h2>
                      <div className="hidden sm:flex items-center gap-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500">
                          ({product.rating})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm lg:text-lg font-bold text-gray-900">
                          {formatPrice(discountedPrice)}
                        </span>
                        {product.discountPercentage > 0 && (
                          <span className="hidden sm:block text-xs text-gray-500 line-through">
                            {formatPrice(product.price)}
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
            ) : (
              <div className="text-center py-12 lg:py-16">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 lg:w-8 lg:h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-base lg:text-lg">
                  {selectedCategory
                    ? filteredProducts.length === 0 && products.length > 0
                      ? "No products match your current filters."
                      : "No products found for this category."
                    : "Select a category to discover amazing products."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {showComparison && (
        <ComparisonModal
          products={compareList}
          onClose={() => setShowComparison(false)}
          onRemove={removeFromCompare}
        />
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isInWishlist={wishlist.some(
            (item) => item.id === quickViewProduct.id
          )}
        />
      )}
    </Layout>
  );
}

export default Electronics;