import React, { useState, useEffect, useRef } from "react";
import { Star, Eye, ShoppingCart, Clock } from "lucide-react";
import { IoMale } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Fashion() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);

    const fetchFashion = async () => {
      try {
        // Fetch motorcycle products
        const FashionResponse = await fetch(
          "https://dummyjson.com/products/category/mens-shirts"
        );
        const beautyResponse = await fetch(
          "https://dummyjson.com/products/category/mens-shoes"
        );
        const beautyData = await beautyResponse.json();
        const FashionData = await FashionResponse.json();

        const FashionProducts = [
          ...(FashionData.products || []),
          ...(beautyData.products || []),
        ];
        // If no automotive products found, fetch some general products as fallback
        if (FashionProducts.length === 0) {
          const generalResponse = await fetch(
            "https://dummyjson.com/products?limit=8"
          );
          const generalData = await generalResponse.json();
          setProducts(generalData.products || []);
        } else {
          setProducts(FashionProducts);
        }
        if (FashionProducts.length === 0) {
          const generalResponse = await fetch(
            "https://dummyjson.com/products?limit=8"
          );
          const generalData = await generalResponse.json();
          setProducts(generalData.products || []);
        } else {
          setProducts(FashionProducts);
        }
      } catch (error) {
        console.error("Error loading skincare products:", error);
        setProducts([]);
        setError(error.message);
      }
    };
    fetchFashion();
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
  if (products.length === 0 && !error) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-lg text-gray-600">
          No male fashion products found
        </div>
      </div>
    );
  }

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };
  return (
    <div className="relative w-full  py-4 sm:py-6 font-montserrat">
     
    </div>
  );
}

export default Fashion;
