const axios = require("axios");
const axiosApiInstance = axios.create();




axiosApiInstance.interceptors.request.use(
    (config) => {
        
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);