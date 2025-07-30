import React, { useState, useEffect } from "react";
import { getPosts } from "../Utils/api";
import bgimage from "../assets/images/shoppingbg.png";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const udata = localStorage.getItem('userData');
  const userData = udata ? JSON.parse(udata) : null;


  useEffect(() => {
    getPosts()
      .then((posts) => {
        setData(posts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (<>
    <div className="flex">
  <div className="flex-1 bg-gray-100 min-h-screen relative overflow-hidden">
    
    {/* Background image with opacity */}
    <div
      className="absolute inset-0 bg-cover bg-center h-17 w-17"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity: 0.5, // adjust the background image opacity
        zIndex: 0,
      }}
    ></div>

    {/* Foreground content */}
    <div className="relative z-10 p-10">
      {loading && (
        <div className="text-center text-gray-700 dark:text-gray-200">
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG paths */}
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 
              50 100.591C22.3858 100.591 0 78.2051 
              0 50.5908C0 22.9766 22.3858 0.59082 
              50 0.59082C77.6142 0.59082 100 22.9766 
              100 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 
              97.8624 35.9116 97.0079 33.5539C95.2932 
              28.8227 92.871 24.3692 89.8167 20.348..."
              fill="#1C64F2"
            />
          </svg>
        </div>
      )}

      <div className="bg-blue shadow-md rounded-xl p-6 mb-10 my-16 border-l-4 border-b-4 border-blue-500">
        <h2 className="flex items-center justify-center text-2xl font-bold text-gray-800 mb-2">
          🛍️ Welcome {userData.firstName + " " + userData.lastName} in Shopping-IQ
        </h2>
        <h1 className="flex items-center justify-center text-2xl font-bold text-gray-800 mb-3">
          Shop the world from your home.
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
