'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '../public/images/laptop.png';
import { Home, Info, Phone, ShoppingBag } from 'lucide-react';


const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { label: 'Home', route: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'About us', route: '/Aboutus', icon: <Info className="w-5 h-5" /> },
    { label: 'Contact', route: '/Contact', icon: <Phone className="w-5 h-5" /> },
    { label: 'Products', route: '/Products', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  return (
    <aside className="dark:border-gray-700 shadow-xl rounded-2xl px-8 py-8 w-66 min-h-screen transition-all duration-300">

      <div className="mb-[15%] flex items-center">
        <Image
          src={Logo}
          width={70}
          height={70}
          alt="The logo of the Sopping-IQ"
          className='drop-shadow-xl rounded-full'
        />
        <span className="text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400">
          Shopping-IQ
        </span>
      </div>

      <nav className="mt-8">
        <ul className="space-y-4 px-2">
          {menuItems.map(({ label, route, icon }) => (
            <li key={label}>
              <button
                onClick={() => route && router.push(route)}
                className="flex items-center gap-3 w-full text-left px-6 py-3 hover:text-indigo-700 font-bold text-gray-900 dark:text-white bg-gradient-to-r from-white via-gray-100 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-xl shadow hover:bg-blue-900 hover:dark:bg-indigo-00 transition-all duration-300 transform hover:scale-105 shadow transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/100 transition-shadow duration-500  hover:shadow-lg transition-shadow duration-300 hover:scale-105 transition duration-500 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow duration-600 ">
                {icon}
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;