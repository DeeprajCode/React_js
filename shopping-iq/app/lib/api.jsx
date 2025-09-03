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
  let cart = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('cart') : null) || [];
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
  let cart = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('cart') : null) || [];
  cart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Update quantity item from cart
export const updateCartQuantity = (productId, quantity) => {
  let cart = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('cart') : null) || [];   
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Get all cart items
export const getCartItems = () => {
  return JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('cart') : null) || [];
};

//Add payment order to localstorage
export const addtopayment = (orderData) => {
  let payments = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('payments') : null) || [];
  payments.push(orderData);
  localStorage.setItem('payments', JSON.stringify(payments));
}