import { Liked, KarzinkaBtn } from "../assets/icons";
import Image from "next/image"
import {Meal1,Meal2, Meal3} from "../assets/images"
const Carousel = () => {
  return (
    <div>
      <div className="bg-linear-to-r from-white/40 to-white/40 w-60 h-66 rounded-4xl p-4.5 pt-36 ">
        <div className="flex justify-between items-center mb-2">
          <Image src={Meal1} alt="Meal1" className="absolute bottom-40"/>
          <h2 className="text-[20px] font-bold">Chicken soup</h2>
          <Liked />
        </div>
        <h3 className="text-[13px] font-normal">Spicy with garlic</h3>
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] font-bold">$10.00</h1>
          <button className="w-12 h-11 bg-black rounded-[5px] flex items-center justify-center cursor-pointer mb-5">
            <KarzinkaBtn />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
