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