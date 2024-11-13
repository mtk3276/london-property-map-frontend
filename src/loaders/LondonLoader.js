import axiosInstance from "../api/axiosInstance";
import queryClient from "../api/queryClient";

export async function loader() {
    const cacheKey = "properties";

    const cachedData = queryClient.getQueryData(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for London properties");
        return cachedData
    } else {
        console.log("Fetching data from database...")

        try {
            const response = await axiosInstance.get("/properties/london");
            console.log(`Fetched ${response.data.length} London properties.`);

            // Cache data
            queryClient.setQueryData(cacheKey, response.data);

            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 500) {
                throw new Error("Internal Server Error");
            } else {
                throw new Error(error.message);
            }
        }
    }
};