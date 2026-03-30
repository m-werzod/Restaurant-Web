"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import HeaderHead from "@/app/components/HeaderHead";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import {
  Uycha,
  PayCard1,
  PayCard2,
  PayCard3,
  PayCard4,
  PayCard5,
} from "@/app/assets/icons";

const cartItems = [
  { name: "Бургер", qty: 2, price: 25000 },
  { name: "Кола (1.5л)", qty: 1, price: 15000 },
];

type DeliveryMethod = "pickup" | "door" | "address";
type PaymentMethod = "card" | "cash";

const Payment = () => {
  const router = useRouter();
  const [delivery, setDelivery] = useState<DeliveryMethod>("door");
  const [payMethod, setPayMethod] = useState<PaymentMethod>("card");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handleOrder = () => {
    router.push("/");
  };

  return (
    <div>
      <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl pb-16">
        <HeaderHead />
        <HeaderMain />

        <p className="text-sm text-gray-500 px-10 pt-6 flex gap-1">
          <Link href="/" className="hover:underline">
            Главная
          </Link>{" "}
          ›<span className="text-black">Оформление заказа</span>
        </p>

        <h1 className="text-4xl font-bold text-center py-10">
          Оформление заказа
        </h1>

        <div className="flex gap-8 px-12 pb-10 items-start">
          <div className="flex-1 flex flex-col gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-5">Способ получения:</h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "pickup"}
                    onChange={() => setDelivery("pickup")}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                  <span className="text-base">Заказ с собой</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "door"}
                    onChange={() => setDelivery("door")}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                  <span className="text-base">Доставка до двери</span>
                </label>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "address"}
                      onChange={() => setDelivery("address")}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <Uycha />
                    <span className="text-base">Доставка по адресу:</span>
                  </label>
                  <div className="ml-8 flex flex-col gap-2">
                    <span className="text-sm text-gray-500">
                      Укажите адрес доставки на карте:
                    </span>
                    <button className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 transition-colors cursor-pointer w-fit">
                      Выбрать
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-5">Способ оплаты:</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={payMethod === "card"}
                      onChange={() => setPayMethod("card")}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <span className="text-base">Картой онлайн</span>
                  </label>
                  <div className="ml-8 flex items-center gap-2">
                    <PayCard1 />
                    <PayCard2 />
                    <PayCard3 />
                    <PayCard4 />
                    <PayCard5 />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={payMethod === "cash"}
                    onChange={() => setPayMethod("cash")}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                  <span className="text-base">Оплата при получении</span>
                </label>
              </div>
            </div>
          </div>

          <div className="w-72 bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
            <h2 className="text-xl font-bold text-center mb-2">Ваш заказ</h2>

            <div className="flex flex-col gap-0">
              {cartItems.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between text-sm border-b border-black/10 py-2"
                >
                  <span className="text-gray-500">
                    {item.name}
                    {item.qty > 1 ? `(${item.qty})` : ""}
                  </span>
                  <span className="text-gray-700">
                    {(item.price * item.qty).toLocaleString()}сум
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm border-b border-black/10 py-2">
                <span className="text-gray-500">Доставка</span>
                <span className="text-gray-700">
                  {deliveryFee === 0
                    ? "Бесплатно"
                    : `${deliveryFee.toLocaleString()}сум`}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-base font-bold pt-1">
              <span>Итого:</span>
              <span>{total.toLocaleString()}сум</span>
            </div>

            <button
              onClick={handleOrder}
              className="bg-black text-white py-3 rounded-full text-base font-medium hover:bg-black/80 transition-colors cursor-pointer mt-2 w-full"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>

      <FooterCopy />
    </div>
  );
};

export default Payment;
