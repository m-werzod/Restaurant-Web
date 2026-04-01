import { useTranslations } from "next-intl";
import { MainImage, leaf1, leaf2, leaf3, leaf4 } from "@/app/assets/images";
import Image from "next/image";
import HeaderHead from "@/app/components/HeaderHead";
import HeaderMain from "@/app/components/HeaderMain";
import ArrowBtn from "@/app/components/ArrowBtn";

const Main = () => {
  const t = useTranslations("hero");
  return (
    <div className="overflow-x-hidden">
      <HeaderHead />
      <div className="overflow-hidden">
        <div className="bg-linear-to-r from-white/40 to-white/40 w-full container mx-auto rounded-3xl pb-10">
          <HeaderMain />
          <div className="flex flex-col md:flex-row justify-center items-center mt-6 md:mt-10 px-4 md:px-17 py-4 gap-8 md:gap-20 relative overflow-hidden">
            <div className="flex flex-col items-start justify-center gap-6 z-10 w-full md:w-auto text-center md:text-left items-center md:items-start">
              <h1 className="text-4xl md:text-7xl font-bold">{t("title")}</h1>
              <ArrowBtn />
            </div>
            <div className="relative flex items-center justify-center">
              <Image src={leaf3} alt="leaf" className="hidden md:block absolute top-40 left-95" />
              <Image src={leaf4} alt="leaf4" className="hidden md:block absolute right-0 -top-10" />
              <Image src={MainImage} alt="Main Image" className="w-64 h-64 md:w-153 md:h-152 object-contain" />
              <Image src={leaf2} alt="leaf2" className="hidden md:block absolute bottom-0 -left-10" />
              <Image src={leaf1} alt="leaf1" className="hidden md:block absolute top-0 right-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
