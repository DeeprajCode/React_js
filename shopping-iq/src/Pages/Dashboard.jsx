import React, { useState, useEffect } from "react";
import { getPosts } from "../Utils/api";
import bgimage from "../assets/images/shoppingbg.png";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const udata = localStorage.getItem('userData');
  console.log("🚀 ~ Dashboard ~ udata:", udata)
  const userData = udata ? JSON.parse(udata) : null;
  console.log("🚀 ~ Dashboard ~ userData:", userData)


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
          className="absolute inset-0 bg-cover bg-center size-full"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 0.6, // adjust the background image opacity
            zIndex: 0,
          }}
        ></div>

        {/* Foreground content */}
        <div className="relative z-10 p-10">
          {loading && (

            <div class="flex-col gap-4 w-full flex items-center justify-center">
              <div
                class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
              >
                <div
                  class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
              </div>
            </div>

          )}

          <div className="bg-blue shadow-md rounded-xl p-6 mb-10 my-16 border-l-4 border-b-4 border-blue-500">
            <h2 className="flex items-center justify-center text-2xl font-bold text-gray-800 mb-2">
              🛍️ Welcome {userData ? userData.firstName + " " + userData.lastName : ""} in Shopping-IQ
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
