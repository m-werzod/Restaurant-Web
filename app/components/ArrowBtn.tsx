"use client"
import { useTranslations } from "next-intl";
import { Arrow } from "../assets/icons";
import { Link } from "@/i18n/navigation";

const ArrowBtn = () => {
  const t = useTranslations("nav");
  return (
    <Link href="/menu">
      <button className="flex items-center justify-center gap-2 text-white bg-black px-4 py-2 rounded-lg mt-6 text-sm font-medium cursor-pointer">
        <p>{t("viewMenu")}</p>
        <Arrow />
      </button>
    </Link>
  );
};

export default ArrowBtn;
