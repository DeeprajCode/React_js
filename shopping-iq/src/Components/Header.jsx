// src/Components/Header.js
import React from 'react';
import CartLogo from '../assets/images/shopping-cart.png';
import ProfileLogo from '../assets/images/user.png';
import { useNavigate } from 'react-router-dom';
import userloginLogo from '../assets/images/log-in.png';

const Header = () => {
  const data = localStorage.getItem('userData')
  const userData = JSON.parse(data)
  console.log("🚀 ~ Header ~ data:", JSON.parse(data))
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center bg-gradient-to-b from-[#fdfcfb] via-[#e2ebf0] to-[#dee2e6] dark:from-[#1e1e2f] dark:via-[#2d2d44] dark:to-[#1c1c2e] border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl px-6 py-8 transition-all duration-500 hover:shadow-2xl">
      <div className="text-xl font-bold text-black flex items-center space-x-4">
        
      </div>
      <div className="flex items-center space-x-4">
        <button type="button" onClick={() => navigate('/Login')} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Login</button>
        <a className="text-white h-10 text-sm font-medium rounded-md transition-colors">
          <img src={CartLogo} alt="Cart" className="h-10 w-10" />
        </a>
        <a className="text-black h-10 justify-items-center text-sm font-medium rounded-md transition-colors" onClick={() => navigate('/User')}>
          <img src={ProfileLogo} alt="Profile" className="h-10 w-10 rounded-full" />
          <p className='items-center w-24 h-12'>{userData.firstName + " " + userData.lastName}</p>
        </a>
      </div>
    </header>
  );
};

export default Header;
