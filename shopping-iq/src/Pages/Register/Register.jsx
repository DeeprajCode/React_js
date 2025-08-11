import React, { useEffect, useState } from 'react';
import Logo from '../Register/laptop.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingBag } from "react-icons/fa";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    <>
    <ToastContainer/>
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      {loading ? (
        <div class="flex-col gap-4 w-full flex items-center justify-center">
            <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
              <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
            </div>
          </div>
      ) : (
        <>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
            <div className="flex flex-col items-center p-6">
              <img className="w-18 h-20 mr-2" src={Logo} alt="Shopping logo" />
              <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 mb-6">
                Shopping-IQ
              </h1>
              <h3 className="mb-10 text-1xl flex font-bold text-gray-800 dark:text-white">
                Shop the world from your home. <FaShoppingBag className="ml-2 mt-1" />
              </h3>

            <form className="w-full space-y-4" onSubmit={register}>
              <div>
                <input
                  type="text"
                  id="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name..."
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.firstName
                      ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      } text-gray-900`}
                />
                {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <input
                  type="text"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name..."
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.lastName 
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  } text-gray-900`}
                />
                {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
              </div>

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

              <div>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address..."
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:text-white ${errors.address
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  }`}
                />
                {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
              </div>

              <div>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City..."
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:text-white ${errors.city
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  }`}
                />
                {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
              </div>

              <div>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State..."
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:text-white ${errors.state
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  }`}
                />
                {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile number..."
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:text-white ${errors.phone
                    ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  }`}
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>

              <button type='submit' className='w-full cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 rounded-xl border-[1px] border-none text-white font-medium group'>
                <div className='relative overflow-hidden'>
                  <p className='group-hover:-translate-y-7 duration-[1.125s] ease-[cubin-bezier(0.19,1,0.22,1)]'>
                    Register
                  </p>
                  <p className='absolute top-7 left-[41%] group-hover:top-0 duration-[1.25s] ease-[cubic-bezier(0.19,1,0.22,1)]'>
                    Register
                  </p>
                </div>
              </button>

              <p className="text-sm text-red-500 dark:text-gray-400">
                Already have an account?{'  '}
                <span onClick={() => navigate("/login")} className="text-blue-700 cursor-pointer underline">Login</span>
              </p>
            </form>
          </div>
        </div>
        </>
      )}
    </section>
    </>
  );
};

export default Register;
