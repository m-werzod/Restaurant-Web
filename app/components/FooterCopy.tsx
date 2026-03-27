import { useTranslations } from "next-intl";
import { Facebook, Instagram, Telegram, WhatsApp } from "@/app/assets/icons/index";

const FooterCopy = () => {
  const t = useTranslations("footer");
  return (
    <div className="bg-[url('assets/images/footer-bg.png')] bg-cover bg-center">
      <div className="flex justify-between px-18 py-15 container mx-auto ">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">Logo</h1>
          <div className="flex gap-2 cursor-pointer">
            <Telegram />
            <WhatsApp />
            <Facebook />
            <Instagram />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-1">{t("services")}</h1>
          <h3 className="text-base font-normal">{t("prices")}</h3>
          <h3 className="text-base font-normal">{t("tracking")}</h3>
          <h3 className="text-base font-normal">{t("report")}</h3>
          <h3 className="text-base font-normal">{t("terms")}</h3>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-1">{t("company")}</h1>
          <h3 className="text-base font-normal">{t("reports")}</h3>
          <h3 className="text-base font-normal">{t("contact")}</h3>
          <h3 className="text-base font-normal">{t("management")}</h3>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-1">{t("address")}</h1>
          <h3 className="text-base font-normal">{t("country")}</h3>
          <h3 className="text-base font-normal">{t("street")}</h3>
          <h3 className="text-base font-normal">+99894848844848</h3>
          <h3 className="text-base font-normal">info@bmgsoft.com</h3>
        </div>
      </div>
    </div>
  );
};

export default FooterCopy;
