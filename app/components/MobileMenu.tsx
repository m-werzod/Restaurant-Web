"use client";
import { useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: Props) => {
  const t = useTranslations("nav");
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const links = [
    { href: "/menu", label: t("menu") },
    { href: "/news", label: t("news") },
    { href: "/reservation", label: t("reservation") },
    { href: "/about", label: t("about") },
    { href: "/contacts", label: t("contacts") },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer — 40% width */}
      <div
        style={{ backgroundImage: "url('/bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        className={`fixed top-0 left-0 z-50 h-full w-[40%] min-w-[220px] backdrop-blur-sm shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Logo</h1>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`px-4 py-3 rounded-xl text-base font-medium transition ${
                pathname === item.href
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-black/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
