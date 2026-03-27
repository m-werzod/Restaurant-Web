import { useTranslations } from "next-intl";
import ArrowBtn from "@/app/components/ArrowBtn";
import Galery from "@/app/components/Galery";

const Gallery = () => {
  const t = useTranslations("gallery");
  return (
    <div className="container mx-auto px-15">
      <h1 className="text-[48px] font-bold text-center py-20 mb-15 ">
        {t("title")}
      </h1>
      <div className="flex justify-cneter items-center mb-20 justify-between">
        <Galery />
        <Galery />
        <Galery />
      </div>
      <div className="ml-247 mb-10">
        <ArrowBtn />
      </div>
    </div>
  );
}

export default Gallery
