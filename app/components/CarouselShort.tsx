"use client";
import { KarzinkaBtn } from "../assets/icons";
import Image, { StaticImageData } from "next/image";
import { Meal1 } from "../assets/images";
import { useCart } from "../context/CartContext";
import { useLiked } from "../context/LikedContext";

type Props = {
  localImage?: StaticImageData;
};

const defaultProduct = {
  id: 101,
  name: "Chicken soup",
  description: "Spicy with garlic",
  price: 10,
  image: "",
};

const CarouselShort = ({ localImage }: Props) => {
  const { addToCart } = useCart();
  const { toggleLiked, isLiked } = useLiked();
  const liked = isLiked(defaultProduct.id);

  return (
    <div>
      <div className="bg-linear-to-r from-white/40 to-white/40 w-full sm:w-60 h-66 rounded-4xl p-4.5 pt-36">
        <div className="flex justify-between items-center mb-2">
          <Image src={localImage ?? Meal1} alt="Meal" className="absolute bottom-40" />
          <h2 className="text-[20px] font-bold">{defaultProduct.name}</h2>
          <button
            onClick={() => toggleLiked(defaultProduct)}
            className="cursor-pointer transition-transform active:scale-90"
            aria-label="Like"
          >
            <svg width="16" height="14" viewBox="0 0 16 14"
              fill={liked ? "#ef4444" : "none"}
              stroke={liked ? "#ef4444" : "#000"}
              strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 13C8 13 1 8.5 1 4.5C1 2.567 2.567 1 4.5 1C5.632 1 6.634 1.545 7.277 2.39C7.549 2.745 8 2.745 8.273 2.39C8.916 1.545 9.918 1 11.05 1C12.983 1 14.55 2.567 14.55 4.5C14.55 8.5 8 13 8 13Z" />
            </svg>
          </button>
        </div>
        <h3 className="text-[13px] font-normal">{defaultProduct.description}</h3>
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] font-bold">${defaultProduct.price.toFixed(2)}</h1>
          <button
            onClick={() => addToCart(defaultProduct)}
            className="w-12 h-11 bg-black rounded-[5px] flex items-center justify-center cursor-pointer mb-5 hover:bg-gray-800 transition active:scale-95"
          >
            <KarzinkaBtn />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselShort;
