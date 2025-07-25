import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { getPosts } from "../Utils/api";
import Dashboardimage from '../Pages/images/dashboardimg.jpg'

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Header />
        <div className="p-6">
          {/* 🛍️ Info About Online Shopping */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-6 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🛍️ Welcome to Our Online Shopping Dashboard!</h2>
            <p className="text-gray-600">
              Discover the best deals, explore new arrivals, and track your orders in real time.
              Our platform is designed to give you a seamless shopping experience—from browsing products to checking out safely.
              Enjoy exclusive discounts, fast delivery, and 24/7 customer support.
            </p>
          </div>

          {/* Main Content */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))
            )}
          </div> */}

          <div className="h-20 w-20">
            <img src={Dashboardimage} alt="" srcset="" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
