import { Gal1, UnderImg } from "@/app/assets/images";
import Image from "next/image"
const Gallery = () => {
  return (     
          <div className="w-90 h-69.25 bg-white/40 rounded-3xl p-7 flex flex-col gap-5 pt-25">
              <Image src={Gal1}  alt="Gal1" className="absolute top-870"/>
        <p className="text-[16px] font-normal">
          Используйте гибкие структуры, чтобы <br />
          предоставить надежный обзор для <br />
          обзоров высокого уровня. Итеративные <br />
          подходы к данным корпоративной.
        </p>
              <div className="flex items-center gap-2">
                  <Image src={UnderImg} alt="UnderImg" />
          <h2 className="font-normal text-18px">Сергей</h2>
          </div>
          
      </div>
  );
}

export default Gallery