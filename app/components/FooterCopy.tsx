"use client";
import { useTranslations } from "next-intl";
import { Facebook, Instagram, Telegram, WhatsApp } from "@/app/assets/icons/index";

const FooterCopy = () => {
  const t = useTranslations("footer");
  return (
    <div className="bg-[url('assets/images/footer-bg.png')] bg-cover bg-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-10 md:px-18 md:py-15 container mx-auto">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold">Logo</h1>
          <div className="flex gap-2 cursor-pointer">
            <Telegram /><WhatsApp /><Facebook /><Instagram />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-medium mb-1">{t("services")}</h1>
          <h3 className="text-sm md:text-base">{t("prices")}</h3>
          <h3 className="text-sm md:text-base">{t("tracking")}</h3>
          <h3 className="text-sm md:text-base">{t("report")}</h3>
          <h3 className="text-sm md:text-base">{t("terms")}</h3>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-medium mb-1">{t("company")}</h1>
          <h3 className="text-sm md:text-base">{t("reports")}</h3>
          <h3 className="text-sm md:text-base">{t("contact")}</h3>
          <h3 className="text-sm md:text-base">{t("management")}</h3>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-medium mb-1">{t("address")}</h1>
          <h3 className="text-sm md:text-base">{t("country")}</h3>
          <h3 className="text-sm md:text-base">{t("street")}</h3>
          <h3 className="text-sm md:text-base">+99894848844848</h3>
          <h3 className="text-sm md:text-base">info@bmgsoft.com</h3>
        </div>
      </div>
    </div>
  );
};

export default FooterCopy;
