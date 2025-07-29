import { useState } from 'react'
import React from 'react'
import techLOGO from '../assets/images/technology-image.png'
import { Navigate, useNavigate } from 'react-router'

export const Aboutus = () => {
const navigate = useNavigate();

    return (
        <div>

            <div className="grid grid-cols-2 content-start gap-4 ...  ">
                {/* 🛍️ Info About Online Shopping */}

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

            <div className='flex items-center justify-center my-2'>
                <button type="button" onClick={() => navigate('/')} class="flex items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Back to dashboard</button>
            </div>

        </div>
    )
}

export default Aboutus;
