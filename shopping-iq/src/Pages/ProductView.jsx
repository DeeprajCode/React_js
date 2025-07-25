import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../Utils/api';
import Logo from '../assets/images/shopping-cart.png';

const ProductView = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getPosts()
      .then(posts => {
        const foundProduct = posts.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      setCart(prev => [...prev, product]);
    }
  };

  //   const handleRemoveFromCart = () => {
  //     setCart(prev => prev.filter(item => item.id !== product.id));
  //   };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!product) return <div className="text-center p-10 text-red-500">Product not found</div>;

  return (
    <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col md:flex-row">
        <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-96 object-contain p-4" />

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
            <p className="text-xl font-semibold">${product.price}</p>
          </div>

          <div className="mt-6 flex gap-4">
            <button onClick={handleAddToCart} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              Buy now
            </button>


            <button
              onClick={() => navigate('/Products')}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
            >
              Back To Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
