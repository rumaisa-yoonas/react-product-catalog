import React from "react";
import bgImage from "../assets/background.jpg"; 

const Home = () => {
  return (
    <div
      className="relative w-full h-[300px] md:h-[800px] bg-cover bg-center flex items-center "
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 ">  

      </div>
        <h1 className="relative text-yellow-900 text-3xl md:text-5xl font-bold text-center ms-8 mb-50 ">
            Welcome to Our <span className="block pt-8 italic">Product Catalog</span>
        </h1>
      


    </div>
  );
};

export default Home;
