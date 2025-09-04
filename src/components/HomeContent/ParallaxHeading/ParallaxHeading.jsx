import ParallaxPage from "../../ParallaxPage/ParallaxPage";
import "./ParallaxHeading.css";

const ParallaxHeading = () => {
    return (
        <> 
        <div className="heading__container">
            <ParallaxPage speed={-40}>
                <h1 className="parallax__heading blurred__white__bg">
                    <span>The</span>
                    <span>London</span>
                    <span>Residential</span>
                    <span>Property</span>
                    <span>Price</span>
                    <span>Map</span>
                </h1>
            </ParallaxPage>
        </div>
        </>
    )
}

export default ParallaxHeading;
