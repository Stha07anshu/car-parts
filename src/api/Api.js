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