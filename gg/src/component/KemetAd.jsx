import React from "react";

import { ProductSlide } from "./productslide";
import Mwatch from "../Api";

function KemetAd() {
  return (
    <main className=" bg-background">
      <div className="">
        <div className="grid grid-cols-1  min-h-[130px] lg:grid-cols-3 gap-3">
          {/* First column - Product Slide */}
          <div className="lg:col-span-2 h-full">
            <ProductSlide />
          </div>
          <div className="lg:col-span-1 h-full flex items-stretch">
            <div className="hidden lg:block xl:w-full ">
              <Mwatch />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default KemetAd;
