import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileLogo from '../assets/images/user.png';
import userlogout from '../assets/images/logout.png'
import cancleLogo from '../assets/images/transport.png';
const UserProfile = () => {
  const navigate = useNavigate();
  // Example static user data (replace with actual API data)
  const data = localStorage.getItem('userData')
  const userData = JSON.parse(data);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="flex items-center mb-6 flex items-center justify-center">
        <div className="my-10">
          <div className="">
            <img className="w-32 h-32 mr-3" src={userData.image} alt="Shopping IQ logo" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Name :</span> {userData.firstName + " " + userData.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Email :</span> {userData.email}
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Phone :</span> {userData.phone}
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Address :</span> {userData.address['address'] + ', ' + userData.address['city'] + ', ' + userData.address['state']}
              </p>
            </div>
            <div className="flex justify-between pt-6">
              <button type="button" onClick={() => navigate('/Login')} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
              <button type="button" onClick={() => navigate('/')} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Back to dashboard</button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};


export default UserProfile;









