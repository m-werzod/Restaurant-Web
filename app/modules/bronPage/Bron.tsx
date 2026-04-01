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
      <div className="bg-linear-to-r from-white/40 to-white/40 w-full container mx-auto rounded-3xl pb-10">
        <HeaderMain />

        <p className="text-sm text-gray-500 px-4 md:px-10 pt-6 flex gap-1">
          <Link href="/" className="hover:underline">Главная</Link>
          {" "}›<span className="text-black">{t("title")}</span>
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-center py-8">{t("title")}</h1>

        <div className="flex flex-col md:flex-row items-start justify-between px-4 md:px-12 mt-4 mb-10 gap-8">
          <div className="flex flex-col gap-0 w-full md:min-w-70">
            <h2 className="text-xl md:text-2xl font-bold mb-4">{t("workingHours")}</h2>
            <div className="flex flex-col gap-1">
              {workingHours.map(({ dayKey, time: hours }) => (
                <div key={dayKey} className="flex justify-between gap-4 md:gap-16 py-1 border-b border-black/10">
                  <span className="text-sm md:text-base text-gray-700">{t(`days.${dayKey}`)}</span>
                  <span className="text-sm md:text-base">{hours}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center w-full md:flex-1 md:justify-end">
            <Image src={Glass} alt="glass" className="w-60 h-72 md:w-75 md:h-90 object-cover rounded-2xl" />
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-center mt-6 mb-8">{t("formTitle")}</h2>
        <BronForm />

        <h2 className="text-2xl md:text-4xl font-bold text-center mt-14 mb-10">{t("contactUs")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 md:px-12 mb-10">
          {[
            { icon: <Pochta />, title: t("writeUs"), lines: ["info@bmgsoft.com", "1:1ne@finegsoft.com"] },
            { icon: <Telefon />, title: t("callUs"), lines: ["+998(90)7583838", "+998(90)5332222"] },
            { icon: <RoadMap />, title: t("visitUs"), lines: ["Узбекистан, Ташкент", "Улица, 24"] },
          ].map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 flex items-center justify-center">{c.icon}</div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              {c.lines.map((l) => <p key={l} className="text-sm text-gray-600">{l}</p>)}
            </div>
          ))}
        </div>
      </div>
      <Gallery />
      <FooterCopy />
    </div>
  );
};

export default Bron;
