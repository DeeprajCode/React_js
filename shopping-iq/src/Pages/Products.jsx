import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { getPosts } from '../Utils/api';
import Logo from '../assets/images/shopping-cart.png';

const Products = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPosts()
            .then(posts => setData(posts))
            .catch(err => {
                console.error('Error fetching posts:', err);
                setError('Failed to load products.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-3 p-6 sm:p-8 overflow-y-auto">
                    {loading && (
                        <div className="text-center text-gray-700 dark:text-gray-200">
                            Loading products...
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white dark:bg-black-1000 rounded-xl shadow hover:shadow-lg transition-shadow duration-600 flex flex-col overflow-hidden"
                                >
                                    <Link to={`/products/${item.id}`}>
                                        <div className="aspect-w-10 aspect-h-6">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-56 w-full object-contain bg-white"
                                            />
                                        </div>
                                    </Link>

                                    <div className="p-5 flex flex-col flex-1">
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                                            {item.title}
                                        </h2>

                                        <div className="mt-auto flex justify-between items-center">
                                            <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                                                ${item.price}
                                            </span>


                                            <div className="grid grid-cols-2 gap-2  content-start text-black-400 hover:text-black border border-black-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
                                                <svg class="fill-current " viewBox="0 0 24 25">
                                                    <path d="M12 .587l3.668 7.568 8.332 1.208-6.001 5.854 1.416 8.293L12 18.896l-7.415 3.894 1.416-8.293-6.001-5.854 8.332-1.208z" />
                                                </svg>
                                                {item.rating['rate']}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
