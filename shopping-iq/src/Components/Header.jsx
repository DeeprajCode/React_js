import React, { useState, useEffect } from 'react';
import CartLogo from '../assets/images/shopping-cart.png';
import ProfileLogo from '../assets/images/user.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem('userData');
  const userData = data ? JSON.parse(data) : null;

  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Load all products once for suggestion popup
  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setAllProducts(json);
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = allProducts.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [searchText, allProducts]);

  return (
    <header className="flex justify-between items-center bg-gradient-to-b from-[#fdfcfb] via-[#e2ebf0] to-[#dee2e6] dark:from-[#1e1e2f] dark:via-[#2d2d44] dark:to-[#1c1c2e] border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl px-6 py-8">
      {/* Search */}

      
      <div className="relative w-1/2">
      
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-sm"
        />
        {suggestions.length > 0 && (
          <div className="absolute z-50 bg-white dark:bg-gray-800 shadow-md rounded-md mt-1 w-full max-h-64 overflow-y-auto">
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/products/${item.id}`);
                  setSearchText('');
                  setSuggestions([]);
                }}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                {item.title}
              </div>
            ))}
            
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {!userData && (
          <button
            type="button"
            onClick={() => navigate('/Login')}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Login
          </button>
        )}
        <button class="relative p-2 rounded-full bg-transparent text-black  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">

  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.186 1.705.707 1.705H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>


  <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
    3
  </span>
</button>
        {userData && (
          <div className=" cursor-pointer" onClick={() => navigate('/User')}>
            <img src={userData.image} alt="Profile" className=" h-10 w-10 rounded-full " />
            <p className="text-black dark:text-white font-medium">
              {userData.firstName + " " + userData.lastName}
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
