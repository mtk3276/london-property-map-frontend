import MapComponent from "../components/MapComponent/MapComponent";
import MapLoading from "../components/MapLoading/MapLoading";
import "./MapRoute.css";
import { useEffect, useState } from "react";
import { tranformGeojsonForLeaflet } from "../utils/geojsonDataTransform";
import axiosInstance from "../api/axiosInstance";
import queryClient from "../api/queryClient";

// Move loader functions to be used as async functions
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

export default function MapPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [propertyData, setPropertyData] = useState(null);
    const [regionBoundariesData, setRegionBoundariesData] = useState(null);
    const [londonWardBoundariesData, setLondonWardBoundariesData] = useState(null);
    const [londonLadBoundariesData, setLondonLadBoundariesData] = useState(null);
    
    const [regionsGeojson, setRegionsGeojson] = useState(null);
    const [wardsGeojson, setWardsGeojson] = useState(null);
    const [ladsGeojson, setLadsGeojson] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch all data in parallel
                const [
                    properties,
                    regionBoundaries,
                    wardBoundaries,
                    ladBoundaries
                ] = await Promise.all([
                    getLondonPropertyData(),
                    getUkRegionBoundaries(),
                    getLondonWardBoundaries(),
                    getLondonLadBoundaries()
                ]);

                setPropertyData(properties);
                setRegionBoundariesData(regionBoundaries);
                setLondonWardBoundariesData(wardBoundaries);
                setLondonLadBoundariesData(ladBoundaries);

                // Transform geojson data
                setRegionsGeojson(tranformGeojsonForLeaflet(regionBoundaries));
                setWardsGeojson(tranformGeojsonForLeaflet(wardBoundaries.wards));
                setLadsGeojson(tranformGeojsonForLeaflet(ladBoundaries.authorities));

                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching map data:", err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (isLoading) {
        return (
            <div className="map__container">
                <MapLoading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="map__container">
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh',
                    flexDirection: 'column',
                    fontFamily: 'Allerta'
                }}>
                    <h2 style={{ color: '#e31a1c' }}>Error Loading Map Data</h2>
                    <p style={{ color: '#666' }}>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#2755d7',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            marginTop: '16px'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="map__container">
                <MapComponent 
                    wardsGeojson={wardsGeojson} 
                    regionsGeojson={regionsGeojson} 
                    propertyData={propertyData} 
                    ladsGeojson={ladsGeojson}
                    wardBins={londonWardBoundariesData?.bins}
                    ladBins={londonLadBoundariesData?.bins}
                />
            </div>
        </>
    )
}