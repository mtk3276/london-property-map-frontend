import axios from "axios";

const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
};

const axiosInstance = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
});

export default axiosInstance;