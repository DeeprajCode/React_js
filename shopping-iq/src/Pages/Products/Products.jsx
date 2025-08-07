import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { products } from '/home/codezeros/React_js/shopping-iq/src/Utils/api.js';
import { CircleDollarSign } from 'lucide-react';
import { TbZoomReset } from "react-icons/tb";
import { FaStar } from "react-icons/fa";



const Products = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');


  useEffect(() => {
    products()
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
    let productFiltered = data;

    if (search) {
      productFiltered = productFiltered.filter(item =>
        ((item.name ?? item.title) || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      productFiltered = productFiltered.filter(item => item.category === category);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      productFiltered = productFiltered.filter(item => item.price >= min && item.price <= max);
    }

    setFilteredData(productFiltered);
  }, [search, category, priceRange, data]);

  return (
    <>
      <div className='h-10'>
        <button onClick={() => navigate('/')}
          class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
          type="button"
        >
          <div
            class="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </svg>
          </div>
          <p class="translate-x-2">Go Back</p>
        </button>
      </div>

      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
        <div className="flex-1 flex flex-col mx-5">
          <main className="p-6 sm:p-8 overflow-y-auto">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5 ">
              
              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm bg-zinc-800 border border-zinc-9 00 text-white rounded-md shadow text-sm"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm bg-zinc-800 border border-zinc-700 text-white rounded-md shadow text-sm"
              >
                <option value="">All Categories</option>
                <option value="men's clothing"> Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm bg-zinc-800 border border-zinc-700 text-white rounded-md shadow text-sm"
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
                className="bg-red-500 flex justify-center gap-3 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
              > <TbZoomReset className="mt-1" />
                Reset Products
              </button>
            </div>

            {loading ? (
              <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : (
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1  xl:grid-cols-3">
                {filteredData.map((item) => {
                  const discount = (item.price * 0.1).toFixed(1); 
                  const finalPrice = (item.price - discount).toFixed(1); 

                  return (
                    <div key={item.id} className="hover:shadow-lg my-5 hover:shadow-indigo-600/60 transition-shadow duration-500 hover:scale-105 bg-gray-50 dark:bg-gray-800 rounded-xl shadow flex flex-col overflow-hidden">
                      <Link to={`/products/${item.id}`}>
                        <div className="aspect-w-10 aspect-h-6">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-56 w-full object-contain bg-white"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                            {item.title}
                          </h2>
                          <div className="flex text-sm gap-1 text-gray-600 dark:text-gray-400 mb-2">
                            Category :<p>{item.category}</p>
                          </div>

                          <div className="grid grid-flow">
                            <div className="flex gap-1 text-lg font-semibold text-gray-800 dark:text-white">
                              Price : <p className='line-through flex gap-1'><CircleDollarSign/>{item.price}</p>
                            </div>

                            <div className="text-sm font-semibold text-green-600 my-1 flex  gap-1">
                              Discount : <p className='flex gap-1'> <CircleDollarSign/> {finalPrice} (10% off) </p>
                            </div>
                            <div className="flex text-md gap-1 bg-yellow-150  mr-2 font-medium text-yellow-500 text-yellow-600 w-15 w-28">
                             Rating : <p className='flex gap-2'><FaStar className='mt-1'/>{item.rating?.rate ?? 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                        </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Products;
