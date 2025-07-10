import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ]);

        setAllProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts, categories, error, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};
