import axios from 'axios';
import baseURL from "../utils/apiPaths";
const BASE_URL = "http://localhost:5000";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
    
//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }  
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handle common error globally
        if (error.response) { 
            if (error.response.status === 500) {
                console.error(' Server Error. please try again');
            } 
        } else if(error.code === 'ECONNABORTED') {
            console.error('Request timeout. Please try again.');
        } return Promise.reject(error);
    }
);

export default axiosInstance;