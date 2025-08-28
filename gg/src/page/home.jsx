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
      <div className="  rounded-b-2xl">
       
             
          <div className="space-y-4">
            <KemetAd />
            <Products/>
            <TopSales />
            <Fashion />
            <Phone />
            <FemaleFash />
            <Skincare />
            <Slideproducts />
          </div>
          </div>
    </Layout>
  );
}

export default Home;
