import { useTranslations } from "next-intl";
import CarouselDemo from "@/app/components/CarouselDemo";
import ArrowBtn from "@/app/components/ArrowBtn";
import Image from "next/image";
import { leaf5, leaf6 } from "@/app/assets/images";

const CarouselSide = () => {
  const t = useTranslations("dishes");
  return (
    <div className="container mx-auto">
      <h1 className="text-[48px] font-bold text-center py-20 ">
        {t("title")}
      </h1>
      <Image src={leaf5} alt="leaf7" className="absolute top-330 right-330" />
      <Image src={leaf6} alt="leaf8" className="absolute ml-292 top-240" />
      <div className="p-10">
        <CarouselDemo />
      </div>
      <div className="p-10 pl-250">
        <ArrowBtn />
      </div>
    </div>
  );
};

export default CarouselSide;
