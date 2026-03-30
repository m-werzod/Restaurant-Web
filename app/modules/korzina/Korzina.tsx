"use client";
import { useCart } from "@/app/context/CartContext";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import { Link } from "@/i18n/navigation";
import { Meal2 } from "@/app/assets/images";
import Image from "next/image";

const Korzina = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl">
          <HeaderMain />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-32">
          <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="52" height="52" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-0.000143943 0.531527C0.162772 0.128629 0.464165 -0.0116303 0.884126 0.000745401C1.5462 0.0199965 2.20872 0.00441206 2.8708 0.0062455C3.34506 0.0062455 3.57314 0.197382 3.68266 0.665827C3.87725 1.49867 4.07411 2.33059 4.27368 3.17672H4.51398C8.89099 3.17672 13.2678 3.17672 17.6446 3.17672C17.9333 3.17672 18.198 3.22623 18.3754 3.48612C18.4353 3.57403 18.4751 3.67436 18.4919 3.77981C18.5088 3.88526 18.5022 3.99318 18.4727 4.09574C18.0283 5.91298 17.5851 7.72946 17.1431 9.54518C17.0323 9.99942 16.9232 10.4541 16.8064 10.9065C16.7055 11.2961 16.4756 11.479 16.0778 11.479C12.5199 11.4808 8.96189 11.4808 5.40369 11.479C4.99097 11.479 4.757 11.2847 4.66061 10.8776C3.92718 7.77637 3.19376 4.67419 2.46034 1.57109C2.44812 1.51884 2.43228 1.46796 2.41508 1.40974C1.90552 1.40974 1.40546 1.39049 0.907206 1.4157C0.481362 1.43725 0.174087 1.29974 -0.00195312 0.897757L-0.000143943 0.531527ZM5.89967 10.0677C5.95262 10.0714 5.9938 10.0773 6.03544 10.0773C9.16583 10.0773 12.2961 10.0783 15.4262 10.0801C15.5456 10.0801 15.5882 10.0402 15.6162 9.92379C15.9596 8.50165 16.3065 7.08073 16.6571 5.66104C16.7426 5.31085 16.8263 4.9602 16.9132 4.60177H4.60992L5.89967 10.0677Z" fill="#9ca3af"/>
              <path d="M6.29846 12.4818C7.58594 12.5175 8.61865 13.5818 8.58878 14.8414C8.55755 16.1523 7.50267 17.1914 6.24098 17.157C4.93313 17.1213 3.93301 16.062 3.97102 14.7562C4.00949 13.476 5.06165 12.4479 6.29846 12.4818Z" fill="#9ca3af"/>
              <path d="M14.6416 12.481C15.9087 12.4723 16.9445 13.5169 16.9531 14.8109C16.9553 15.1174 16.8977 15.4214 16.7837 15.7054C16.6696 15.9893 16.5014 16.2477 16.2886 16.4657C16.0758 16.6837 15.8226 16.8571 15.5435 16.9758C15.2645 17.0946 14.965 17.1563 14.6624 17.1577C13.3925 17.1742 12.3372 16.1158 12.3345 14.82C12.3313 13.543 13.3699 12.4893 14.6416 12.481Z" fill="#9ca3af"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700">Корзина пуста</h2>
          <p className="text-gray-400 text-sm">Добавьте блюда из меню, чтобы оформить заказ</p>
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl">
        <HeaderMain />
      </div>

      <div className="container mx-auto px-4 py-10 flex-1 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Корзина</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 transition font-medium cursor-pointer"
          >
            Очистить всё
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items list */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <Image src={Meal2} alt={item.name} className="w-16 h-16 object-contain" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{item.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{item.description}</p>
                  <p className="font-bold text-black mt-1">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-lg hover:border-black transition cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-lg hover:border-black transition cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-right shrink-0 min-w-20">
                  <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-bold mb-5">Итого</h2>

              <div className="flex flex-col gap-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate max-w-40">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/payment"
                className="block w-full bg-black text-white text-center py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Оформить заказ
              </Link>

              <Link
                href="/menu"
                className="block w-full text-center py-3 mt-3 text-sm text-gray-500 hover:text-black transition"
              >
                ← Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FooterCopy />
    </div>
  );
};

export default Korzina;
