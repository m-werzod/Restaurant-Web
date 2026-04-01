import { useTranslations } from "next-intl";
import CarouselDemo from "@/app/components/CarouselDemo";
import ArrowBtn from "@/app/components/ArrowBtn";
import Image from "next/image";
import { leaf5, leaf6 } from "@/app/assets/images";

const CarouselSide = () => {
  const t = useTranslations("dishes");
  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1 className="text-2xl md:text-[48px] font-bold text-center py-10 md:py-20">
        {t("title")}
      </h1>
      <Image src={leaf5} alt="leaf5" className="hidden md:block absolute top-330 right-330" />
      <Image src={leaf6} alt="leaf6" className="hidden md:block absolute ml-292 top-240" />
      <div className="p-4 md:p-10">
        <CarouselDemo />
      </div>
      <div className="flex justify-end p-4 md:p-10">
        <ArrowBtn />
      </div>
    </div>
  );
};

export default CarouselSide;
