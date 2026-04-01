"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { SertsaIcon, KarzinaIcon } from "../assets/icons";
import { Link, usePathname } from "@/i18n/navigation";
import { useCart } from "../context/CartContext";
import { useLiked } from "../context/LikedContext";
import MobileMenu from "./MobileMenu";

const HeaderMain = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { likedCount } = useLiked();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between container mx-auto py-4 px-4 md:py-6 md:px-17">
        <h1 className="text-3xl md:text-5xl font-bold">Logo</h1>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-11 text-lg cursor-pointer">
          {[
            { href: "/menu", label: t("menu") },
            { href: "/news", label: t("news") },
            { href: "/reservation", label: t("reservation") },
            { href: "/about", label: t("about") },
            { href: "/contacts", label: t("contacts") },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-black ${pathname === item.href ? "text-red-500" : ""}`}
            >
              <li>{item.label}</li>
            </Link>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Liked */}
          <Link href="/liked" className="relative cursor-pointer flex items-center justify-center border-2 border-black text-black w-8 h-8 rounded-full p-1 hover:bg-black/5 transition">
            <SertsaIcon />
            {likedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {likedCount > 99 ? "99+" : likedCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/korzina" className="relative cursor-pointer border-2 border-black text-black rounded-full p-1 flex justify-center items-center w-8 h-8 hover:bg-black/5 transition">
            <KarzinaIcon />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-black rounded" />
            <span className="w-6 h-0.5 bg-black rounded" />
            <span className="w-6 h-0.5 bg-black rounded" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default HeaderMain;
