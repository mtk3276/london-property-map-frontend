import { Parallax } from "react-scroll-parallax";
import "./ParallaxPage.css";

const ParallaxPage = ({ speed, children }) => {
    return (
        <> 
            <Parallax speed={speed}>
                <div className="parallax__page">
                    { children }
                </div>
            </Parallax>
        </>
    )
}

export default ParallaxPage;
