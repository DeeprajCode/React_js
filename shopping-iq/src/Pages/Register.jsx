import React, { useState } from 'react';
import Logo from '../Pages/images/laptop.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const successErrors = {};
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;


    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (!fullNameRegex.test(fullName)) {
      newErrors.fullName = 'Full name is not valid';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if(!address){
      newErrors.address = 'Address is required';
    }

    if(!number){
      newErrors.number = 'Number is required';
    }else if(!numberRegex.test(number)){
      newErrors.number = 'Enter a valid number formate';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Full Name:', fullName);
      console.log('Email:', email);
      console.log('Password:', password);
      // Navigate only after successful validation
      navigate('/ login');

      toast.success('Successfully Registration', {
        position: "top-right",
        theme: "colored",
        closeOnClick: false,
        autoClose: 1000,
        onClose: () => navigate('/login'),
      });
    } else {
      toast.error("Regisration failed. Please check your informations", {
        postion: 'top-right',
        theme: 'colored',
        autoClose: 1500,
      })
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full  max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex flex-col items-center p-1">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-18 h-20 mr-2" src={Logo} alt="Shopping logo" />
          </a>
          <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Shopping-IQ
          </h1>
          <h3 className=" mb-10  text-1xl font-bold text-gray-800 mb-2 leading-tight tracking-tight text-gray-900  dark:text-white">
            Shop the world from your home <span>🛍️</span>
          </h3>
          <form className="w-full space-y-2 md:space-y" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Full name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white 
                  ${errors.fullName
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  } text-gray-900`}
              />
              {errors.fullName && <p className="mt-1 text-red-600 text-sm">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white 
                  ${errors.email
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  } text-gray-900`}
              />
              {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white 
                  ${errors.password
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  } text-gray-900`}
              />
              {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white 
                  ${errors.address
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  } text-gray-900`}
              />
              {errors.address && <p className="mt-1 text-red-600 text-sm">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mobile :
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter your address"
                className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white 
                  ${errors.address
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  } text-gray-900`}
              />
              {errors.number && <p className="mt-1 text-red-600 text-sm">{errors.number}</p>}
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <span
                onClick={() => navigate("/login")}
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
