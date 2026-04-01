"use client";
import { useLiked } from "@/app/context/LikedContext";
import { useCart } from "@/app/context/CartContext";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import { Link } from "@/i18n/navigation";
import { Meal2 } from "@/app/assets/images";
import Image from "next/image";

const Liked = () => {
  const { likedItems, toggleLiked } = useLiked();
  const { addToCart } = useCart();

  if (likedItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl">
          <HeaderMain />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-32">
          <div className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center">
            <svg width="52" height="48" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 15C8 15 1 10 1 5.5C1 3.567 2.567 2 4.5 2C5.632 2 6.634 2.545 7.277 3.39C7.549 3.745 8 3.745 8.273 3.39C8.916 2.545 9.918 2 11.05 2C12.983 2 14.55 3.567 14.55 5.5C14.55 10 8 15 8 15Z" stroke="#f87171" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700">Нет избранных</h2>
          <p className="text-gray-400 text-sm">Нажмите на сердечко на карточке блюда, чтобы добавить в избранное</p>
          <Link
            href="/menu"
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Перейти в меню
          </Link>
        </div>
        <FooterCopy />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl">
        <HeaderMain />
      </div>

      <div className="container mx-auto px-4 py-10 flex-1 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Избранное</h1>
          <span className="text-sm text-gray-400">{likedItems.length} блюд</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              {/* Image */}
              <div className="relative h-44 bg-gray-100 flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <Image src={Meal2} alt={item.name} className="w-28 h-28 object-contain" />
                )}
                <button
                  onClick={() => toggleLiked(item)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                  aria-label="Remove from liked"
                >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="#ef4444" stroke="#ef4444" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 13C8 13 1 8.5 1 4.5C1 2.567 2.567 1 4.5 1C5.632 1 6.634 1.545 7.277 2.39C7.549 2.745 8 2.745 8.273 2.39C8.916 1.545 9.918 1 11.05 1C12.983 1 14.55 2.567 14.55 4.5C14.55 8.5 8 13 8 13Z" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-3 truncate">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium cursor-pointer active:scale-95"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterCopy />
    </div>
  );
};

export default Liked;
