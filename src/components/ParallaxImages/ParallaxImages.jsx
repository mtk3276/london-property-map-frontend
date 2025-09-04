import { Parallax } from "react-scroll-parallax";
import { img1, img2, img3, img4, img5, img6, img7, img8 } from "@/assets/index";
import "./ParallaxImages.css";

const ParallaxImages = () => {
    const images = [ img1, img2, img3, img4, img5, img6, img7, img8 ];

    return (
        <>
            <div className="parallax__images">
            {
                images.map(image => (
                    <div className="parallax__container" key={image}>
                        {/* Outer box with slower speed */}
                        <Parallax speed={-10}>
                            {/* Inner image with faster speed */}
                            <Parallax speed={20}>
                                <img src={image} alt="Parallax Content" className="parallax__image" />
                            </Parallax>
                        </Parallax>
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default ParallaxImages;
