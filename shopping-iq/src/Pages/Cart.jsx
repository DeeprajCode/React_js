import React, { useEffect, useState } from 'react';
import {
  getCartItems,
  removeFromCartApi,
  updateCartQuantity
} from '../Utils/api';

import  {CircleDollarSign, Trash2 } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id) => {
    removeFromCartApi(id);
    setCartItems(getCartItems());
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = total * 0.1;
  const finalAmount = total - discount;

  return (
    <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.map((item) => (
            <div key={item.productId} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p>Price: ₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                  >-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                  >+</button>
                </div>
              </div>
              <div className="ml-4 text-right">
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="text-red-600 hover:underline flex"
                >
                 <Trash2/> Remove
                </button>
              </div>
            </div>
          ))}

          <div className="">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200 gap-1 flex">Price: <CircleDollarSign/>  {total.toFixed(2)}</p>
            <p className="text-lg font-medium text-yellow-700 flex gap-1">Discount: <CircleDollarSign/>  {discount.toFixed(2)}</p>
            <p className="text-2xl font-bold text-green-600 flex gap-1">Total: <CircleDollarSign/> {finalAmount.toFixed(2)}</p>
          </div>

          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 9a1 1 0 000 2h4a1 1 0 100-2H5zm7 0a1 1 0 100 2h4a1 1 0 100-2h-4z" clip-rule="evenodd"></path>
  </svg>
  <span>Buy Now</span>
</button>

        </div>
      )}
    </div>
  );
};

export default Cart;
