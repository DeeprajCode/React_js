import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from '../Utils/api';
import { CircleDollarSign } from 'lucide-react';

const Products = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    getPosts()
      .then(posts => {
        setData(posts);
        setFilteredData(posts);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to load products.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = data;

    if (search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(item => item.price >= min && item.price <= max);
    }

    setFilteredData(filtered);
  }, [search, category, priceRange, data]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <main className="p-6 sm:p-8 overflow-y-auto">

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm"
            />
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

          {/* Product List */}
          {loading ? (
            <div class="flex-col gap-4 w-full flex items-center justify-center">
              <div
                class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
              >
                <div
                  class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredData.map((item) => {
                const discount = (item.price * 0.1).toFixed(2);
                const finalPrice = (item.price - discount).toFixed(2);

                return (
                  <div
                    key={item.id}
                    className="hover:shadow-lg hover:shadow-indigo-600/60 transition-shadow duration-500 hover:scale-105 bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col overflow-hidden"
                  >
                    <Link to={`/products/${item.id}`}>
                      <div className="aspect-w-10 aspect-h-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-56 w-full object-contain bg-white"
                        />
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Category: {item.category}
                      </p>
                      <div className="mt-auto">
                        <p className="flex gap-1 text-lg font-semibold text-gray-800 dark:text-white line-through">
                          <CircleDollarSign/>{item.price}
                        </p>
                        <p className=" text-sm font-semibold text-green-600 flex gap-1">
                          Discount : <CircleDollarSign/>{finalPrice} (10% off)
                        </p>
                        <p className="text-md bg-yellow-100 my-2 pl-1 mr-2 font-medium text-yellow-500 text-yellow-800 w-15 w-28 ">
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
