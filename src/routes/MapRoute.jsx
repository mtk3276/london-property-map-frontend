import MapComponent from "../components/MapComponent/MapComponent";
import { useLoaderData } from "react-router-dom";
import "./MapRoute.css";
import { useEffect, useState } from "react";
import { tranformGeojsonForLeaflet } from "../utils/geojsonDataTransform";

export default function MapPage() {
    const { 
        propertyData, 
        regionBoundariesData, 
        londonWardBoundariesData, 
        londonLadBoundariesData
    } = useLoaderData();
    const [regionsGeojson, setRegionsGeojson] = useState(null);
    const [wardsGeojson, setWardsGeojson] = useState(null);
    const [ladsGeojson, setLadsGeojson] = useState(null);


    console.log(regionBoundariesData)
    console.log(londonWardBoundariesData)
    console.log(londonLadBoundariesData)

    useEffect(() => {
        setRegionsGeojson(tranformGeojsonForLeaflet(regionBoundariesData));
        setWardsGeojson(tranformGeojsonForLeaflet(londonWardBoundariesData.wards));
        setLadsGeojson(tranformGeojsonForLeaflet(londonLadBoundariesData.authorities))
      }, []);

    return (
        <>
            {/* <h1>{regionBoundaryData.regionName}</h1> */}
            <div className="map__container">
                <MapComponent 
                    wardsGeojson={wardsGeojson} 
                    regionsGeojson={regionsGeojson} 
                    propertyData={propertyData} 
                    ladsGeojson={ladsGeojson}
                    wardBins={londonWardBoundariesData.bins}
                    ladBins={londonLadBoundariesData.bins}
                />
            </div>
        </>
    )
}