import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import PropertyMarkers from "../PropertyMarkers/PropertyMarkers";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet's CSS is loaded

export default function MapComponent({ 
        propertyData, 
        regionsGeojson, 
        wardsGeojson,
        ladsGeojson,
        wardBins,
        ladBins }) {
    const [zoomLevel, setZoomLevel] = useState(10);
    const [showZoomMessage, setShowZoomMessage] = useState(true);
    const mapRef = useRef();

    const ZoomListener = () => {
        const map = useMap();

        useEffect(() => {
            const handleZoom = () => {
              const currentZoom = map.getZoom();
              setZoomLevel(currentZoom);
              
              // Close the zoom message when user zooms in beyond level 12
              if (currentZoom > 12) {
                setShowZoomMessage(false);
              }
            };
      
            map.on("zoomend", handleZoom);
            handleZoom(); // Initialize zoom level on mount
      
            return () => {
              map.off("zoomend", handleZoom);
            };
        }, [map]);
    
        return null; // This component doesn't render anything
    }

    const regionStyle = (feature) => ({
        fillColor: getRegionColor(feature.properties.name),
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0,
    });
    
      // Function to determine color for each region (customize as needed)
      const getRegionColor = (regionName) => {
        switch (regionName) {
          case 'London': return '#800026';
          case 'North East': return '#BD0026';
          case 'North West': return '#E31A1C';
          case 'Yorkshire and The Humber': return '#FC4E2A';
          case 'East Midlands': return '#FD8D3C';
          case 'West Midlands': return '#FEB24C';
          case 'East of England': return '#FED976';
          case 'South East': return '#FFEDA0';
          case 'South West': return '#FFFFCC';
          default: return '#FFFFFF';
        }
    };

    // For map chloropleth (local auths and wards only)
    // Updated color scale: deep blues and purples
    const colorScale = [
        "#172fa9", // deep blue
        "#2755d7", // cobalt (matches --cobalt)
        "#3a3fc1",
        "#4b2fa6",
        "#6a1ca3",
        "#8a1fa7",
        "#a12fa9",
        "#b84fcf",
        "#c77fd7",
        "#e0b3f7"  // light purple
    ];    
    const colorScale2 = [
        '#800026',
        '#BD0026',
        '#E31A1C', 
        '#FC4E2A', 
        '#FD8D3C', 
        '#FEB24C', 
        '#FED976', 
        '#FFEDA0'
    ];    
    
    // Function to get the color based on the price_bin
    const getColor = (bin) => {
        return colorScale[bin - 1] || "#cccccc"; // Default color for bins outside the range
    };

    // Helper to format price for legend
    const formatPrice = (value) => {
        if (value >= 1_000_000) return `£${(value/1_000_000).toFixed(1)}M`;
        if (value >= 1000) return `£${Math.round(value/1000)}K`;
        return `£${Math.round(value)}`;
    };

    // Zoom message component
    function ZoomMessage() {
        if (!showZoomMessage) return null;

        return (
            <div style={{
                position: 'absolute',
                top: '32px',
                left: '32px',
                background: '#ffffffcc',
                borderRadius: '16px',
                boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)',
                padding: '18px 24px',
                zIndex: 1000,
                fontFamily: 'Allerta',
                fontSize: '1.1rem',
                backgroundColor: '#2755d7',
                opacity: 0.8,
                color: '#ffffff',
                border: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '200px'
            }}>
                <span style={{color: '#ffffff', fontWeight: 500}}>
                    Zoom in to view ward averages
                </span>
                <button
                    onClick={() => setShowZoomMessage(false)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        color: '#ffffff',
                        marginLeft: '12px',
                        padding: '0',
                        lineHeight: '1',
                        fontWeight: 'bold'
                    }}
                    aria-label="Close message"
                >
                    ×
                </button>
            </div>
        );
    }

    // Legend component
    function MapLegend() {
        // Determine which bins to use based on zoom level
        let currentBins = null;
        if (zoomLevel > 12 && wardBins) {
            currentBins = wardBins;
        } else if (zoomLevel > 9 && zoomLevel <= 12 && ladBins) {
            currentBins = ladBins;
        }

        // Don't render legend if no bins available
        if (!currentBins || currentBins.length === 0) return null;

        // Sort bins by price_bin to ensure correct order
        const sortedBins = [...currentBins].sort((a, b) => a.price_bin - b.price_bin);

        return (
            <div style={{
                position: 'absolute',
                bottom: '32px',
                left: '32px',
                background: '#ffffffcc',
                borderRadius: '16px',
                boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)',
                padding: '18px 24px',
                zIndex: 1000,
                fontFamily: 'Allerta',
                fontSize: '1.1rem',
                color: '#172fa9',
                border: '1px solid #e0e0e0',
            }}>
                <div style={{fontWeight: 700, marginBottom: 8, color: '#2755d7'}}>Average Price Paid</div>
                {sortedBins.map((bin, i) => (
                    <div key={bin.price_bin} style={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
                        <span style={{
                            display: 'inline-block',
                            width: 24,
                            height: 16,
                            background: colorScale[bin.price_bin - 1] || '#cccccc',
                            borderRadius: 4,
                            marginRight: 10,
                            border: '1px solid #b8b8b8',
                        }}></span>
                        <span style={{color: '#222'}}>
                            {formatPrice(bin.bin_min)} – {formatPrice(bin.bin_max)}
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <MapContainer
                center={[51.5074, -0.1278]} // Latitude and longitude for London
                zoom={zoomLevel}                   // Set an appropriate zoom level
                minZoom={10}                        // Set minimum zoom level
                style={{ height: "100%", width: "100%" }} // Full viewport height
            >
                <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.carto.com/attributions">CartoDB</a> contributors'
                />
                <ZoomListener />
                {/* Render region boundaries as GeoJSON layer */}
                {zoomLevel<10 && regionsGeojson && (
                    <GeoJSON data={regionsGeojson} style={regionStyle} onEachFeature={(feature, layer) => {
                        const name = feature.properties.name;
                        const price_paid = feature.properties.price_paid ?
                            `£${feature.properties.price_paid}` :
                            "No data";
                        layer.bindPopup(`<strong>${name}</strong>`);
                }} />
                )}
                {zoomLevel>12 && wardsGeojson && (
                    <>
                    <GeoJSON
                        data={ladsGeojson}
                        style={{
                            fillOpacity:0, weight: 4, opacity: 1, color: 'black', dashArray: '0',
                        }} 
                    />
                    <GeoJSON 
                        data={wardsGeojson} 
                        style={(feature) => ({
                            fillOpacity:0.7, weight: 1, opacity: 1, color: 'black', dashArray: '0', fillColor: getColor(feature.properties.bin),
                        })} 
                        onEachFeature={(feature, layer) => {
                            const name = feature.properties.name;
                            const price_paid = feature.properties.price_paid ?
                                `£${feature.properties.price_paid}` :
                                "No data";
                            const num_properties = feature.properties.num_properties;
                            const transactionInfo = num_properties !== undefined ? 
                                `<br>Based on ${num_properties} transactions` : '';
                            layer.bindPopup(`<strong>${name}</strong><br>Average Price Paid: ${price_paid}${transactionInfo}`);}} 
                    />
                    </>
                )}
                {zoomLevel>9 &&  zoomLevel<13 && ladsGeojson && (
                    <GeoJSON 
                        data={ladsGeojson}
                        style={(feature) => ({
                            fillOpacity:0.7, weight: 1, opacity: 1, color: 'black', dashArray: '0', fillColor: getColor(feature.properties.bin),
                        })} 
                        onEachFeature={(feature, layer) => {
                            const name = feature.properties.name;
                            const price_paid = feature.properties.price_paid ?
                                `£${feature.properties.price_paid}` :
                                "No data";
                            const num_properties = feature.properties.num_properties;
                            const transactionInfo = num_properties !== undefined ? 
                                `<br>Based on ${num_properties} transactions` : '';
                            layer.bindPopup(`<strong>${name}</strong><br>Average Price Paid: ${price_paid}${transactionInfo}`);
                        }} 
                    />
                )}
            </MapContainer>
            <ZoomMessage />
            <MapLegend />
        </div>
    );
}
