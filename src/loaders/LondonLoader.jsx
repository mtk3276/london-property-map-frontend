import axiosInstance from "../api/axiosInstance";
import queryClient from "../api/queryClient";

const getLondonPropertyData = async () => {
    const cacheKey = "properties";
    
    const cachedData = queryClient.getQueryData(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for London properties");
        return cachedData
    } else {
        console.log("Fetching property data from database...")

        try {
            const response = await axiosInstance.get("/properties/london");
            console.log(`Fetched ${response.data.length} London properties.`);
            // Cache data
            queryClient.setQueryData(cacheKey, response.data);

            return response.data.slice(0,1000);
            // return response.data;
        } catch (error) {
            if (error.response && error.response.status === 500) {
                throw new Error("Internal Server Error");
            } else {
                throw new Error(error.message);
            }
        }
    }
}

const getUkRegionBoundaries = async () => {
    const cacheKey = "region-boundaries";

    const cachedData = queryClient.getQueryData(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for region boundaries");
        return cachedData;
    } else {
        console.log("Fetching England region boundaries data from database...")

        try {
            const response = await axiosInstance.get("/geojson/regions");
            console.log(`Fetched boundary data for ${response.data.length} regions.`);

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
}

const getLondonWardBoundaries = async () => {
    const cacheKey = "london-ward-boundaries";

    const cachedData = queryClient.getQueryData(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for London ward boundaries");
        return cachedData;
    } else {
        console.log("Fetching London ward boundaries data from database...")

        try {
            const response = await axiosInstance.get("/geojson/wards");
            console.log(`Fetched boundary data for ${response.data.length} London wards.`);

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
}

const getLondonLadBoundaries = async () => {
    const cacheKey = "london-lad-boundaries";

    const cachedData = queryClient.getQueryData(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for London local authority district boundaries");
        return cachedData;
    } else {
        console.log("Fetching London local authority district boundaries data from database...");

        try {
            const response = await axiosInstance.get("/geojson/local-authorities");
            console.log(`Fetched boundary data for ${response.data.length} London local authority districts.`);

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
}

export async function loader() {
    return {
        propertyData: await getLondonPropertyData(),
        regionBoundariesData: await getUkRegionBoundaries(),
        londonWardBoundariesData: await getLondonWardBoundaries(),
        londonLadBoundariesData: await getLondonLadBoundaries(),
    };
};