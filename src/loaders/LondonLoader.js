import axios from "axios";

const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
};

const axiosInstance = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
});

export async function loader() {
    try {
        const response = await axiosInstance.get("/properties/london");
        console.log(`Fetched ${response.data.length} London properties.`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            throw new Error("Internal Server Error");
        } else {
            throw new Error(error.message);
        }
    }
};