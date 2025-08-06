import React, { useState, useEffect } from 'react';
import Logo from '../Login/laptop.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginuser } from '../../Utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    const successMessages = {};

    if (!email) newErrors.email = 'Email is required';
    else successMessages.email = '✓';

    if (!password) newErrors.password = 'Password is required';
    else successMessages.password = '✓';

    setErrors(newErrors);
    setSuccess(successMessages);

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

        // Combine and find the matching user
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
        <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="flex flex-col items-center p-6 justify-items-center">
            <img className="w-20 h-20 mb-4" src={Logo} alt="Logo" />
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent mb-6">
              Shopping-IQ
            </h1>
            <h3 className="mb-10 text-1xl font-bold text-gray-800 dark:text-white">
              Shop the world from your home 🛍️
            </h3>

            <form className="w-full space-y-4" onSubmit={Login}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`input ${errors.email && 'border-red-500'}`}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`input ${errors.password && 'border-red-500'}`}
                />
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Submit */}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Login
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don’t have an account?{' '}
                <span onClick={() => navigate('/Register')} className="text-blue-600 underline cursor-pointer">
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
