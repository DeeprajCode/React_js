import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts } from '../Utils/api';
import { addToCartApi } from '../Utils/api'
import { CircleDollarSign } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const posts = await getPosts();
        const found = posts.find(p => p.id === parseInt(id));
        setProduct(found);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCartApi(product.id, 1);
      toast.success("Product added to cart successfully!", {
        position: "top-right",
        theme: "colored",
        closeOnClick : false,
        autoClose: 1000,
      } );
      navigate('/Cart');
    } catch {
      toast.error("Error adding product to cart.", {
        position : "top-right",
        theme : "colored",
        autoClose: 1000,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center p-10">
        <svg
          className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="status"
          aria-label="Loading"
        >
          <path d="M100 50.59c0 27.61-22.39 50-50 50s-50-22.39-50-50 22.39-50 50-50 50 22.39 50 50Z" fill="currentColor"/>
          <path d="M93.97 39.04c2.43-.64 3.9-3.13 3.05-5.49a48.12 48.12 0 0 0-13.5-21.26..." fill="#1C64F2" />
        </svg>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center p-10 text-red-500">Product not found.</div>;
  }

  const discount = (product.price * 0.1).toFixed(2);
  const finalPrice = (product.price - discount).toFixed(2);

  return (
    <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-contain p-4"
        />
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white line-through flex gap-1">
              <CircleDollarSign/>{product.price}
            </p>
            <p className="text-xl font-bold text-green-600 flex gap-1">
              Discount: <CircleDollarSign/>{finalPrice} (10% off)
            </p>
            <p className="text-md bg-yellow-100 my-2 pl-1 mr-2 font-medium text-yellow-500 text-yellow-800 w-15 w-28 ">
              Rating: ⭐ {product.rating?.rate}
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 18 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 12a1 1 0 0 0 .96-.73l2-7A1 1 0 0 0 17 3H4L3.17.75A1 1 0 0 0 2 0H1a1 1 0 0 0 0 2h1.17l3.6 12.59a1 1 0 0 0 .96.71H15ZM6.16 15a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm8 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z" />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={() => navigate('/Products')}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
            >
              Back To Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
