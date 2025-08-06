import React, { useState, useEffect } from 'react';
import { getCartItems, addtopayment } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
import { CircleDollarSign, icons } from 'lucide-react';
import { FaGooglePay, FaApplePay, FaCreditCard } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Payment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = total * 0.1;
  const finalAmount = total - discount;

  const cconfirmpayment = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method!.", {
        position : 'top-right',
        theme: 'colored',
        autoClose: 1500,
      });
      return;
    } else {
      toast.success('Your Order is confirmed', {
        position: 'top-right',
        theme:'colored',
        autoClose: 1000,
      });
      navigate('/bill');
    }

    const orderData = {
      cartItems,
      selectedMethod,
      summary: {
        price: total,
        discount,
        finalAmount,
      },
    };
    addtopayment(orderData);

  };

  return (
    <>
      {loading ? (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-2 content-start gap-4'>
          <div className="w-[320px] p-4 rounded-lg shadow flex flex-col items-center justify-center gap-3 bg-slate-50 ">
            <button
              onClick={() => navigate('/Cart')}
              className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
            >
              <div className="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" viewBox="0 0 1024 1024">
                  <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000"></path>
                  <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000"></path>
                </svg>
              </div>
              <p className="translate-x-2">Go Back</p>
            </button>

            <p className="capitalize font-semibold self-start">Payment method</p>

            {[
              { label: 'Google Pay', value: 'google', icon: <FaGooglePay className='w-10 h-10 ' /> },
              { label: 'Apple Pay', value: 'apple', icon: <FaApplePay className='w-10 h-10' /> },
              { label: 'Credit Card', value: 'credit', icon: <FaCreditCard className='w-8 h-5' /> },
              { label: 'Cash on Delivery', value: 'cod', icon: <GiMoneyStack className='w-8 h-8' /> },
            ].map((method, idx) => (
              <label key={idx} className="inline-flex justify-between w-full items-center rounded-lg p-2 border border-transparent has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 has-[:checked]:font-bold hover:bg-slate-200 transition-all cursor-pointer duration-500 relative overflow-hidden">
                <div className="inline-flex items-center gap-5 relative">
                  {method.icon}
                  {method.label}
                </div>
                <input
                  type="radio"
                  name="payment"
                  value={method.value}
                  onChange={() => setSelectedMethod(method.value)}
                  className="checked:text-indigo-500 focus:ring-0"
                />
              </label>
            ))}

            <div className="pt-4 ml-50 ">
              <p className="text-lg font-medium text-gray-700 flex gap-1">
                Price: <CircleDollarSign /> {total.toFixed(2)}
              </p>
              <p className="text-lg font-medium text-yellow-700 flex gap-1">
                Discount: <CircleDollarSign /> {discount.toFixed(2)}
              </p>
              <p className="text-2xl font-bold text-green-600 flex gap-1">
                Total: <CircleDollarSign /> {finalAmount.toFixed(2)}
              </p>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
              onClick={cconfirmpayment}
            >
              Confirm Order and Pay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
