"use client";
import { useTranslations } from "next-intl";
import { SertsaIcon, KarzinaIcon } from "../assets/icons";
import { Link, usePathname } from "@/i18n/navigation";
import { useCart } from "../context/CartContext";
import { useLiked } from "../context/LikedContext";

const HeaderMain = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { likedCount } = useLiked();

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
        {/* Liked */}
        <Link href="/liked" className="relative cursor-pointer flex items-center justify-center border-2 border-black text-black w-8.25 h-8.25 rounded-full p-1 hover:bg-black/5 transition">
          <SertsaIcon />
          {likedCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
              {likedCount > 99 ? "99+" : likedCount}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link href="/korzina" className="relative cursor-pointer border-2 border-black text-black rounded-full p-1 flex justify-center items-center w-8.25 h-8.25 hover:bg-black/5 transition">
          <KarzinaIcon />
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
              {totalCount > 99 ? "99+" : totalCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default HeaderMain;
