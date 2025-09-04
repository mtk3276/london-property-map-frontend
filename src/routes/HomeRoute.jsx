import { ParallaxProvider } from 'react-scroll-parallax'
import ParallaxImages from '../components/ParallaxImages/ParallaxImages'
import ParallaxPage from '../components/ParallaxPage/ParallaxPage'
import ParallaxHeading from '../components/HomeContent/ParallaxHeading/ParallaxHeading'
import { MapButton, ParallaxDataDescription, ParallaxMainDescription, ParallaxSubDescription } from '../components/HomeContent/HomeContent'
import './HomeRoute.css'
import '../App.css'

export default function HomePage() {
  return (
    <ParallaxProvider>
      <div className="main__container">
        <div className="parallax__images__container">
          <ParallaxImages />
        </div>
        <div className="parallax__pages">
          <ParallaxHeading />
          <div className="main__content__container">
            <ParallaxMainDescription />
            <ParallaxSubDescription />
            <ParallaxDataDescription />
            <MapButton />
          </div>
        </div>
      </div>
    </ParallaxProvider>
  )
}