 //Products api
 export const products = async () => {
    const response = await fetch('https://fakestoreapi.com/products', { method: 'GET' });
    return await response.json();
}

//Products categories api
export const categories =  async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories', { method: 'GET' });
    return await response.json();
}
 
//User login api
export const loginuser = async () => {
  const response = await fetch('https://dummyjson.com/users');
  return await response.json();
};


// Add item to cart
export const addcartapi = async (productId, quantity = 1) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await res.json();

    cart.push({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: quantity
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};


// Remove item from cart
export const removeFromCartApi = (productId) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.productId !== productId); 
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Update quantity the quantity of specific product
export const updateCartQuantity = (productId, quantity) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];   
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Get all cart items
export const getCartItems = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

//Add payment order to localstorage
export const addtopayment = (orderData) => {
  let payments = JSON.parse(localStorage.getItem('payments')) || [];
  payments.push(orderData);
  localStorage.setItem('payments', JSON.stringify(payments));
}
