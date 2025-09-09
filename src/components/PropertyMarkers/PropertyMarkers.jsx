import { Marker, Popup } from "react-leaflet"

export default function PropertyMarkers({ propertyData, zoomLevel }) {
    return (
        <>
        {zoomLevel > 17 && propertyData && propertyData.map(property => (
            // Assuming property has lat, lng properties
            <Marker position={[property.latitude, property.longitude]} key={property.id}>
            <Popup>
                <span>£{property.price_paid}</span>
            </Popup>
            </Marker>
        ))}
        </>
    )
}