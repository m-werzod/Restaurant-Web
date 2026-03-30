"use client";
import { KarzinkaBtn } from "../assets/icons";
import Image from "next/image";
import { Meal2 } from "../assets/images";
import { useCart, CartProduct } from "../context/CartContext";
import { useLiked } from "../context/LikedContext";

type Props = {
  product?: CartProduct;
};

const defaultProduct: CartProduct = {
  id: 1,
  name: "Chicken Soup",
  description: "Spicy with garlic",
  price: 10,
  image: "",
};

const CarouselTall = ({ product = defaultProduct }: Props) => {
  const { addToCart } = useCart();
  const { toggleLiked, isLiked } = useLiked();
  const liked = isLiked(product.id);

  return (
    <div className="relative bg-linear-to-r from-white/40 to-white/40 w-66 h-80 rounded-4xl p-4.5 pt-44 overflow-visible">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 object-contain"
        />
      ) : (
        <Image
          src={Meal2}
          alt={product.name}
          className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold truncate max-w-35">{product.name}</h2>
        <button
          onClick={() => toggleLiked(product)}
          className="cursor-pointer transition-transform active:scale-90"
          aria-label="Like"
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill={liked ? "#ef4444" : "none"}
            stroke={liked ? "#ef4444" : "#000"}
            strokeWidth="1.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 13C8 13 1 8.5 1 4.5C1 2.567 2.567 1 4.5 1C5.632 1 6.634 1.545 7.277 2.39C7.549 2.745 8 2.745 8.273 2.39C8.916 1.545 9.918 1 11.05 1C12.983 1 14.55 2.567 14.55 4.5C14.55 8.5 8 13 8 13Z" />
          </svg>
        </button>
      </div>

      <h3 className="text-[15px] font-normal text-gray-600 mb-1">{product.description}</h3>

      <div className="flex justify-between items-center mt-auto">
        <h1 className="text-2xl font-bold">${product.price.toFixed(2)}</h1>
        <button
          onClick={() => addToCart(product)}
          className="w-13 h-12 bg-black rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-gray-800 transition active:scale-95"
          aria-label="Add to cart"
        >
          <KarzinkaBtn />
        </button>
      </div>
    </div>
  );
};

export default CarouselTall;
