import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('userData');
    setUserData(data ? JSON.parse(data) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/Login');
  };

  const IconButton = ({ onClick, children }) => (
    <button onClick={onClick} className="w-8 hover:scale-125 transition duration-200 hover:stroke-blue-500">
      {children}
    </button>
  );

  return (
    <header className="w-full h-20 flex justify-between items-center bg-gradient-to-r from-white via-gray-100 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl px-4 py-1">
      
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="group relative w-10 h-10 m-6 mt-2 p-1">
        <span className="block mx-auto relative top-3 w-7 h-1.5 bg-black transition-all duration-200 
          group-hover:w-5
          before:absolute before:-mt-3 before:w-7 before:h-1.5 before:bg-black before:left-0 
          before:transition-all before:duration-200 group-hover:before:-mt-1.5 group-hover:before:w-2.5 group-hover:before:left-1.5
          after:absolute after:mt-3 after:w-7 after:h-1.5 after:bg-black after:left-0 
          after:transition-all after:duration-200 group-hover:after:mt-1.5 group-hover:after:-left-1.5" />
      </button>

      {/* Right-side actions */}
      <div className="flex items-center space-x-4">
        {/* Not logged in */}
        {!userData ? (
          <>
            <button 
              onClick={() => navigate('/Login')}
              className="group flex items-center justify-start w-11 h-11 bg-green-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M15 12H3m12 0l-4-4m4 4l-4 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                </svg>
              </div>
              <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Login
              </div>
            </button>

            <IconButton onClick={() => navigate('/Cart')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.186 1.705.707 1.705H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </IconButton>
          </>
        ) : (
          <>
            {/* Cart */}
            <IconButton onClick={() => navigate('/Cart')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.186 1.705.707 1.705H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </IconButton>

            {/* User Profile */}
            <div className="group relative">
              <IconButton onClick={() => navigate('/User')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </IconButton>
              <span className="absolute -bottom-6 left-[220%] -translate-x-[90%] z-10 origin-left scale-0 px-4 rounded-lg py-2 text-sm font-bold transition-all duration-400 ease-in-out group-hover:scale-100 whitespace-nowrap">
                {userData.firstName} {userData.lastName}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
