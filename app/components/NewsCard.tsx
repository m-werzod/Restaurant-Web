import Image from "next/image";
import type { StaticImageData } from "next/image";

type NewsCardProps = {
  image: StaticImageData;
  text: string;
  authorImage: StaticImageData;
  authorName: string;
};

const NewsCard = ({ image, text, authorImage, authorName }: NewsCardProps) => {
  return (
    <div className="relative w-90  flex flex-col items-center">
      <Image
        src={image}
        alt="news"
        className="relative z-10 w-72 h-44 object-cover rounded-2xl top-15 right-2 "
      />
      <div className="bg-white/40 backdrop-blur-sm rounded-3xl -mt-6  px-7 pb-7 flex flex-col gap-5 w-full h-75 pt-30">
        <p className="text-[16px] font-normal">{text}</p>
        <div className="flex items-center gap-2">
          <Image
            src={authorImage}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-normal text-lg">{authorName}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
