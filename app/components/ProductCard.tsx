"use client";
import Image from "next/image";
import { Meal2 } from "@/app/assets/images";
import { useCart, CartProduct } from "@/app/context/CartContext";
import { useLiked } from "@/app/context/LikedContext";
import { resolveMediaUrl } from "@/lib/media";

type Props = {
  product: CartProduct;
};

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill={filled ? "#ef4444" : "none"}
    stroke={filled ? "#ef4444" : "currentColor"}
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 15S1 9.5 1 5C1 2.79 2.79 1 5 1c1.31 0 2.48.64 3.21 1.63.19.26.59.26.78 0C9.72 1.64 10.89 1 12.2 1 14.41 1 16.2 2.79 16.2 5c0 4.5-7.2 10-7.2 10Z" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="18"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1h2l2.4 9.6a2 2 0 0 0 1.9 1.4h7.4a2 2 0 0 0 1.9-1.4L18 4H5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="16.5" r="1.5" fill="white" />
    <circle cx="14.5" cy="16.5" r="1.5" fill="white" />
  </svg>
);

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const { toggleLiked, isLiked } = useLiked();
  const liked = isLiked(product.id);
  const imageSrc = resolveMediaUrl(product.image);

  return (
    <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 group">
      {/* Image */}
      <div className="relative h-36 sm:h-40 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Image
            src={Meal2}
            alt={product.name}
            className="h-32 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Like button */}
        <button
          onClick={() => toggleLiked(product)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-base sm:text-lg leading-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm line-clamp-1">
          {product.description}
        </p>
      </div>

      {/* Price + Cart */}
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-lg sm:text-xl">
          ${Number(product.price).toFixed(2)}
        </span>
        <button
          onClick={() => addToCart(product)}
          className="w-10 h-10 bg-black rounded-xl flex items-center justify-center hover:bg-gray-800 active:scale-95 transition cursor-pointer"
          aria-label="Add to cart"
        >
          <CartIcon />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
