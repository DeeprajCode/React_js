'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdOutlinePendingActions } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

   useEffect(() => {
    if(typeof window !== 'undefined'){
      try{
        const storedData = localStorage.getItem('userData');
        setUserData(storedData ? JSON.parse(storedData) : null);
      }catch(error){
        console.error("Error for get user from localStorage", error);
        setUserData(null)
      }
    }
  }, [])

  const logout = () => {
    if(typeof window !== 'undefined'){
      localStorage.removeItem('userData');
      setUserData(null);
    }
    toast.error('Logout successfully', {
      theme:'colored',
      position:'top-right',
      autoClose: 1500,
    })
    router.push('/Login')
  };

  const IconButton = ({ onClick, children }) => (
    <button onClick={onClick} className="focus:outline-none transform transition-transform duration-300 hover:scale-125 hover:text-blue-500 w-8">
      {children}
    </button>
  );

  return (
    <>
    <ToastContainer/>
      <header className="w-full h-22 flex justify-between items-center bg-gradient-to-r from-white via-gray-100 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl px-4 py-1">
        
        <div className="flex ml-[800px] items-center space-x-4">
          {!userData ? (
            <>
              <Link href='/Login' className="cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 rounded-xl border-[1px] border-none text-white font-medium group">
                <div className="relative overflow-hidden">
                  <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Login
                  </p>
                  <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Login
                  </p>
                </div>
              </Link>

              <Link href='/Register' className="cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 rounded-xl border-[1px] border-none text-white font-medium group">
                <div className="relative overflow-hidden">
                  <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Register
                  </p>
                  <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Register
                  </p>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href='/Cart'>
                <IconButton>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.186 1.705.707 1.705H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </IconButton>
              </Link>

              <Link href='/Bill' className='focus:outline-none transform transition-transform duration-300 hover:scale-125 hover:text-blue-500 w-8'>
                <MdOutlinePendingActions className='w-10 h-8' />
              </Link>


              <div className="group relative">
                <Link href='/User'>
                  <IconButton>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </IconButton>
                </Link>
                <span className="text-blue-600/90 absolute -bottom-10 left-[200%] -translate-x-[90%] z-10 origin-left scale-0 px-4 rounded-lg py-2 text-sm font-bold transition-all duration-400 ease-in-out group-hover:scale-100 whitespace-nowrap">
                  {userData.firstName} {userData.lastName}
                </span>
              </div>

              <button onClick={logout} className="cursor-pointer bg-gradient-to-b from-red-500 to-red-600 px-6 py-3 rounded-xl border-[1px] border-none text-white font-medium group">
                <div className="relative overflow-hidden">
                  <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Logout
                  </p>
                  <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Logout
                  </p>
                </div>
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
