import { MainImage, leaf1, leaf2, leaf3, leaf4 } from "@/app/assets/images";
import Image from "next/image";
import HeaderHead from "@/app/components/HeaderHead"
import HeaderMain from "@/app/components/HeaderMain"
import ArrowBtn from "@/app/components/ArrowBtn";

const Main = () => {
    return (
      <div>
        <HeaderHead />
        <div>
          <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl pb-10">
            <HeaderMain />
            <div className="flex justify-center items-center mt-10 px-17 py-4 gap-20">
              <div className="flex flex-col items-start justify-center gap-6">
                <Image
                  src={leaf4}
                  alt="leaf4"
                  className="absolute right-300 top-46"
                />

                <h1 className="text-7xl font-bold">
                  Вкусная <br /> еда ждет тебя!
                </h1>
             <ArrowBtn/>
              </div>
              <Image
                src={leaf3}
                alt="leaf"
                className="absolute top-40 left-95"
              />
              <Image src={MainImage} alt="Main Image" className="w-153 h-152" />
                        <Image src={leaf2} alt="leaf2" className="absolute top-160 left-150" />
                        <Image src={leaf1} alt="leaf1" className="absolute top-130 left-285"/>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Main