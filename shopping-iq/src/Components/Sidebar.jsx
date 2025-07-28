import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/laptop.png';
import { getPosts } from '../Utils/api';

const Sidebar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));

  useEffect(() => {
    getPosts()
      .then(posts => {
        setData(posts);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to load products.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="bg-gradient-to-b from-[#fdfcfb] via-[#e2ebf0] to-[#dee2e6] dark:from-[#1e1e2f] dark:via-[#2d2d44] dark:to-[#1c1c2e] border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl px-6 py-8 transition-all duration-500 hover:shadow-2xl">
      <div className="p-4 flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="w-20 h-20 drop-shadow-xl rounded-full" />
        <span className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400">
          Shopping-IQ
        </span>
      </div>


      <nav className="mt-8">
        <ul className="space-y-4 px-2">
          {[
            { label: 'Home', route: '/' },
            { label: 'About Us', route: '/Aboutus' },
            { label: 'Contact', route: null },
            { label: 'Products', route: '/Products' },
          ].map(({ label, route }) => (
            <li key={label}>
              <button
                onClick={() => route && navigate(route)}
                className="w-full text-left px-5 py-3 text-base font-semibold text-gray-800 dark:text-white bg-gradient-to-r from-white via-gray-100 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-xl shadow-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:dark:from-indigo-600 hover:dark:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
