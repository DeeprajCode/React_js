import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = () => {
  const [loading, setLoading] = useState(true);

  const [cardName, setCardName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cardDate, setCardDate] = useState();
  const [cardCvv, setCardCvv] = useState();
  const [errors, setErrors] = useState({});

  const cardNameRegex = /^[a-zA-Z\s]+$/;
  const cardNumberRegex = /^[\+]?[0-16]{0,4}\W?[(]?[0-16]{4}[)]?[-\s\.]?[0-16]{4}[-\s\.]?[0-16]{4,8}$/;
  const cardCvvRegex = /^[\+]?[0-3]{0,3}\W?[(]?[0-3]{3}[)]?[-\s\.]?[0-3]{3}[-\s\.]?[0-3]{1,3}$/;
  const cardDateRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [])

  const validate = () => {
    const newError = {};

    if(!cardName.trim()){
      newError='Credit card name is required!';
    }else if(!cardNameRegex.test(cardName)){
      newError='Please enter a valid credit card name!';
    }

    if(!cardNumber.trim()){
      newError='Credit card number is required!';
    } else if(!cardNumber <=16) {
      newError = 'You can not enter a credit card number less than 16!';
    } else if(!cardNumber >=16) {
      newError = 'You can not enter a credit card number greater than 16!';
    }else if(!cardNumberRegex.test(cardNumber)){
      newError = 'Please enter a valid credit card number!';
    }

    if(!cardDate.trim()){
      newError = 'Please enter a expiry date of credit card!'
    }else if(!cardDateRegex.test(cardDate)) {
      newError = 'please enter a valid expiry date of credit card!'
    }

    if(!cardCvv.trim()){
      newError = 'Credit card cvv is required!';
    } else if(!cardCvv <=3) {
      newError = 'Enter a credit card cvv number altleast 3!';
    } else if(!cardCvv >=3) {
      newError = 'You can not enter a credit card cvv number greter than 3'
    } else if(!cardCvvRegex.test(cardCvv)){
      newError = 'Please enter a valid credit card number!';
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  }

  const card = async(e) => {
    e.preventDefault();

    if(!validate()){
      toast.error('please check and enter your valid credit card information',{
        theme: 'colored',
        autoClose : 1500,
        closeOnClick : false,
      })
      return;
    } else {
      toast.success('Your payment is succeffully, thank you for shopping', {
        theme: 'colored',
        autoClose: 1500,
        closeOnClick: false,
      })
    }

    setCardName('');
    setCardCvv('');
    setCardNumber('');
    setCardDate('');
  }
  return (
    <>
      {loading && (
        <div class="flex-col gap-4 w-full flex items-center justify-center">
          <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      )}
      <>
        <div className="flex flex-col justify-around bg-gray-800 p-4 border border-white border-opacity-30 rounded-lg shadow-md max-w-xs mx-auto">
          <form onSubmit={card}>
            <div className="flex flex-row items-center justify-between mb-3">
              <input 
                type="text" 
                name="cardName" 
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gary-700 dark:text-white ${errors.cardName 
                ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                } text-gray-900`}
                placeholder="Card holder name...." />
              {errors.cardName && <p className="mt-1 text-red-600 text-sm">{errors.cardName}</p>}

              <div className="flex items-center justify-center relative w-14 h-9 bg-gray-800 border border-white border-opacity-20 rounded-md">
                <svg className="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48">
                  <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                  <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                  <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
                </svg>
              </div>
            </div>

          <div className="flex flex-col space-y-3">
            <input
              className={`bg-gary-50 border rounded-lg block w-full p-2.5 dark:bg-gary-700 dark:text-white ${errors.cardNumber
                ? 'border-red-500 dark:border-red-500 focus:ring-500 focus:border-red-500'
                : 'border-gary-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                } text-gray-900`}
              type="text"
              name="cardNumber" 
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000" />
            {errors.cardNumber && <p className='mt-1 text-red-600 text-sm'>{errors.cardNumber}</p>}

            <div className="flex flex-row justify-between">
              <input 
                className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.cardDate
                  ? 'border-red-500 dark:border-red-500 focus:ring-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  } text-gray-900`} 
                type="text" 
                value={cardDate}
                onChange={(e) => setCardDate(e.target.value)}
                name="expiryDate" 
                id="expiryDate" 
                placeholder="MM/AA" />
              {errors.cardDate && <p className='mt-1 text-red-600 yexy-sm'>{errors.cardDate}</p>}

              <input 
                className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${errors.cardCvv
                  ? 'border-red-500 dark:border-red-500 focus:ring-500 focus:red-500'
                : 'border-gray-300 focus:ring-blue-600 focus:border-blue-600 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                } text-gray-900`}
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)} 
              type="text" 
              name="cardCvv" 
              id="cardCvv" 
              placeholder="CVV" />
            </div>
          </div>
        </form>

        <div>
            <button className='inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-[#7747FF] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 
              text-gray-50 font-bold leading-loose transition duration-200'>
              Submit
            </button>
        </div>
      </div>
      </>
    </>
  );
}

export default Card;
