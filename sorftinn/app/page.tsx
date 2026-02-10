
import Navbar from "./navbar";
import WhyChooseSorfinn from "./whychoose/WhyChooseSorfinn";
import OurStory from "./our story/OurStory";
import { GallerySlides } from "./gallery/gallerySlide";
import { Amenities } from "./amenities/amenities";
import RoomsPage from "./rooms/ourRooms";
export default function Home() {
  return (
    <div className="page">
     <Navbar/>
     <WhyChooseSorfinn/>
       <RoomsPage/>
       <GallerySlides/>
     <OurStory/>
     <Amenities/>
    </div>
  );
}
