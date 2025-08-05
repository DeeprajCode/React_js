import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../Utils/api';
import { addcartapi } from '../../Utils/api'
import { CircleDollarSign } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const posts = await products();
        const found = posts.find(p => p.id === parseInt(id));
        setProduct(found);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchproduct();
  }, [id]);

  const addcart = async () => {
    if (!product) return;
    try {
      await addcartapi(product.id, 1);
      toast.success("Product added to cart successfully!", {
        position: "top-right",
        theme: "colored",
        closeOnClick: false,
        autoClose: 1000,
      });
      navigate('/Cart');
    } catch {
      toast.error("Error adding product to cart.", {
        position: "top-right",
        theme: "colored",
        autoClose: 1000,
      });
    }
  };

  if (loading) {
    return (
      <div class="flex-col gap-4 w-full flex items-center justify-center">
        <div
          class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
        >
          <div
            class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
          ></div>
        </div>
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
      <button onClick={() => navigate('/Products')}
        class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
        type="button"
      >
        <div
          class="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
        >
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
        <p class="translate-x-2">Go Back</p>
      </button>

      {loading ? (
        <div className="flex-col gap-3 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl  mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-green flex flex-col md:flex-row">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-96 object-contain p-4"
          />
          <div className="flex-1 shadow-indigo-500/50 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white line-through flex gap-1">
                <CircleDollarSign />{product.price}
              </p>
              <p className="text-xl font-bold text-green-600 flex gap-1">
                Discount Price: <CircleDollarSign />{finalPrice} (10% off)
              </p>
              <p className="text-md bg-yellow-100 my-2 pl-1 mr-2 font-medium text-yellow-500 text-yellow-800 w-15 w-28 ">
                Rating: ⭐ {product.rating?.rate}
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <button onClick={addcart}
                class="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
              >
                Add to cart
                <span
                  class="absolute w-40 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
                ></span>
                <span
                  class="absolute w-40 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
                ></span>
                <span
                  class="absolute w-40 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
                ></span>
                <span
                  class=" group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-3 z-10"
                >Add to cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
