import React, { useState, useEffect } from 'react';
import Logo from '../Pages/images/laptop.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchuser } from '../Utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchuser();
      console.log(user);
    };
    getUser();
  }, []);

  const validate = () => {
    const newErrors = {};
    const successMessages = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else {
      successMessages.email = 'Email is valid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      successMessages.password = 'Password is valid';
    }
    setErrors(newErrors);
    setSuccess(successMessages);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const users = await fetchuser();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password.trim();
        const user = users.users.find((u) => {
          const userEmail = u.email?.trim().toLowerCase();
          const userPassword = u.password?.trim();
          return userEmail === normalizedEmail && userPassword === normalizedPassword;
        });

localStorage.setItem("userData", JSON.stringify(user))

        if (!user) {
          toast.error('Invalid credentials!', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 1500,

          });
        } else {
          toast.success('Login successful!', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 1000,
            onClose: () => navigate('/'),
          });
        }
      } catch (error) {
        toast.error('Login failed. Please try again.', {
          position: 'top-right',
          theme: 'colored',
          autoClose: 1500,
        });
        console.error('Login error:', error);
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
        <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="flex flex-col items-center p-6 justify-items-center">
            <a href="/Login" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-20 h-20 mr-2" src={Logo} alt="Shopping IQ logo" />
            </a>
            <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Shopping-IQ
            </h1>
            <h3 className="mb-10  text-1xl font-bold text-gray-800 mb-2 leading-tight tracking-tight text-gray-900  dark:text-white">
              Shop the world from your home 🛍️
            </h3>
            
            <form className="w-full space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                {success.email && <p className="mt-1 text-green-600 text-sm">{success.email}</p>}
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
                {success.password && <p className="mt-1 text-green-600 text-sm">{success.password}</p>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account?{' '}
                <span
                  onClick={() => navigate('/Register')}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                >
                  Register
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
