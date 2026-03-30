"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Props = {
  href: string;
};

const ViewAllBtn = ({ href }: Props) => {
  const t = useTranslations("nav");
  return (
    <Link href={href}>
      <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium cursor-pointer hover:opacity-90 transition">
        {t("viewAll")} →
      </button>
    </Link>
  );
};

export default ViewAllBtn;
