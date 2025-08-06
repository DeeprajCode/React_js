import React, { useEffect, useState } from 'react'
import { CircleDollarSign } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addtopayment, getCartItems } from '../../Utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bill = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [cartItems, setCartItems] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const items = getCartItems();
        setCartItems(items);
    }, [])

    useEffect(() => {
        const data = localStorage.getItem('userData');
        setUserData(data ? JSON.parse(data) : null);
    }, [location]);

    // const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // const discount = total * 0.1;
    // const finalAmount = total - discount;

    const cancleOrder = () => {
        toast.success('Your Order is cancled', {
            position: 'top-right',
            autoClose: 1000,
            theme : 'dark'
        })
    }

    if (!userData) {
        return (
            <div className="text-center text-red-600 mt-10">
                <h2>Invalid</h2>
                <button
                    className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
                    onClick={() => navigate('/')}
                >
                    Go back
                </button>
            </div>
        );
    }
    return (
        <>
            {loading ? (
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className='h-10'>
                        <button onClick={() => navigate('/payment')}
                            class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
                            type="button"
                        >
                            <div
                                class="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                    height="25px"
                                    width="25px"
                                >
                                    <path
                                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                        fill="#000000"
                                    ></path>
                                    <path
                                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                        fill="#000000"
                                    ></path>
                                </svg>
                            </div>
                            <p class="translate-x-2">Go Back</p>
                        </button>
                    </div>
                    <div className="grid mt-6 w-full gap-20 sm:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2">

                        <div>
                            <div className="w-full border pl-500 ">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className=" border px-2 py-1">Product</th>
                                        <th className="border px-2 py-1">Qty</th>
                                        <th className="border px-2 py-1">Price</th>
                                        <th className="border px-2 py-1">Total</th>
                                    </tr>
                                </thead>
                                <tbody className='w-full'>
                                    {cartItems.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="flex border px-2 py-1 gap-1 "> <img src={item.image} alt={item.title} className='w-20 h-20 mt-10 object-contain' /><p className='mt-5 mr-2 ml-2'>{item.title}</p></td>
                                            <td className=" border px-5 py-3 text-center">{item.quantity}</td>
                                            <td className="flex border px-5  py-10 text-right mb-50"> $ {item.price.toFixed(2)}</td>
                                            <td className="border px-2 py-1 text-right text-green-700">$ {(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </div>

                            {/* <div className="mt-4 text-right">
                            <p className="text-gray-700 font-medium">Subtotal: ₹{total.toFixed(2)}</p>
                            <p className="text-yellow-600 font-medium">Discount: ₹{discount.toFixed(2)}</p>
                            <p className="text-green-600 text-xl font-bold">
                                <CircleDollarSign className="inline" /> Total: ₹{finalAmount.toFixed(2)}
                            </p>
                        </div> */}
                        </div>

                        <div className='ml-40' >
                            <h2 className="text-2xl font-bold mb-6">🧾 Order Bill</h2>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold">Shipping Details</h3>
                                <p><strong>Name : </strong> {userData.firstName + " " + userData.lastName}</p>
                                <p><strong>Phone :  </strong> {userData.phone}</p>
                                <p className='flex justify-center item-center'><strong>Email :</strong> {userData.email}</p>
                                <p><strong>Address: </strong> {userData.address['address'] + "," + userData.address['city'] + ", " + userData.address["state"]}</p>
                                <p><strong>Payment Method:</strong></p>
                            </div>
                            <button onClick={cancleOrder} class="bg-red-500  hover:bg-red-600 text-white font-bold ml-5 px-3 rounded inline-flex items-center">
                                <svg class="w-10 h-10 mt-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M9.707 8.293a1 1 0 010-1.414L10.586 6l-1.879-1.879a1 1 0 011.414-1.414L12 4.586l1.879-1.879a1 1 0 111.414 1.414L13.414 6l1.879 1.879a1 1 0 01-1.414 1.414L12 7.414l-1.879 1.879a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                <span>Cancel Order</span>
                            </button>

                        </div>
                    </div>
                </>

            )}
        </>
    )
}

export default Bill;
