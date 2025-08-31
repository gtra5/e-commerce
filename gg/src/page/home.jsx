import Layout from "../result";
import Products from "./products";
import Slideproducts from "../component/slideproducts";
import TopSales from "../component/topSales";
import Phone from "../component/phone";
import Skincare from "../component/skin-care";

import KemetAd from "../component/KemetAd";
import Fashion from "../component/fashion";
import FemaleFash from "../component/femalefash";

function Home() {
 

  return (
    <Layout>
      <div className="">
      <div className="space-y-4  mb-5">
         <KemetAd />
            <Products/>
      </div>
             
          <div className=" bg-blue">
             <TopSales />
          </div>
      
            <Phone />
            <FemaleFash />
            <Skincare />
            <Slideproducts />
          </div>
    </Layout>
  );
}

export default Home;
