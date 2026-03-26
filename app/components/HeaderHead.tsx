"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { EmailIcon, FlagIcon, PhoneIcon, UserIcon } from "../assets/icons";
import dynamic from "next/dynamic";

// ✅ Load modal dynamically to avoid SSR issues
const LogoutModal = dynamic(() => import("./LogoutModal"), { ssr: false });

const HeaderHead = () => {
  const router = useRouter();
  const [cookies] = useCookies(["token"]);
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const isLoggedIn = !!cookies.token;

  const handleAuthButton = () => {
    if (isLoggedIn) {
      setShowLogout(true); // ✅ show modal
    } else {
      router.push("/login");
    }
  };

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
          <div className="flex items-center gap-2">
            <FlagIcon />
            <select
              name="Language"
              id="Lang"
              className="border-none outline-none bg-transparent cursor-pointer text-black font-normal text-base"
            >
              <option value="Rus">Русски</option>
              <option value="Eng">English</option>
            </select>
          </div>

          <span
            onClick={handleAuthButton}
            className="flex items-center gap-2 text-white bg-black px-2 py-1 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-800 transition"
          >
            <UserIcon />
            {isLoggedIn ? "Выход" : "Вход в аккаунт"}
          </span>
        </div>
      </div>

      {/* ✅ Modal is OUTSIDE the header div — at root level */}
      {showLogout && <LogoutModal onClose={() => setShowLogout(false)} />}
    </>
  );
};

export default HeaderHead;
