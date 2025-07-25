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
    const response = await fetch('https://dummyjson.com/users', {method: 'GET'});
    return await response.json();
}