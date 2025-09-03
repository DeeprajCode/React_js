'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import bgimage from "../app/shoppingbg.png";
import LaptopLogo from '../app/laptop.png';
import { FaShoppingBag } from "react-icons/fa";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const udata = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;
  const userData = udata ? JSON.parse(udata) : null;

  return (
  <>
    <div className="flex">
      <div className="flex-1 bg-gray-100 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center size-full">
          <Image src={bgimage} width={700} height={700} alt="Background image" className="ml-[20%]"/>
        </div>

        <div className="relative z-10 p-10">
          {loading && (
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </div>
          )}

          <div className="bg-blue shadow-md rounded-xl p-6 mb-10 my-16 border-l-4 border-b-4 border-blue-500">
            <p className="flex items-center justify-center text-2xl gap-2 font-bold text-gray-800 mb-2">
              <Image src={LaptopLogo} alt="" height={20} width={40} /> Welcome <strong>{userData ? userData.firstName + " " + userData.lastName : " "}</strong> in Shopping-IQ
            </p>
            <h1 className="flex items-center justify-center text-2xl font-bold text-gray-800 mb-3">
              Shop the world from your home. <FaShoppingBag className="ml-2" />
            </h1>
            <p className="text-gray-900">
              Discover the best deals, explore new arrivals, and track your orders in real time.
              Our platform is designed to give you a seamless shopping experience—from browsing products to checking out safely.
              Enjoy exclusive discounts, fast delivery, and 24/7 customer support.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Dashboard;