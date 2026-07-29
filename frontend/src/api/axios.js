import axios from "axios";

// Create an Axios instance with default configurations
// Adjust the baseURL as per your backend server's address
// withCredentials: true allows cookies to be sent with requests, which is necessary for session management
// why this is used? to make requests to backend server
// what is .create? it is used to create an instance of axios with default configurations, so that we don't have to specify them every time we make a request
//in simple words, it is used to create a reusable instance of axios with default configurations, so that we can easily make requests to our backend server without having to specify the baseURL and withCredentials every time.
//how it is used in the project? it is used in the AuthContext.jsx file to make requests to the backend server to get the authenticated user's data.
//syntax to use it: import api from '../api/axios'; api.get('/user/me').then(...).catch(...);
// how we would have used it without creating an instance? we would have to specify the baseURL and withCredentials every time we make a request, like this: axios.get('http://localhost:3000/api/user/me', { withCredentials: true }).then(...).catch(...);

const api=axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true,
})

export default api;