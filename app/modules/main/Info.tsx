import { useTranslations } from "next-intl";
import { Car, Cofe, Etic, HeadChef, Pitsa, UserInLove } from "@/app/assets/icons/index";
import InfoChange from "@/app/components/InfoChange";

const Info = () => {
  const t = useTranslations("info");
  const description = t("description");

  const features = [
    { icon: <Cofe />, title: t("features.quality") },
    { icon: <Car />, title: t("features.delivery") },
    { icon: <Pitsa />, title: t("features.recipes") },
    { icon: <Etic />, title: t("features.atmosphere") },
    { icon: <HeadChef />, title: t("features.chefs") },
    { icon: <UserInLove />, title: t("features.service") },
  ];

  return (
    <div className="flex flex-col container mx-auto mb-10 px-4 md:px-20">
      <h1 className="text-2xl md:text-[48px] font-bold text-center pb-10 md:pb-20">
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
        {features.map((f, i) => (
          <InfoChange
            key={i}
            className="flex flex-col gap-2.5"
            icon={f.icon}
            title={f.title}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default Info;
