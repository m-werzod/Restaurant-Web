import Image from "next/image"
import Bronirovat from "@/app/components/Bronirovat";
import { leaf7, leaf8, Pizza } from "@/app/assets/images";

export default function ReservationCard() {
  return (
      <div className="container mx-auto flex justify-center items-ceneter  p-10 ">
        <Image src={leaf7} alt="7" className="absolute top-370 right-130" />
        <Image src={leaf8} alt="7" className="absolute top-530 right-115" />

        <div className="flex mt-20">
          <Bronirovat />
        </div>
        <Image src={Pizza} alt="Pizza" className="w-220 h-220" />
      </div>
  );
      
}
