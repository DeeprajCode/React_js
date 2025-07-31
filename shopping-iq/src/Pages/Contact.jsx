import React, { useState, useEffect } from 'react';
import { Phone, AtSign, MapPinHouse } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const fullNameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    } else if (!fullNameRegex.test(fullname)) {
      newErrors.fullname = 'Full name is not valid';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!message.trim()) {
      newErrors.message = 'Give your message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContact = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please check your form information!', {
        position: 'top-right',
        theme: 'colored',
        autoClose: 1500,
      });
      return;
    }

    toast.success('Successfully sent message', {
      position: 'top-right',
      theme: 'colored',
      closeOnClick: false,
      autoClose: 1000,
    });

    setFullName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900" id="contact">
      {initialLoading ? (

        <div class="flex-col gap-4 w-full flex items-center justify-center">
          <div
            class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
          >
            <div
              class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
            ></div>
          </div>
        </div>

      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center">
            <h2 className="text-4xl font-bold dark:text-gray-100">Contact</h2>
            <p className="pt-6 pb-6 text-base max-w-2xl text-center m-auto dark:text-gray-400">
              Want to contact us? Choose an option below and we’ll be happy to show you how we can transform your company’s web experience.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid md:grid-cols-2 gap-y-8 md:gap-x-8">
            <div>
              <h2 className="text-lg font-bold dark:text-gray-100">Contact Us</h2>
              <p className="max-w-sm mt-4 mb-4 dark:text-gray-400">
                Have something to say? We are here to help. Fill up the form or send an email or call.
              </p>
              <div className="mb-4 flex items-center mt-8 space-x-2 text-dark-600 dark:text-gray-400">
                <MapPinHouse />
                <span>14th Avenue, Glory Road</span>
              </div>
              <div className="mb-4 flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <AtSign />
                <span>
                  <a href="mailto:privacy.grievance@shoppingig.com">privacy.grievance@shoppingig.com</a>
                </span>
              </div>
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <Phone />
                <a href="tel:11111111111">+51 11111111111</a>
              </div>
            </div>

            <div>
              <form onSubmit={handleContact}>
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.fullname
                        ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      } text-gray-900`}
                  />
                  {errors.fullname && <p className="mt-1 text-red-600 text-sm">{errors.fullname}</p>}
                </div>

                <div className="mb-5">
                  <input
                    type="email"
                    placeholder="Email Address"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.email
                        ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      } text-gray-900`}
                  />
                  {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-3">
                  <textarea
                    placeholder="Your Message"
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.message
                        ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      } text-gray-900`}
                  />
                  {errors.message && <p className="mt-1 text-red-600 text-sm">{errors.message}</p>}
                </div>

                <button type='submit'
                  class="w-full relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-blue-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[blue] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  Send Message
                </button>



              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Contact;
