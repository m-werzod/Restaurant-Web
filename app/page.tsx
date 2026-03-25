import Bron from './modules/main/Bron'
import CarouselSide from './modules/main/CarouselSide'
import Footer from './modules/main/footer'
import Gallery from './modules/main/Gallery'
import Info from './modules/main/Info'
import Main from './modules/main/Main'

const page = () => {
  return (
    <div>
      <Main />
      <CarouselSide />
      <Bron />
      <Info />
      <Gallery/>
      <Footer />
      
    </div>
  )
}

export default page