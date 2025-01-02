import axios from "axios";
const config = {
    headers : {
        'authorization' : `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
    }
}
const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    ...config
});
// creating authorization config
// const config = {
//     headers : {
//         'authorization' : `Bearer ${localStorage.getItem('token')}`
//     }
// }

// Creating test API
export const testApi = () => api.get('/test');

// Register user API
export const registerUserApi = (data) => api.post('/api/user/create', data);

// Login user API
export const loginUserApi = (data) => api.post('/api/user/login', data);

export const updateUser = (id, data) => api.put(`/api/user/update/${id}`, data, {
    headers: {
        "Content-Type": "application/json", // Set Content-Type for JSON
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
});


// create product create api
export const createProductApi = (data) => api.post('/api/product/create', data)

// fetch all products
export const getAllProducts = () => api.get('/api/product/get_all_products', config)

//fetch single product
export const getSingleProduct = (id) => api.get(`/api/product/get_single_product/${id}`, config)

// delete product (Task)
export const deleteProduct = (id) => api.delete(`/api/product/delete_product/${id}`)

// update product
export const updateProduct = (id, data) => api.put(`/api/product/update_product/${id}`, data, config)

export const searchProducts = (searchQuery) => api.get(`/api/product/search?q=${searchQuery}`, config);

// Create a new order
export const createOrder = (data) => api.post('/api/order/orders', data,{
    headers: {
        "Content-Type": "application/json", // Set Content-Type for JSON
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
});

// Get all orders for the logged-in user
export const getAllOrders = () => api.get('/api/order/get_all_orders', config);

// Get a single order by ID for the logged-in user
export const getSingleOrder = (id) => api.get(`/api/order/get_single_product/${id}`,{
    headers: {
        "Content-Type": "application/json", // Set Content-Type for JSON
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
});

// Update an order by ID
export const updateOrder = (id,data) => api.put(`/api/order/update_orders/${id}`, data, config);

// Delete an order by ID
export const deleteOrder = (id) => api.delete(`/api/order/delete_orders/${id}`);

// Create a new contact
export const createContact = (data) => api.post('/api/contact/contacts', data,{
    headers: {
        "Content-Type": "application/json", // Set Content-Type for JSON
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
});
export const getAllContacts = () => api.get('/api/contact/get_all_contacts', config);

// Create a new order (add a product to cart)
export const createCart = (data) => api.post('/api/cart/carts', data, {
    headers: {
      "Content-Type": "application/json", // Set Content-Type for JSON
      'authorization': `Bearer ${localStorage.getItem('token')}`, // Add token for authorization
    }
  });
  
  // Get all carts for the logged-in user (admin only)
  export const getAllCarts = () => api.get('/api/cart/get_all_carts', {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`, // Add token for authorization
    }
  });
  
  // Update a cart item (e.g., update quantity)
  export const updateCartItem = (cartId, updatedData) => api.put(`/api/cart/update_carts/${cartId}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  });
  // Delete a cart item (clear cart)
  export const deleteCartItem = (cartId) => api.delete(`/api/cart/delete_carts/${cartId}`, {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`, // Add token for authorization
    }
  });