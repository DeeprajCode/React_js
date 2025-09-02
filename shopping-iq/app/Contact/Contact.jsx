import React, { useState, useEffect } from 'react';
import { Phone, AtSign, MapPinHouse, Instagram, Facebook, Linkedin, Chrome } from 'lucide-react';
import { BsTwitterX } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { FcBusinessContact } from "react-icons/fc";


const Contact = () => {
  const navigate = useNavigate();

  const [loading, setloading] = useState(true);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const fullNameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;


  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {

    const newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = 'Full name is required!';
    } else if (!fullNameRegex.test(fullname)) {
      newErrors.fullname = 'Please enter a valid full name!';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required!';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'please enter a valid email address!';
    }

    if(!phone.trim()){
      newErrors.phone = 'Phone number is required!';
    } else if(!phoneRegex.test(phone)){
      newErrors.phone = 'Please enter a valid phone number!';
    }

    if (!message.trim()) {
      newErrors.message = 'Give your message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const contect = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please check and enter your form information!', {
        position: 'top-right',
        theme: 'colored',
        autoClose: 1000,
      });
      return;
    } else {
      toast.success('Thank you for give us your message', {
        position : 'top-right',
        theme: 'colored',
        closeOnClick: false,
        autoClose:1000,
      });
    }

    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900" id="contact">
        { loading ? (
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
              <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
            </div>
          </div>
      ) : (
        <>
          <div className='my-2'>
            <button onClick={() => navigate('/')} className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group" type="button" >
              <div className="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
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
              <p className="translate-x-2">Go Back</p>
            </button>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center">
            <h2 className="text-4xl font-bold dark:text-gray-100 flex justify-center gap-1">Contact <FcBusinessContact className='mt-1' /> </h2>
            <p className="pt-6 pb-6 text-base max-w-2xl text-center m-auto dark:text-gray-400">
              Your happiness is our success. We're here to help you, every step of the way. Our service sets us apart from the rest.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 pt-8 pb-16 grid md:grid-cols-2 gap-y-8 md:gap-x-8">
            <div>
              <h2 className="text-lg font-bold dark:text-gray-100">Contact Us</h2>
              <p className="max-w-sm mt-4 mb-4 dark:text-gray-400">
                Have something to say? We are here to help. Fill up the form or send an email or call.
              </p>
              <div className="mb-4 flex items-center mt-8 space-x-2 text-dark-600 dark:text-gray-400"> 
                  <button className="flex focus:outline-none transform transition-transform duration-300 hover:scale-125 hover:text-blue-500">
                    <MapPinHouse/>
                  </button>
                  <span className='gap-1'>
                   : 14th Avenue, Glory Road
                  </span>
              </div>
              <div className="mb-4 flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <button className='flex focus:outline-none transform transition-transform duration-300 hover:scale-125 hover:text-blue-500'>
                  <AtSign />
                </button>
                <span className='gap-1'>
                  : privacy.grievance@shoppingiq.com
                </span>
              </div>
              <div className="flex mb-10 items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <button className='focus:outline-none transform transition-transform duration-300 hover:scale-125 hover:text-blue-500'>
                  <Phone />
                </button>
                <span className='gap-1'>
                  : +91-8141396867
                </span>
              </div>

              <div className='flex item-center  gap-6' >
                <div className="group relative inline-block mb-8">
                  <button className="focus:outline-none bi bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-red-700">
                    <Instagram className='mt-2'/>
                  </button>
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-black rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                    Instagram
                  </span>
                </div>

                <div className="group relative inline-block ">
                  <button className="focus:outline-none bi bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-red-700">
                    <BsTwitterX className='h-10 w-6 '/>
                  </button>
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-black rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                    Twitter
                  </span>
                </div>

                <div className="group relative inline-block mb-8">
                  <button className="focus:outline-none bi bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-red-700">
                    <Facebook className='mt-2'/>
                  </button>
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-black rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                    Facebook
                  </span>
                </div>

                <div className="group relative inline-block mb-8">
                  <button className="focus:outline-none bi bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-red-700">
                    <Linkedin className='mt-2'/>
                  </button>
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-black rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                    Linkedin
                  </span>
                </div>

                <div className="group relative inline-block mb-8 h-10 w-10">
                  <button className="focus:outline-none bi bi-instagram transform transition-transform duration-300 hover:scale-125 hover:text-red-700">
                    <Chrome className='mt-2'/>
                  </button>
                  <span className="absolute -bottom-10 left-1/3 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-black rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                    Google
                  </span>
                </div>
              </div>
            </div>
            
            <div className='py-3 border-l-4 border-blue-600 rounded-xl'>
              <form onSubmit={contect}>
                <div className="mb-5 ml-5">
                  <input
                    type="text"
                    placeholder="Full name..."
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`bg-gray-50 placeholder-gray-500 border-2 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.fullname
                      ? 'border-red-500 placeholder-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      } text-gray-900`}
                  />
                  {errors.fullname && <p className="mt-1 text-red-600 text-sm">{errors.fullname}</p>}
                </div>

                <div className="mb-3 ml-5">
                  <input
                    type="email"
                    placeholder="Email..."
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-gray-50 placeholder-gray-500 border-2 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.email
                      ? 'border-red-500 placeholder-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      } text-gray-900`}
                  />
                  {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
                </div>

                <div className='mb-5 ml-5'>
                  <input 
                    type="tel"
                    placeholder='Phone number...'
                    id='phone'
                    name='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`bg-gray-50 placeholder-gray-500 border-2 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.phone 
                      ? 'border-red-500 placeholder-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                      } text-gary-900 `}
                    />
                  {errors.phone && <p className='mt-1 text-red-600 text-sm'>{errors.phone}</p>}
                </div>

                <div className="mb-3 ml-5">
                  <textarea
                    placeholder="Give your message..."
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`bg-gray-50 border-2 placeholder-gray-500 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.message
                      ? 'border-red-500 placeholder-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      } text-gray-900`}
                  />
                  {errors.message && <p className="mt-1 text-red-600 text-sm">{errors.message}</p>}
                </div>

                <button type='submit' className="w-[96%] ml-5 cursor-pointer bg-gradient-to-b from-blue-700 to-blue-700 px-6 py-3 rounded-xl border-[1px] border-none text-white font-medium group">
                  <div className="relative overflow-hidden flex justify-center">
                    <p className="group-hover:-translate-y-7 gap-1 flex duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      <FiSend className='mt-1' />  Send message
                    </p>
                    <p className="absolute top-7 group-hover:top-0 gap-1 flex duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]" >
                      <FiSend className='mt-1' /> Send message
                    </p>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Contact;