import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone,
  AtSign,
  MapPinHouse,

} from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem('userData')
  const userData = JSON.parse(data);

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
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => navigate('/Login')}
                class="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
              >
                <div
                  class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                >
                  <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path
                      d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                    ></path>
                  </svg>
                </div>
                <div
                  class="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  Logout
                </div>
              </button>
            </div> */}
          </div>
          <div className="flex-1 flex justify-center animate-float">
            <img src={userData.image} alt="Sai Bende" className="w-64 h-64 rounded-full border-4 border-indigo-500 dark:border-indigo-400 shadow-xl object-cover hover:scale-105 transition duration-500" />
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
