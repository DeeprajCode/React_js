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
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                            Loading...
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
                      <div className="flex items-center gap-1 text-yellow-600 bg-yello-font-semibold text-sm">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 25">
                          <path d="M12 .587l3.668 7.568 8.332 1.208-6.001 5.854 1.416 8.293L12 18.896l-7.415 3.894 1.416-8.293-6.001-5.854 8.332-1.208z" />
                        </svg>
                        {item.rating['rate']}
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



