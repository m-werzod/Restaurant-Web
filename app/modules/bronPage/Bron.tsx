import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import HeaderHead from "@/app/components/HeaderHead";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import Gallery from "@/app/modules/main/Gallery";
import BronForm from "@/app/modules/bronPage/BronForm";
import { Glass } from "@/app/assets/images";
import { Pochta, Telefon, RoadMap } from "@/app/assets/icons";

const workingHours = [
  { dayKey: "monday", time: "10:00–23:00" },
  { dayKey: "tuesday", time: "10:00–23:00" },
  { dayKey: "wednesday", time: "10:00–23:00" },
  { dayKey: "thursday", time: "10:00–23:00" },
  { dayKey: "friday", time: "10:00–23:00" },
  { dayKey: "saturday", time: "10:00–23:00" },
  { dayKey: "sunday", time: "11:00–22:00" },
];

const Bron = () => {
  const t = useTranslations("reservation");

  return (
    <div>
      <HeaderHead />
      <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl pb-10">
        <HeaderMain />

        <p className="text-sm text-gray-500 px-10 pt-6 flex gap-1">
          <Link href="/" className="hover:underline">
            Главная
          </Link>{" "}
          ›<span className="text-black">{t("title")}</span>
        </p>

        <h1 className="text-5xl font-bold text-center py-8">{t("title")}</h1>

        <div className="flex items-start justify-between px-12 mt-4 mb-10 gap-8">
          <div className="flex flex-col gap-0 min-w-70">
            <h2 className="text-2xl font-bold mb-4">{t("workingHours")}</h2>
            <div className="flex flex-col gap-1">
              {workingHours.map(({ dayKey, time: hours }) => (
                <div
                  key={dayKey}
                  className="flex justify-between gap-16 py-1 border-b border-black/10"
                >
                  <span className="text-base font-normal text-gray-700">
                    {t(`days.${dayKey}`)}
                  </span>
                  <span className="text-base font-normal">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <Image
              src={Glass}
              alt="glass"
              className="w-75 h-90 object-cover rounded-2xl"
            />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center mt-6 mb-8">
          {t("formTitle")}
        </h2>

        <BronForm />

        <h2 className="text-4xl font-bold text-center mt-14 mb-10">
          {t("contactUs")}
        </h2>
        <div className="flex justify-center gap-16 px-12 mb-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Pochta />
            </div>
            <h3 className="text-lg font-semibold">{t("writeUs")}</h3>
            <p className="text-sm text-gray-600">info@bmgsoft.com</p>
            <p className="text-sm text-gray-600">1:1ne@finegsoft.com</p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Telefon />
            </div>
            <h3 className="text-lg font-semibold">{t("callUs")}</h3>
            <p className="text-sm text-gray-600">+998(90)7583838</p>
            <p className="text-sm text-gray-600">+998(90)5332222</p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <RoadMap />
            </div>
            <h3 className="text-lg font-semibold">{t("visitUs")}</h3>
            <p className="text-sm text-gray-600">Узбекистан, Ташкент</p>
            <p className="text-sm text-gray-600">Улица, 24</p>
          </div>
        </div>
      </div>

      <Gallery />

      <FooterCopy />
    </div>
  );
};

export default Bron;
