import { useTranslations } from "next-intl";
import { Calendar, Clock } from 'lucide-react';
import React from 'react'
import { ForkSpoon, Opener } from '../assets/icons';

const Bronirovat = () => {
  const t = useTranslations("reservation");
  return (
    <div className="w-115.75 h-160.75 rounded-[31px] bg-white/40 backdrop-blur-xl shadow-2xl relative flex">
      <div className=" bg-linear-to-br" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-400/40 blur-3xl rounded-full" />

      <div className="relative w-full px-10 py-12 flex flex-col gap-6">
        <div className="w-27.75 h-27.75 rounded-full bg-black flex items-center justify-center absolute -top-10 ">
          <ForkSpoon />
        </div>

        <h1 className="text-[32px] font-semibold text-black mt-10">
          {t("title")}
        </h1>

        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder={t("phone")}
            className="bg-transparent outline-none border-b border-black/40 py-2 placeholder-black/60 text-black"
          />
        </div>

        <div className="flex items-center justify-between border-b border-black/40 py-2">
          <span className="text-black/60">{t("people")}</span>
          <span className="text-black/60">
            <Opener />
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-black/40 py-2">
          <div className="flex items-center gap-2 text-black/60">
            <span>{t("date")}</span>
          </div>
          <Calendar />
        </div>

        <div className="flex items-center justify-between border-b border-black/40 py-2">
          <span className="text-black/60">{t("time")}</span>
          <Clock />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between border-b border-black/40 py-2">
            <span className="text-black/60">{t("place")}</span>
            <span className="text-black/60">
              <Opener />
            </span>
          </div>
          <span className="text-blue-600 text-sm cursor-pointer">
            {t("map")}
          </span>
        </div>

        <button className="mt-4 bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer flex-start w-[42%] h-12.5">
          {t("button")}
        </button>
      </div>
    </div>
  );
}

export default Bronirovat
