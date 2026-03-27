"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { EmailIcon, PhoneIcon, UserIcon } from "../assets/icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import Ru from "@app/assets/icons/Ru.png";
import En from "@app/assets/icons/En.png";
import Uz from "@app/assets/icons/Uz.png";
import { useTranslations } from "next-intl";

const LogoutModal = dynamic(() => import("./LogoutModal"), { ssr: false });

const languages = [
  { code: "ru", label: "Русский", flag: Ru },
  { code: "en", label: "English", flag: En },
  { code: "uz", label: "O'zbekcha", flag: Uz },
];

const HeaderHead = () => {
  const t = useTranslations("header");
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params?.locale as string) || "ru";

  const [cookies] = useCookies(["token"]);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = mounted && !!cookies.token;

  const handleAuthButton = () => {
    if (isLoggedIn) {
      setShowLogout(true);
    } else {
      router.push("/login");
    }
  };

  const handleLocaleChange = (locale: string) => {
    const currentPath = window.location.pathname;
    const match = currentPath.match(/^\/(ru|en|uz)(\/.*)?$/);
    const rest = match ? (match[2] || "") : currentPath;
    window.location.href = `/${locale}${rest}`;
  };

  const handleMouseEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setHovered(false), 120);
  };

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  return (
    <>
      <div className="flex items-center justify-between container mx-auto px-4 py-6">
        <div className="flex-1 flex items-center gap-10 py-2">
          <span className="flex items-center gap-2">
            <PhoneIcon />
            +998(90)758383833
          </span>
          <span className="flex items-center gap-2">
            <EmailIcon />
            info@bmgsoft.com
          </span>
        </div>

        <div className="flex-1 flex items-center justify-end gap-10">
          {/* Language Dropdown — hover to open */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Trigger button */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer select-none transition-all duration-200 hover:bg-white/50">
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 ring-2 ring-white/60 shadow-sm">
                <Image
                  src={currentLang.flag}
                  alt={currentLang.label}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-800">{currentLang.label}</span>
              <svg
                className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${hovered ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-1 w-46 rounded-2xl z-50 overflow-hidden transition-all duration-200 origin-top
                backdrop-blur-md bg-white/70 border border-white/50 shadow-lg
                ${hovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLocaleChange(lang.code)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm transition-colors duration-150
                    ${currentLocale === lang.code
                      ? "bg-white/60 font-semibold text-gray-900"
                      : "text-gray-700 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 ring-2 ring-white/60 shadow-sm">
                    <Image
                      src={lang.flag}
                      alt={lang.label}
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{lang.label}</span>
                  {currentLocale === lang.code && (
                    <svg className="w-3.5 h-3.5 text-gray-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <span
            onClick={handleAuthButton}
            className="flex items-center gap-2 text-white bg-black px-2 py-1 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-800 transition"
          >
            <UserIcon />
            {isLoggedIn ? t("logout") : t("login")}
          </span>
        </div>
      </div>

      {showLogout && <LogoutModal onClose={() => setShowLogout(false)} />}
    </>
  );
};

export default HeaderHead;
