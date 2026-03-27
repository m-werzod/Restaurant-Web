"use client"
import { useTranslations } from "next-intl";
import { SertsaIcon, KarzinaIcon } from "../assets/icons";
import { Link, usePathname } from "@/i18n/navigation";

const HeaderMain = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between container mx-auto py-6 px-17">
      <h1 className="text-5xl font-bold">Logo</h1>
      <ul className="flex items-center gap-11 text-lg cursor-pointer hover">
        <Link
          className={`text-black ${pathname === "/menu" ? "text-red-500" : ""}`}
          href="/menu"
        >
          <li>{t("menu")}</li>
        </Link>
        <Link
          className={`text-black ${pathname === "/news" ? "text-red-500" : ""}`}
          href="/news"
        >
          <li>{t("news")}</li>
        </Link>
        <Link
          className={`text-black ${pathname === "/reservation" ? "text-red-500" : ""}`}
          href="/reservation"
        >
          <li>{t("reservation")}</li>
        </Link>
        <Link
          className={`text-black ${pathname === "/about" ? "text-red-500" : ""}`}
          href="/about"
        >
          <li>{t("about")}</li>
        </Link>
        <Link
          className={`text-black ${pathname === "/contacts" ? "text-red-500" : ""}`}
          href="/contacts"
        >
          <li>{t("contacts")}</li>
        </Link>
      </ul>
      <div className="flex items-center gap-4">
        <div className="cursor-pointer flex items-center justify-center border-2 border-black text-black w-8.25 h-8.25 rounded-full p-1">
          <SertsaIcon />
        </div>
        <div className="cursor-pointer border-2 border-black text-black rounded-full p-1 flex justify-center items-center w-8.25 h-8.25">
          <KarzinaIcon />
        </div>
      </div>
    </div>
  );
}

export default HeaderMain
