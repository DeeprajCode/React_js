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

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => navigate('/login')} type='button' className="px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 rounded-xl font-semibold transition-transform transform hover:scale-105 shadow-md">
                Logout
              </button>

              <button onClick={() => navigate('/')} type='button' className="px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 rounded-xl font-semibold transition-transform transform hover:scale-105 shadow-md">
                Back to Dashboard
              </button>

            </div>

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