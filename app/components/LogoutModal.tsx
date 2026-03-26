"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function LogoutModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      // ✅ Remove token using react-cookie
      removeCookie("token", { path: "/" });
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
        {/* Top Section */}
        <div className="flex flex-col items-center px-8 pt-8 pb-6">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 7L7 17M7 7l10 10"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-gray-900 text-lg font-semibold text-center">
            Выход из аккаунта
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm text-center mt-2 leading-relaxed">
            Вы уверены, что хотите выйти? Вам потребуется войти снова.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Actions */}
        <div className="px-6 py-5 flex gap-3">
          {/* Cancel */}
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
          >
            Отмена
          </button>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition flex items-center justify-center disabled:opacity-70"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Выйти"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
