import React from 'react'
import { Liked, KarzinkaBtn } from '../assets/icons';
import Image from "next/image"
import {Meal2} from "../assets/images"

const CarouselTall = () => {
  return (
    <div className="bg-linear-to-r from-white/40 to-white/40 w-66 h-77 rounded-4xl p-4.5 pt-44">
      <Image src={Meal2}  alt="Meal2"className="absolute bottom-29" />
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Chicken soup</h2>
        <Liked />
      </div>
      <h3 className="text-[15px] font-normal">Spicy with garlic</h3>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">$10.00</h1>
        <button className="w-13 h-12 bg-black rounded-[5px] flex items-center justify-center cursor-pointer mb-5">
          <KarzinkaBtn />
        </button>
      </div>
    </div>
  );
}

export default CarouselTall