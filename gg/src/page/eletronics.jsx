import React from 'react'
import backgroundImage from "../assets/pic3.jpg";
import Layout from '../result'

function Eletronics() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* First column - Product Slide */}
        <div className="lg:col-span-3 ">
            <div className='min-h-[300px] flex justify-center items-center rounded-xl font-montserrat font-bold '
                style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
            >
                <h1 className='text-4xl text-white'>Electronics</h1></div>
           </div>
      </div>
    </Layout>
  )
}

export default Eletronics
