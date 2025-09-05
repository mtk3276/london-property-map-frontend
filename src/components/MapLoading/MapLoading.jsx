import "./MapLoading.css";

// const houseColor = "#2755d7";
const houseColor = "#00000085";

const HouseIcon = () => (
    <svg 
        width="60" 
        height="60" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="house-icon"
    >
        {/* House roof */}
        <path 
            d="M50 15 L85 45 L15 45 Z" 
            fill={houseColor} 
            stroke={houseColor} 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* House body */}
        <rect 
            x="25" 
            y="45" 
            width="50" 
            height="40" 
            fill="#ffffff" 
            stroke={houseColor} 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Door */}
        <rect 
            x="40" 
            y="60" 
            width="12" 
            height="25" 
            fill={houseColor}
        />
        {/* Window */}
        {/* <rect 
            x="55" 
            y="55" 
            width="15" 
            height="12" 
            fill="#172fa9"
        /> */}
        {/* Door knob */}
        <circle 
            cx="49" 
            cy="72" 
            r="1.5" 
            fill="#ffffff"
        />
    </svg>
);

export default function MapLoading() {
    return (
        <div className="map-loading">
            <div className="map-loading__container">
                <div className="house-carousel">
                    <div className="house-card house-card--1">
                        <HouseIcon />
                    </div>
                    <div className="house-card house-card--2">
                        <HouseIcon />
                    </div>
                    <div className="house-card house-card--3">
                        <HouseIcon />
                    </div>
                </div>
                <h2 className="map-loading__title"><span className="map-loading__title-span">Loading London</span><span className="map-loading__title-span">Property Data</span></h2>
            </div>
        </div>
    );
}
