import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../context/Productcontext'

import { Link } from 'react-router-dom'

const Product = () => {
  const { allProducts, categories, isLoading, error } = useContext(ProductContext)

  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('none')
  const [showSidebar, setShowSidebar] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    let updated = [...allProducts]

    if (selectedCategory !== 'all') {
      updated = updated.filter(p => p.category === selectedCategory)
    }

    if (searchTerm.trim() !== '') {
      updated = updated.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (selectedSort === 'lowToHigh') {
      updated.sort((a, b) => a.price - b.price)
    } else if (selectedSort === 'highToLow') {
      updated.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(updated)
    setCurrentPage(1)
  }, [selectedCategory, selectedSort, searchTerm, allProducts])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
   <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Product Catalog</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Overlay for mobile */}
                    {showSidebar && (
                        <div
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setShowSidebar(false)}
                        />
                    )}

                        {/* Sidebar */}
                    <aside
                            className={`fixed md:static z-50 md:z-auto top-0 left-0 h-full md:h-fit w-64 bg-white border-r p-6 shadow-lg md:shadow-none transition-transform duration-300 ease-in-out ${
                            showSidebar ? 'translate-x-0' : '-translate-x-full'
                            } md:translate-x-0`}
                    >
                            {/* Close button on mobile */}
                        <div className="flex justify-between items-center mb-6 md:hidden">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={() => setShowSidebar(false)} className="text-2xl font-bold">
                            &times;
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold mb-1">Category</label>
                                <select
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                                >
                                <option value="all">All</option>
                                {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                                ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Sort by</label>
                                <select
                                value={selectedSort}
                                onChange={e => setSelectedSort(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                                >
                                <option value="none">None</option>
                                <option value="lowToHigh">Price: Low to High</option>
                                <option value="highToLow">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </aside>

                     {/* Products grid */}
                        <main className="flex-1">
                            <div className="mb-4 flex justify-end md:hidden">
                                <button
                                    onClick={() => setShowSidebar(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Open Filters
                                </button>
                            </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {currentItems.map(product => (
                            <Link
                                key={product.id}
                                    to={`/productdetail/${product.id}`}
                                    className="border rounded-lg p-4 shadow hover:shadow-md transition block"
                                >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-48 object-contain mb-3"
                                />
                                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                                <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">
                                ⭐ {product.rating.rate} ({product.rating.count} reviews)
                                </p>
                            </Link>
                            ))}
                        </div>

                    {/* Pagination */}
                        <div className="mt-8 flex justify-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`px-4 py-2 border rounded ${
                                currentPage === idx + 1 ? 'bg-blue-600 text-white' : ''
                                }`}
                            >
                                    {idx + 1}
                            </button>
                        ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        </main>
            </div>
    </div>

  )
}

export default Product

