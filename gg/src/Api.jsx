import React, { useState, useEffect } from "react";
import axios from "axios";

const Mwatch = () => {
  const [watch, setWatch] = useState(null);
  const [error, setError] = useState(null);

  // The correct API URL for men's watches category
  const API_URL = "https://dummyjson.com/products/category/mens-watches";

  useEffect(() => {
    const fetchMensWatch = async () => {
      try {
        // Fetch the list of men's watches directly
        const response = await axios.get(API_URL);

        // Check if products array exists and is not empty
        if (response.data.products && response.data.products.length > 0) {
          // Set the first product from the list as the selected watch
          setWatch(response.data.products[0]);
        } else {
          setError("No men's watches found in the category.");
        }

        setError(null);
      } catch (err) {
        setError("Failed to fetch watch data. Please try again later.");
        console.error("Error fetching watch:", err);
      }
    };

    fetchMensWatch();
  }, []);

  if (!watch && !error) {
    return (
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-sm min-h-[420px] md:min-h-[420px] lg:min-h-[420px] xl:min-h-[420px] 2xl:min-h-[420px] flex flex-col justify-center p-4 h-full">
        return null;
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          {error}
        </div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">No men's watch found</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-sm min-h-[420px] md:min-h-[420px] lg:min-h-[420px] xl:min-h-[420px] 2xl:min-h-[420px] flex flex-col justify-center p-4 h-full">
      <h2 className="text-2xl font-semibold font-montserrat text-[#F5F5F5]">
        Explore Jewellery and accessories
      </h2>
      <div className="w-full flex-1 flex items-center justify-center">
        <img
          className="w-full h-auto max-h-75 object-contain"
          src={watch.images?.[0] || "https://via.placeholder.com/600"}
          alt={watch.title}
        />
      </div>
      <div className="flex flex-row justify-between">
        <button className="bg-black text-white hover:bg-gray-100 text-base px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-fit mx-auto md:mx-0">
          Shop Now
        </button>
        <div className="text-2xl  font-Roboto font-bold text-[#F5F5F5]">
          ${watch.price}
        </div>
      </div>
    </div>
  );
};

export default Mwatch;
