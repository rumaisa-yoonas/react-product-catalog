import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Productdetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!product) return <div className="p-8">Product not found.</div>;

  return (
    <div className="container mx-auto p-8 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl border rounded-lg shadow-lg p-8  bg-white">

            <Link to="/product" className="text-blue-600 underline mb-4 inline-block">
                 ← Back to Products
            </Link>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                 {/* Image column */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img
                    src={product.image}
                    alt={product.title}
                    className="w-60 h-60 object-contain md:w-90 md:h-90"
                    />
                </div>

                    {/* Text content column */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-bold text-blue-600 mb-2">${product.price}</p>
                    <p className="text-sm text-gray-600">
                    ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
                    </p>
                </div>
            </div>
        </div>
    </div>
    

  );
};

export default Productdetail;
