import { useMediaQuery } from "react-responsive";
import "./HomeRoute.css";

export default function HomePage() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <>
            <div className="home">
                {/* <div className="home__heading"> */}
                <div className={`
                    ${isDesktop ? "home__heading__web" : ""} 
                    ${isTablet ? "home__heading__tablet" : ""}
                    ${isMobile ? "home__heading__mobile" : ""}
                    `}>
                    <span>2023</span>
                    <span>London</span>
                    <span>Residential</span>
                    <span>Property</span>
                    <span>Prices</span>
                </div>
                <span className={`
                    ${isDesktop ? "sub__text__web" : ""} 
                    ${isTablet ? "sub__text__tablet" : ""}
                    ${isMobile ? "sub__text__mobile" : ""}
                    `}>
                        Head to my map to see price paid data for 2023.</span>
            </div>
        </>
    )
}