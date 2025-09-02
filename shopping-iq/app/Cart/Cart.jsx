import React, { useEffect, useState } from 'react';
import { TbCurrencyDollar } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { CgMathMinus } from "react-icons/cg";
import { CgMathPlus } from "react-icons/cg";
import {getCartItems,removeFromCartApi,updateCartQuantity} from '../../Utils/api';

const Cart = () => {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const data = localStorage.getItem('userData');
    console.log("🚀 ~ Cart ~ data:", data)
    setUserData(data ? JSON.parse(data) : null);
  }, [])

  useEffect(() => {
    setLoading(true);
    const items = getCartItems();
    console.log("🚀 ~ Cart ~ items:", items)
    setCartItems(items);
    setLoading(false);
  }, []);

  const remove = (id) => {
    removeFromCartApi(id);
    setCartItems(getCartItems());
    navigate('/Cart');
  };

  const QuantityChange = (id, quantity) => {
    if (quantity < 0 || quantity > 8) return;
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };
  console.log("🚀 ~ QuantityChange ~ QuantityChange:", QuantityChange)
  
 
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totaldiscount = total * 0.1;
  const finalAmount = total - totaldiscount.toFixed(2);
  console.log("🚀 ~ Cart ~ finalAmount:", finalAmount)

  return (  
    <>
      <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Your Cart</h1>

        <button onClick={() => navigate('/Products')} className="bg-white text-center w-48 rounded-2xl h-14 ml-5 relative text-black text-xl font-semibold group mb-5" type="button">
          <div className="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
              <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000"></path>
              <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000"></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>

      {loading ? (

        <div className="flex flex-col items-center justify-center w-full py-20">
          <div className="relative">
            <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
          </div>
            <div className="w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>

      ) : cartItems.length === 0 ? (

        <p className="text-center text-gray-600 dark:text-gray-300">Your cart is empty, pleace add your product! </p>

      ) : (

        <>
          <div className="max-w-4xl mx-auto space-y-6">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-white hover:scale-105 hover:shadow-indigo-600  dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center border-l-4 border-blue-600">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />

                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className='flex gap-0.5 font-bold text-red-700'> Price: <span className='flex line-through'><TbCurrencyDollar className='mt-1'/> {item.price.toFixed(2)}</span></p>
                    <p className='flex gap-0.5 font-bold text-green-800'>Discount price : <TbCurrencyDollar className='mt-1'/> {((item.price - item.price * 0.1) * item.quantity).toFixed(2)} (10% off) </p>
                    
                    <div className="flex items-center mt-2">
                      <button onClick={() => QuantityChange(item.productId, item.quantity - 1)}
                        className={`px-2 py-1 rounded ${item.quantity <= 1
                          ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50'
                          : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        disabled={item.quantity <= 1}
                      >
                      <CgMathMinus />
                    </button>
 
                    <span className="px-4 ">{item.quantity}</span>

                    <button
                      onClick={() => QuantityChange(item.productId, item.quantity + 1)}
                      className={`px-2 py-1 rounded ${item.quantity >= 8
                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50'
                        : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        disabled={item.quantity >= 8}
                      >
                      <CgMathPlus />
                    </button>
                  </div>
              </div>

              <div className="ml-4 text-right">
                <button onClick={() => remove(item.productId)} className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600">
                  <svg
                    viewBox="0 0 1.625 1.625"
                    className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                    height="15"
                    width="15"
                  >
                  <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                    <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                    <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                  </svg>

                  <svg
                    width="16"
                    fill="none"
                    viewBox="0 0 39 7"
                    className="origin-right duration-500 group-hover:rotate-90"
                  >
                    <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                    <line
                      stroke-width="3"
                      stroke="white"
                      y2="1.5"
                      x2="26.0357"
                      y1="1.5"
                      x1="12"
                    ></line>
                  </svg>
                  <svg width="16" fill="none" viewBox="0 0 33 39" className="">
                    <mask fill="white" id="path-1-inside-1_8_19">
                      <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                    </mask>
                    <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
                    <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                    <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <p className="text-lg font-medium text-red-700 dark:text-red-800 flex gap-1">
              Price: <p className='flex gap-1 line-through'> <TbCurrencyDollar className='mt-1.5'/> {total.toFixed(2)} </p>
            </p>
            <p className="text-lg font-medium text-yellow-700 flex gap-1">
              Discount price: <TbCurrencyDollar className='mt-1.5'/> {totaldiscount.toFixed(2)}
            </p>
            <p className="text-2xl font-bold text-green-600 flex gap-1">
              Total price: <TbCurrencyDollar className='mt-1' /> {finalAmount.toFixed(2)}
            </p>
          </div>

          {!userData ? ( 
            <>
            <div className='text-red-800'>
              <span>You must be login or create an account to add cart products for payment process...</span>
            </div>
              <button onClick={() => navigate('/Login')} className="cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 rounded-xl border-[1px] border-none text-white font-medium group">
                <div className="relative overflow-hidden">
                  <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Login
                  </p>
                  <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Login
                  </p>
                </div>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/Payment')} className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
                Buy now
                 <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
                <span className="text-black text-xl group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">Buy now</span>
              </button>
            </>
          )}
        </div>
        </>
      )}
    </div>
    </>
  );
};

export default Cart;
