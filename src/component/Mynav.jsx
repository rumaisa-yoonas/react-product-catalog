import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/istockphoto-1452858525-612x612.jpg"
const Mynav = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-8 py-3">
       
         <div className="flex items-center space-x-2">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-8 w-8 object-contain" 
          />
          <span className="text-4xl font-bold">CatalogPro</span>
        </div>


        <div className="space-x-4 mr-30">
          <Link
            to="/product"
            className="text-gray-700 hover:text-blue-600 text-xl font-medium"
          >
            Catalog
          </Link>
       
        </div>
      </div>
    </nav>
  );
};

export default Mynav;
