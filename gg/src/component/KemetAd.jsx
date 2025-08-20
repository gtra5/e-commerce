import React from "react";
import img1 from "../assets/ChatGPT Image Aug 14, 2025, 11_53_16 PM.png";

function KemetAd() {
  return (
    <div className="relative w-full rounded-none min-h-[300px] md:min-h-[400px]  lg:min-h-[200px] bg-gradient-to-br from-gray-900  via-gray-800 to-gray-900 overflow-hidden lg:rounded-2xl">
     

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 h-full">
        <div className="flex flex-col-reverse md:grid grid-cols-2 gap-8 lg:gap-12 items-center h-full min-h-[400px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            {/* Brand/Slogan */}
           

            {/* Main Title - KEMET */}
            <div className="relative">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 leading-none tracking-tight">
                <span className="text-white">Travel</span>Store
              </h1>
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-white to-transparent"></div>
            </div>

            {/* Descriptive Text */}
            <div className="max-w-md lg:max-w-lg">
              <p className="text-white/90 text-base md:text-lg lg:text-xl  leading-relaxed">
                Where elegance meets convenience. Curated collections, delivered
                to your door
              </p>
            </div>

            {/* Call to Action Button */}
            <div className="pt-4">
              <button className="group relative bg-gradient-to-r from-blue-700 to-blue-500 text-white px-8 py-4 md:px-10 md:py-5 text-sm md:text-base font-bold uppercase tracking-wider rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center lg:justify-end items-center">
            <div className="relative">
              {/* Image Container with decorative border */}
              <div className="relative p-4  bg-gradient-to-br from-blue-600/20 to-blue-500/20 backdrop-blur-sm border border-orange-500/30">
                <img
                  src={img1}
                  alt="Ancient Egyptian pyramids and sphinx representing KEMET civilization"
                  className="w-full max-w-sm md:max-w-md lg:max-w-sm h-auto rounded-xl shadow-2xl"
                />
                {/* Decorative corner elements */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-white"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-white"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-white"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-white"></div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -z-10 top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-xl"></div>
              <div className="absolute -z-10 bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-amber-500/30 to-transparent rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KemetAd;
