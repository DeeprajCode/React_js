import React, { useState } from 'react';
import Logo from '../Register/laptop.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Phone } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  // Input validation
  const validate = () => {
    const newErrors = {};
    const firstNameRegex = /^[a-zA-Z\s]+$/;
    const lastNameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (!firstNameRegex.test(firstName)) {
      newErrors.firstName = 'First name is not valid';
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (!lastNameRegex.test(lastName)) {
      newErrors.lastName = 'Last name is not valid';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (!address) {
      newErrors.address = 'Address is required'
    }

    if(!city) {
      newErrors.city = 'City is required';
    }

    if(!state) {
      newErrors.state = 'State is required';
    }

    if (!phone) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Enter a valid phone number'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = (e) => {
    e.preventDefault();
    if (validate()) {
      const newUser = {
        firstName,
        lastName,
        email: email.trim().toLowerCase(),
        password: password.trim(),
        phone: phone.trim(),
        address : {
          address,
          city,
          state
        }
      };
      console.log("🚀 ~ register ~ newUser:", newUser)
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

      const userExists = existingUsers.some(user => user.email === newUser.email);
      if (userExists) {
        toast.error("User already registered!", {
          position: "top-right",
          theme: "colored",
          autoClose: 1500,
        });
        return;
      }

      existingUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
      localStorage.setItem('userData', JSON.stringify(newUser));

      toast.success('Successfully Registered!', {
        position: "top-right",
        theme: "colored",
        autoClose: 1000,
        onClose: () => navigate('/login'), 

      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setAddress('');
      setCity('');
      setState('');
    } else {
      toast.error("Registration failed. Please check your information", {
        position: 'top-right',
        theme: 'colored',
        autoClose: 1500,
      });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex flex-col items-center p-6">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-18 h-20 mr-2" src={Logo} alt="Shopping logo" />
          </a>
          <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 mb-6">
            Shopping-IQ
          </h1>
          <h3 className="mb-10 text-1xl font-bold text-gray-800 dark:text-white">
            Shop the world from your home 🛍️
          </h3>

          <form className="w-full space-y-4" onSubmit={register}>
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className={`input ${errors.firstname && 'border-red-500'}`}
              />
              {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="fullname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your full name"
                className={`input ${errors.fullName && 'border-red-500'}`}
              />
              {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
            </div>

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

            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className={`input ${errors.address && 'border-red-500'}`}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className={`input ${errors.city && 'border-red-500'}`}
              />
              {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">State</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter your state"
                className={`input ${errors.state && 'border-red-500'}`}
              />
              {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
            </div>

            {/* Mobile phone */}
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile phone"
                className={`input ${errors.phone && 'border-red-500'}`}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Register
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer underline">Login</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
