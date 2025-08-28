import backgroundImage from "../assets/pic3.jpg";
import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";

export function ProductSlide() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    if (products.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 3000); // Auto-advance every 3 seconds

    return () => clearInterval(interval);
  }, [products.length, isPaused]);

  if (products.length === 0) {
    return (
      <div
        className="relative rounded-xl p-8 min-h-[420px] flex flex-col justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col-reverse md:grid grid-cols-2 gap-8 items-center h-full">
            <div className="space-y-6 text-center md:text-left flex flex-col justify-center">
              <Skeleton className="h-12 w-3/4 mx-auto md:mx-0" />
              <Skeleton className="h-6 w-full mx-auto md:mx-0" />
              <Skeleton className="h-8 w-1/3 mx-auto md:mx-0" />
              <Skeleton className="h-12 w-32 rounded-full mx-auto md:mx-0" />
            </div>
            <div className="relative flex justify-center md:justify-end">
              <Skeleton className="w-64 h-64 md:w-80 md:h-80 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div
      className="relative  md:rounded-xl p-8 min-h-[420px] flex flex-col justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col-reverse md:grid grid-cols-2 gap-8 items-center h-full">
          {/* Left side - Product info */}
          <div className="space-y-6  text-center md:text-left flex flex-col justify-center">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white leading-tight tracking-tight">
              {currentProduct.title}
            </h1>
            <p className="text-base font-verdana text-gray-200 leading-relaxed">
              {currentProduct.description}
            </p>
            <div className="text-3xl font-Roboto font-bold text-[#87CEEB]">
              ${currentProduct.price}
            </div>
            <button
              className="bg-white text-black w-0 hover:bg-gray-100 text-base px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-fit mx-auto md:mx-0"
              onClick={() =>
                console.log(`Shopping for ${currentProduct.title}`)
              }
            >
              Shop Now
            </button>
          </div>

          {/* Right side - Product image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="aspect-square w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden ">
              <img
                src={currentProduct.thumbnail || "/placeholder.svg"}
                alt={currentProduct.title}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>

        {/* Slide indicators - centered and properly aligned */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {products.slice(0, 3).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentIndex
                  ? "bg-blue-300 shadow-lg"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
