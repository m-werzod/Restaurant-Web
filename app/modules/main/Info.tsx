import { useTranslations } from "next-intl";
import { Car, Cofe, Etic, HeadChef, Pitsa, UserInLove } from "@/app/assets/icons/index";
import InfoChange from "@/app/components/InfoChange";

const Info = () => {
  const t = useTranslations("info");
  const description = t("description");

  return (
    <div className="flex flex-col container mx-auto mb-10 px-20">
      <h1 className="text-[48px] font-bold text-center pb-20">
        {t("title")}
      </h1>
      <div className="flex flex-col gap-20">
        <div className="flex justify-between">
          <div>
            <InfoChange
              className="flex flex-col gap-2.5"
              icon={<Cofe />}
              title={t("features.quality")}
              description={description}
            />
          </div>

          <div>
            <InfoChange
              className="flex flex-col gap-2.5"
              icon={<Car />}
              title={t("features.delivery")}
              description={description}
            />
          </div>

          <div>
            <InfoChange
              className="flex flex-col gap-2.5"
              icon={<Pitsa />}
              title={t("features.recipes")}
              description={description}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <InfoChange
              className="flex flex-col gap-2.5"
              icon={<Etic />}
              title={t("features.atmosphere")}
              description={description}
            />
          </div>

          <div>
            <InfoChange
              className="flex flex-col gap-2.5"
              icon={<HeadChef />}
              title={t("features.chefs")}
              description={description}
            />
          </div>

          <div>
            <InfoChange
              className="flex flex-col gap-2.5"
              icon={<UserInLove />}
              title={t("features.service")}
              description={description}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info
