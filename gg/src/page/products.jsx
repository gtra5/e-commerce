import React from "react";
import img1 from "../assets/nischal-kanishk-iuAGCwoY2YA-unsplash (1).jpg";
import img2 from "../assets/angela-bailey-tuJtzghMuEw-unsplash.jpg";
import img3 from "../assets/kelly-sikkema-xp-ND7NjWaA-unsplash.jpg";
import img4 from "../assets/katsia-jazwinska-d9pMephsLKs-unsplash.jpg";
import img5 from "../assets/kin-shing-lai-999xEzwi7oA-unsplash.jpg";
import img6 from "../assets/daniel-norris-ZN_86cZrSN0-unsplash.jpg";
import img7 from "../assets/charlies-x-kZWXHwOd4-k-unsplash.jpg";
import img8 from "../assets/odd-fellow-HYnUI_TyFEY-unsplash.jpg";
import img9 from "../assets/engin-akyurt-J4Poo0r0qEk-unsplash.jpg";
import img10 from "../assets/claire-abdo-aWLTXw6kbDw-unsplash.jpg";
import img11 from "../assets/wander-fleur-fSN3Q_imqrA-unsplash.jpg";
import img12 from "../assets/tamara-bellis-mNZ-GvOQUUY-unsplash.jpg";
import img13 from "../assets/pexels-craytive-1456706.jpg";
import img14 from "../assets/dress.jpg";
import img15 from "../assets/knits.jpg";
import img16 from "../assets/jacket.jpg";
import img17 from "../assets/jewelry.jpg";
import img18 from "../assets/pot.jpg";
import img19 from "../assets/tomato.jpg";
import img20 from "../assets/decor.jpg";
import img21 from "../assets/pillow.jpg";
import img22 from "../assets/dinning.jpg";
import img23 from "../assets/home2.jpg";
import img24 from "../assets/kitchen.jpg";
import img25 from "../assets/skincare.jpg";
import img26 from "../assets/basket.jpg";
import img27 from "../assets/hadwares.jpg";
import img28 from "../assets/funitures.jpg";
import img29 from "../assets/walpaper.jpg";

function Products() {
  return (
    <div className="hidden md:grid bg-[#F5F7F8] rounded-none font-montserrat w-full min-h-screen  shadow-md px-4 py-4 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:rounded-2xl">
      <div className="bg-white shadow-md p-4 rounded-xl flex flex-col h-full">
        <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-3">
          Get your games here
        </h2>
        <img
          src={img1}
          alt=""
          className="w-full h-fit-content object-cover rounded-lg mb-3"
        />
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 mt-auto"
        >
          Shop now
        </a>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
        <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-3">
          Acquire home necessities
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3 flex-grow">
          <div className="flex flex-col">
            <img
              src={img2}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Home Decor</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img3}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Cleaning Tools</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img4}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Home Storage</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img5}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Beddings</p>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 mt-auto"
        >
          Discover more in Home
        </a>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
        <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-3">
          Household kitchen equipment
        </h2>
        <div className="mb-3">
          <img
            src={img6}
            alt=""
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <p className="text-sm text-gray-600">Blender</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3 flex-grow">
          <div className="flex flex-col">
            <img
              src={img7}
              alt=""
              className="w-full h-20 object-cover rounded-lg mb-1"
            />
            <p className="text-xs text-gray-600">Coffee</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img8}
              alt=""
              className="w-full h-20 object-cover rounded-lg mb-1"
            />
            <p className="text-xs text-gray-600">Pots</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img9}
              alt=""
              className="w-full h-20 object-cover rounded-lg mb-1"
            />
            <p className="text-xs text-gray-600">Kettle</p>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 mt-auto"
        >
          Discover more in Home
        </a>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
        <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-3">
          Affordable Fashion Finds
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3 flex-grow">
          <div className="flex flex-col">
            <img
              src={img10}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Jeans under $50</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img11}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Tops under $50</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img12}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Dress under $50</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img13}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Shoes under $50</p>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 mt-auto"
        >
          See all deals
        </a>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
        <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-3">
          Fast fashion with sustainable choices
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3 flex-grow">
          <div className="flex flex-col">
            <img
              src={img14}
              alt="Dresses"
              className="w-full h-24 object-cover rounded-lg mb-1 bg-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="w-full h-24 bg-gray-200 rounded-lg mb-1 flex items-center justify-center text-xs text-gray-500"
              style={{ display: "none" }}
            >
              Image not available
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Dresses</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img15}
              alt="Knits"
              className="w-full h-24 object-cover rounded-lg mb-1 bg-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="w-full h-24 bg-gray-200 rounded-lg mb-1 flex items-center justify-center text-xs text-gray-500"
              style={{ display: "none" }}
            >
              Image not available
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Knits</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img16}
              alt="Jackets"
              className="w-full h-24 object-cover rounded-lg mb-1 bg-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="w-full h-24 bg-gray-200 rounded-lg mb-1 flex items-center justify-center text-xs text-gray-500"
              style={{ display: "none" }}
            >
              Image not available
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Jackets</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img17}
              alt="Jewelry"
              className="w-full h-24 object-cover rounded-lg mb-1 bg-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="w-full h-24 bg-gray-200 rounded-lg mb-1 flex items-center justify-center text-xs text-gray-500"
              style={{ display: "none" }}
            >
              Image not available
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Jewelry</p>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 mt-auto"
        >
          See all deals
        </a>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
        <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-3">
          Affordable Home Freshness
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3 flex-grow">
          <div className="flex flex-col">
            <img
              src={img18}
              alt="Kitchen & dining"
              className="w-full h-24 object-cover rounded-lg mb-1 bg-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="w-full h-24 bg-gray-200 rounded-lg mb-1 flex items-center justify-center text-xs text-gray-500"
              style={{ display: "none" }}
            >
              Image not available
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Kitchen & dining</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img19}
              alt="Home Improvement"
              className="w-full h-24 object-cover rounded-lg mb-1 bg-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="w-full h-24 bg-gray-200 rounded-lg mb-1 flex items-center justify-center text-xs text-gray-500"
              style={{ display: "none" }}
            >
              Image not available
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Home Improvement</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img20}
              alt="Décor"
              className="w-full h-24 object-cover rounded-lg mb-1 bg-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="w-full h-24 bg-gray-200 rounded-lg mb-1 flex items-center justify-center text-xs text-gray-500"
              style={{ display: "none" }}
            >
              Image not available
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Décor</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img21}
              alt="Bedding & Bath"
              className="w-full h-24 object-cover rounded-lg mb-1 bg-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="w-full h-24 bg-gray-200 rounded-lg mb-1 flex items-center justify-center text-xs text-gray-500"
              style={{ display: "none" }}
            >
              Image not available
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Bedding & Bath</p>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 mt-auto"
        >
          Shop the latest from Home
        </a>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
        <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-3">
          Renew your home
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3 flex-grow">
          <div className="flex flex-col">
            <img
              src={img22}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Dinning</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img23}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Home</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img24}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Kitchen</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img25}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Skincare</p>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 mt-auto"
        >
          See all deals
        </a>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
        <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-3">
          Quick refreshes for upscale areas
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3 flex-grow">
          <div className="flex flex-col">
            <img
              src={img28}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Accent furniture</p>
          </div>

          <div className="flex flex-col">
            <img
              src={img27}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Hardware</p>
          </div>
          <div className="flex flex-col">
            <img
              src={img26}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">Basket & hampers</p>
          </div>

          <div className="flex flex-col">
            <img
              src={img29}
              alt=""
              className="w-full h-24 object-cover rounded-lg mb-1"
            />
            <p className="text-xs sm:text-sm text-gray-600">
              Wallpaper & Paint
            </p>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 mt-auto"
        >
          See all deals
        </a>
      </div>
    </div>
  );
}

export default Products;
