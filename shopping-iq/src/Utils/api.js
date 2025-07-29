 //Products api
 export const getPosts = async () => {
    const response = await fetch('https://fakestoreapi.com/products', { method: 'GET' });
    return await response.json();
}

//Products categories api
export const categories =  async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories', { method: 'GET' });
    return await response.json();
}
 
//User login api
export const fetchuser = async () => {
  const response = await fetch('https://dummyjson.com/users');
  return await response.json();
};

//UserCart api
export const addToCartApi = async (productId, quantity) => {
  const response = await fetch('https://fakestoreapi.com/carts', {
    method: 'POST',
    body: JSON.stringify({
      userId: 1,
      date: new Date().toISOString(),
      products: [{ productId, quantity }]
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
};
