import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from '../Utils/api'; // Import API call function to fetch product data
import { CircleDollarSign } from 'lucide-react'; // Icon for price display

const Products = () => {
  // State declarations for storing product data and filters
  const [data, setData] = useState([]); // Original product data from API
  const [filteredData, setFilteredData] = useState([]); // Data after applying filters
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Filter state
  const [search, setSearch] = useState(''); // Search by name
  const [category, setCategory] = useState(''); // Filter by category
  const [priceRange, setPriceRange] = useState(''); // Filter by price range

  // Fetch product data when component mounts
  useEffect(() => {
    getPosts()
      .then(posts => {
        setData(posts); // Store original data
        setFilteredData(posts); // Initially, filteredData is the same as full data
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to load products.'); // Set error message if fetch fails
      })
      .finally(() => setLoading(false)); // Always stop loading state regardless of success or failure
  }, []);

  // Apply filters when search/category/priceRange/data changes
  useEffect(() => {
    let filtered = data;

    // Filter by search text
    if (search) {
      filtered = filtered.filter(item =>
        ((item.name ?? item.title) || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by selected category
    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    // Filter by selected price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(item => item.price >= min && item.price <= max);
    }

    setFilteredData(filtered); // Update filtered product list
  }, [search, category, priceRange, data]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <main className="p-6 sm:p-8 overflow-y-auto">

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm"
            />

            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm"
            >
              <option value="">All Categories</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
            </select>

            {/* Price Range Dropdown */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm"
            >
              <option value="">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
            </select>

            {/* Reset Filters Button */}
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
                setPriceRange('');
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
            >
              Reset Filters
            </button>
          </div>

          {/* Content Area: Show loading, error, or product list */}
          {loading ? (
            // Loading Spinner
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            // Show error message if data fails to load
            <div className="text-center text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : (
            // Display product cards
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredData.map((item) => {
                const discount = (item.price * 0.1).toFixed(2); // Calculate 10% discount
                const finalPrice = (item.price - discount).toFixed(2); // Final price after discount

                return (
                  <div
                    key={item.id}
                    className="hover:shadow-lg hover:shadow-indigo-600/60 transition-shadow duration-500 hover:scale-105 bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col overflow-hidden"
                  >
                    {/* Clickable image linking to product detail page */}
                    <Link to={`/products/${item.id}`}>
                      <div className="aspect-w-10 aspect-h-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-56 w-full object-contain bg-white"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Category: {item.category}
                      </p>

                      <div className="mt-auto">
                        {/* Original price (strikethrough) */}
                        <p className="flex gap-1 text-lg font-semibold text-gray-800 dark:text-white line-through">
                          <CircleDollarSign />{item.price}
                        </p>

                        {/* Discounted price */}
                        <p className="text-sm font-semibold text-green-600 flex gap-1">
                          Discount: <CircleDollarSign />{finalPrice} (10% off)
                        </p>

                        {/* Rating */}
                        <p className="text-md bg-yellow-100 my-2 pl-1 mr-2 font-medium text-yellow-500 text-yellow-800 w-15 w-28">
                          Rating: ⭐ {item.rating?.rate ?? 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
