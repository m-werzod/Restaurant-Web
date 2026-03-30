"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Calendar, Clock, Opener } from "@/app/assets/icons";

const BronForm = () => {
  const t = useTranslations("reservation");
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const handleBook = () => {
    if (!phone || !people || !date || !time || !place) return;
    router.push("/payment");
  };

  return (
    <div className="flex flex-col gap-4 px-12 max-w-2xl mx-auto">
      <input
        type="tel"
        placeholder={t("phone")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border-b border-black bg-transparent py-3 px-1 text-base outline-none placeholder:text-gray-500"
      />

      <div className="relative w-full border-b border-black">
        <select
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="w-full bg-transparent py-3 px-1 text-base outline-none appearance-none cursor-pointer text-gray-500"
        >
          <option value="" disabled>
            {t("people")}
          </option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <Opener />
        </span>
      </div>

      <div className="relative w-full border-b border-black">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full bg-transparent py-3 px-1 text-base outline-none cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 ${
            date ? "text-black" : "text-transparent"
          }`}
        />
        {!date && (
          <span className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none">
            {t("date")}
          </span>
        )}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <Calendar />
        </span>
      </div>

      <div className="relative w-full border-b border-black">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={`w-full bg-transparent py-3 px-1 text-base outline-none cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 ${
            time ? "text-black" : "text-transparent"
          }`}
        />
        {!time && (
          <span className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none">
            {t("time")}
          </span>
        )}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <Clock />
        </span>
      </div>

      <div className="relative w-full border-b border-black">
        <select
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="w-full bg-transparent py-3 px-1 text-base outline-none appearance-none cursor-pointer text-gray-500"
        >
          <option value="" disabled>
            {t("place")}
          </option>
          <option value="hall">Зал</option>
          <option value="terrace">Терраса</option>
          <option value="vip">VIP зал</option>
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <Opener />
        </span>
      </div>

      <button className="text-left text-red-500 text-sm underline cursor-pointer bg-transparent border-none p-0">
        {t("map")}
      </button>

      <div className="flex justify-end mt-2">
        <button
          onClick={handleBook}
          className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-black/80 transition-colors cursor-pointer"
        >
          {t("button")}
        </button>
      </div>
    </div>
  );
};

export default BronForm;
