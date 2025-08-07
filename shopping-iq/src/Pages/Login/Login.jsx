import React, { useState, useEffect } from 'react';
import Logo from '../Login/laptop.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginuser } from '../../Utils/api';
import { FaShoppingBag } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!email){
      newErrors.email = 'Email is required!';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Login = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        
        const apiuser = await loginuser();
        const apiUsers = apiuser?.users || [];

        const localUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password.trim();

        const allUsers = [...localUsers, ...apiUsers];
        const matchedUser = allUsers.find(user =>
          user.email?.trim().toLowerCase() === normalizedEmail &&
          user.password?.trim() === normalizedPassword
        );

        if (!matchedUser) {
          toast.error('Invalid credentials!', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 1500,
          });
        } else {
          localStorage.setItem("userData", JSON.stringify(matchedUser));
          toast.success('Login successful!', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 1000,
            onClose: () => navigate('/'),
          });

          setEmail('');
          setPassword('');
        }

      } catch (error) {
        console.error('Login Error:', error);
        toast.error('Login failed. Please try again.', {
          position: 'top-right',
          theme: 'colored',
          autoClose: 1500,
        });
      }
    } else {
      toast.error('Login failed. Please check your input.', {
        position: 'top-right',
        theme: 'colored',
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
        { loading ? (
          <div class="flex-col gap-4 w-full flex items-center justify-center">
            <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
              <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
              <div className="flex flex-col items-center p-6 justify-items-center">
                <img className="w-20 h-20 mb-4" src={Logo} alt="Logo" />
                  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent mb-6">
                    Shopping-IQ
                  </h1>
                  <h3 className="mb-10 text-1xl flex font-bold text-gray-800 dark:text-white">
                    Shop the world from your home. <FaShoppingBag className="ml-2 mt-1" />
                  </h3>

              <form className="w-full space-y-4" onSubmit={Login}>
                <div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.email
                      ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      } text-gray-900`}
                  />
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.password
                      ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    } text-gray-900`}
                  />
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Login
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don’t have an account? 
                  <span onClick={() => navigate('/Register')} className="text-blue-600 underline cursor-pointer ml-1">
                    Register
                  </span>
                </p>
              </form>
              </div>
            </div>
          </>
        ) }
      </section>
    </>
  );
};

export default Login;
