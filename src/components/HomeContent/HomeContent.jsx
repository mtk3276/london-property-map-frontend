import { Link } from "react-router-dom";
import ParallaxPage from "@/components/ParallaxPage/ParallaxPage";
import "./HomeContent.css";

export const ParallaxMainDescription = () => {
    return (
        <div className='main__description__container'>
            <ParallaxPage speed={-20}>    
                <h2 className="home__text__body blurred__white__bg">
                    <span className='big__number'>85,883</span>
                    <span>Residential</span>
                    <span>Property</span>
                    <span>Transactions</span>
                    <span>In 2023</span>
                </h2>
            </ParallaxPage>
        </div>
    )
}

export const ParallaxSubDescription = () => {
    return (
        <div className="sub__description__container">
            <ParallaxPage speed={-20}>
                <p className="home__text__body blurred__white__bg">
                    <span>Averaged and</span>
                    <span>mapped for</span>
                    <span>London boroughs</span>
                    <span>and wards.</span>
                </p>
            </ParallaxPage>
        </div>
    )
}

export const ParallaxDataDescription = () => {
    return (
        <div className="data__description__container">
            <ParallaxPage speed={-20}>
                <p className="home__text__body blurred__white__bg">
                    <span>Providing you</span>
                    <span>with a</span>
                    <span className="cobalt__text emphasised__text emphasised__mt">Unique</span>
                    <span className="cobalt__text emphasised__text emphasised__mb">visualisation</span>
                    <span>of</span>
                    <span>HM Land Registry:</span>
                    <span>Price Paid Data</span>
                </p>
            </ParallaxPage>
        </div>
    )
}

export const MapButton = () => {
    const line1 = "Head to";
    const line2 = "the 2023";
    const line3 = "Price Paid Map";

    return (
        <ParallaxPage speed={15}>    
            <div className="map__btn__container">
                    <Link to="/map" className="map__btn">
                        <span className="btn__line" data-text={line1}>{line1}</span>
                        <span className="btn__line" data-text={line2}>{line2}</span>
                        <span className="btn__line" data-text={line3}>{line3}</span>
                    </Link>
            </div>
        </ParallaxPage>
    )
}