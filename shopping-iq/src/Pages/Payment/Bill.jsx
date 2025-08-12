import React, { useEffect, useState } from 'react';
import { CircleDollarSign, CircleUser, Phone, AtSign, Wallet, MapPinHouse } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCartItems } from '../../Utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdCancel } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const Bill = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [method, setMethod] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const items = getCartItems();
        setCartItems(items);

        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discountAmount = totalPrice * 0.10;
        const final = totalPrice - discountAmount;

        setTotal(totalPrice);
        setDiscount(discountAmount);
        setFinalAmount(final);

        const billData = {
            items,
            total: totalPrice,
            discount: discountAmount,
            finalAmount: final,
            user: JSON.parse(localStorage.getItem('userData')),
            method: JSON.parse(localStorage.getItem('method')),
        };
            console.log("🚀 ~ Bill ~ billData:", billData)
            console.log("🚀 ~ Bill ~ billData.method:", billData.method)
            

        localStorage.setItem('productBill', JSON.stringify(billData));
    }, []);

    useEffect(() => {
        const data = localStorage.getItem('userData');
        setUserData(data ? JSON.parse(data) : null);
    }, [location]);

    useEffect(() => {
        const methodData = localStorage.getItem('method');
        setMethod(methodData ? JSON.parse(methodData) : null);
    }, [location]);

    const cancelOrder = () => {
        toast.error('Order has been cancelled!', {
            position: 'top-right',
            autoClose: 1000,
            theme: 'colored'
        });

        localStorage.removeItem('cart');
        localStorage.removeItem('productBill');

        setTimeout(() => {
            navigate('/');
        }, 1500);
    };
    console.log("🚀 ~ cartItems:", cartItems)

    const placeOrder = () => {        
        toast.success('Thank you for your first purchase! We are so glad you found what you were looking for. We appreciate you choosing us and hope you love your new products.', {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored'
        });
    }
    console.log("🚀 ~ placeOrder ~ placeOrder:", placeOrder)

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
                    <div className="h-10">
                        <button onClick={() => navigate('/payment')} className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group" type="button">
                            <div className="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                                    <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000"></path>
                                    <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000"></path>
                                </svg>
                            </div>
                            <p className="translate-x-2">Go Back</p>
                        </button>
                    </div>

                    {!userData ? (
                        <>
                        <div className='mt-5 ml-[30%]'>
                            <span className='text-red-500'>
                                You must be logged in to view this order Please login or create an account...
                            </span>
                        </div>
                        <div className='ml-[45%] mt-5'>
                            <button onClick={() => navigate('/Login')} className="cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 rounded-xl border-none text-white font-medium group">
                                <div className="relative overflow-hidden">
                                    <p className="group-hover:-translate-y-7 flex gap-1 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        Login
                                    </p>
                                    <p className="absolute top-7 left-0 flex gap-1 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        Login
                                    </p>
                                </div>
                            </button>
                        </div>
                        </>
                    ) : (
                        <>
                            <div className="grid mt-6 w-full gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div>
                            <div className="w-full ml-30">
                                <thead className="bg-gray-400">
                                    <tr className='border-gray-600 border-solid'>
                                        <th className=" border-2 px-2 py-1">Product</th>
                                        <th className="border px-2 py-1">Quantity</th>
                                        <th className="border px-2 py-1">Price</th>
                                        <th className='border px-2 py-1'>Total</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {cartItems.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="flex border px-2 py-1 gap-0.5">
                                                <img src={item.image} alt={item.title} className="w-20 h-20 mt-10 object-contain" />
                                                <p className="text-sm mt-9 mr-2 ml-2">{item.title}</p>
                                            </td>
                                            <td className="border px-5 py-3 text-center">{item.quantity}</td>
                                            <td className="font-bold border px-3  py-10 text-red-600 line-through "> {item.price.toFixed(2)}</td>
                                            <td className='font-bold border px-5 py-10 text-green-700'>{((item.price - item.price * 0.1) * item.quantity ).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </div>
                        </div>

                        <div className="ml-35 border-l-4 border-blue-600 px-10 py-2 rounded-xl">
                            <h2 className='flex gap-1 text-2xl font-semibold'> Shipping Details</h2>
                            <div className="mb-5 mt-5">
                                <p className='flex gap-1 mb-3'><strong className='flex gap-1'><CircleUser/> :</strong> <span>{userData.firstName + " " + userData.lastName}</span></p>
                                <p className='flex gap-1 mb-3'><strong className='flex gap-1'><Phone/> : </strong> <span>{userData.phone}</span></p>
                                <p className='flex gap-1 mb-3'><strong className='flex gap-1'><AtSign/> :</strong> <span>{userData.email}</span></p>
                                <p className='flex gap-1 mb-3'><strong className='flex gap-1'><Wallet/> : </strong> <span>{method}</span></p>
                                <p className='flex gap-1'><strong className='flex gap-1'><MapPinHouse/> :</strong> <span>{userData.address['address'] + ", " + userData.address['city'] + ", " + userData.address['state']}</span></p>
                            </div>

                            <div className="mt-6 bg-gray-50 border p-4 rounded-lg shadow-md">
                                <p className="text-red-600 flex gap-1">Price: <span className="font-medium flex line-through"><CircleDollarSign /> {total.toFixed(2)}</span></p>
                                <p className="text-yellow-700 gap-1 flex">Discount price : <span className="font-medium flex"><CircleDollarSign /> {discount.toFixed(2)} (10%) </span></p>
                                <p className="text-green-700 flex gap-1 text-lg font-bold">
                                    Total price : <span className='flex gap-1'><CircleDollarSign className='mt-1'/>{finalAmount.toFixed(2)}</span>
                                </p>
                            </div>

                            <button onClick={cancelOrder} className="cursor-pointer bg-gradient-to-b from-red-500 to-red-600 px-6 py-3 rounded-xl border-none text-white font-medium group">
                                <div className="relative overflow-hidden">
                                    <p className="group-hover:-translate-y-7 flex gap-1 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        <MdCancel className='mt-1 gap-2' />Cancel order
                                    </p>
                                    <p className="absolute top-7 left-0 flex gap-1 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        <MdCancel className='mt-1' />Cancel order
                                    </p>
                                </div>
                            </button>

                            <button type='button' onClick={placeOrder } className="cursor-pointer ml-5 bg-gradient-to-b from-green-600 to-green-700 px-6 py-3 rounded-xl border-none text-white font-medium group">
                                <div className="relative overflow-hidden">
                                    <p className="group-hover:-translate-y-7 flex gap-1 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        <TbTruckDelivery className='mt-1 gap-2' />Place order
                                    </p>
                                    <p className="absolute top-7 left-0 flex gap-1 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        <TbTruckDelivery className='mt-1 gap-2' />Place order
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Bill;
