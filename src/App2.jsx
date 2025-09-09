import { ParallaxProvider } from 'react-scroll-parallax'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ParallaxImages from "@/components/ParallaxImages/ParallaxImages";
import ParallaxPage from '@/components/ParallaxPage/ParallaxPage';
import ParallaxHeading from './components/HomeContent/ParallaxHeading/ParallaxHeading';
import { MapButton, ParallaxDataDescription, ParallaxMainDescription, ParallaxSubDescription } from './components/HomeContent/HomeContent';
import './App.css'

function App() {
  return (
    <>
    <ParallaxProvider>
      <div className="main__container">
        <Navbar />
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
        <Footer />
      </div>
    </ParallaxProvider>
    </>
  )
}

export default App
