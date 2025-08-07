import { useEffect, useState } from 'react';
import React from 'react';
import techLOGO from '../Aboutus/technology-image.png';
import { useNavigate } from 'react-router-dom';

 const Aboutus = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            { loading ? (
                <div class="flex-col gap-4 w-full flex items-center justify-center" >
                    <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                            <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                        </div>
                    </div >
                ) : (
                    <>
                        <div className='my-2'>
                            <button onClick={() => navigate('/')} class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group" type="button">
                                <div class="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
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
                        
                        <div>
                            <div className="grid grid-cols-2 content-start gap-4 ...  ">
                                <img className='h-26 w-26' src={techLOGO} alt="" srcset="" />
                                <div className="bg-white shadow-md rounded-xl p-1 mb- border-l-4 border-blue-500">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2 mx-2">🛍️ About to Shopping-IQ!</h2>
                                    <p className="text-gray-600 mx-2">
                                        Discover the best deals, explore new arrivals, and track your orders in real time.
                                        Our platform is designed to give you a seamless shopping experience—from browsing products to checking out safely.
                                        Enjoy exclusive discounts, fast delivery, and 24/7 customer support.
                                    </p>
                                    <p className=' text-gray-600 my-3 mx-2'>Shopping-IQ culture is steeped in fostering trust, inclusion, support, recognition and genuine care that enables Flipsters to create, innovate, and bring their best selves to work.</p>
                                    <p className="text-gray-600 my-3 mx-2">Shopping-IQ drives path-breaking, customer-focused innovation that makes high quality products accessible to Indian shoppers, besides making the online shopping experience convenient, intuitive and seamless.</p>
                                    <p className='text-1x text-gray-600 my-3 mx-2'>The future of e-commerce is sustainable, equitable and inclusive. As we continue to drive changes across key areas of our operations, our commitment is embedded in our vision to create a positive impact, for the planet and communities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </>

    )
}

export default Aboutus;
