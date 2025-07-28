import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { getPosts } from '../Utils/api';

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
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
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
            <div className="text-center text-gray-700 dark:text-gray-200">
              Loading products...
            </div>
          ) : error ? (
            <div className="text-center text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow duration-600 flex flex-col overflow-hidden"
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
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                        ${item.price}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500 font-semibold text-sm">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 25">
                          <path d="M12 .587l3.668 7.568 8.332 1.208-6.001 5.854 1.416 8.293L12 18.896l-7.415 3.894 1.416-8.293-6.001-5.854 8.332-1.208z" />
                        </svg>
                        {item.rating?.rate || '4.5'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
