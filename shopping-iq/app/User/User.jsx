import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Phone, AtSign, MapPinHouse} from 'lucide-react';
import userPrImage from '../User/userProfile.png'

const UserProfile = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem('userData')
  const userData = JSON.parse(data);
  console.log("🚀 ~ UserProfile ~ userData:", userData)

  return (
    <>
      <button onClick={() => navigate('/')}
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

      <section className="min-h-50 flex items-center justify-center bg-white dark:bg-gray-900 px-6 py-10 transition-colors duration-300">
        <div className="max-w-8xl w-50 flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="flex-2 text-center lg:text-left animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              {userData.firstName + " " + userData.lastName}
            </h1>
            <p className="flex items-center text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-5 my-5">
              <AtSign className="mr-3" />:
              <span className="text-indigo-600 dark:text-indigo-400 font-medium ml-3"> {userData.email}</span>
            </p>
            <p className="flex items-center text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-5 my-5">
              <Phone className="mr-3" />:
              <span className="text-indigo-600 dark:text-indigo-400 font-medium ml-3"> {userData.phone}</span>
            </p>
            <p className="flex items-center text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-5 my-5 ">
              <MapPinHouse className="mr-3" />:
              <span className="text-indigo-600 dark:text-indigo-400 font-medium ml-3">{userData.address['address'] + ', ' + userData.address['city'] + ', ' + userData.address['state']}</span>
            </p>
          </div>
          {!userData.image ? (
            <div className="flex-1 flex justify-center animate-float">
              <img src={userPrImage} alt="Sai Bende" className="w-64 h-64 rounded-full border-4 border-indigo-500 dark:border-indigo-400 shadow-xl object-cover hover:scale-105 transition duration-500" />
            </div>
          ) : (
            <div className="flex-1 flex justify-center animate-float">
              <img src={userData.image} alt="Sai Bende" className="w-64 h-64 rounded-full border-4 border-indigo-500 dark:border-indigo-400 shadow-xl object-cover hover:scale-105 transition duration-500" />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UserProfile;
