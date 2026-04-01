"use client";
import { useTranslations } from "next-intl";
import ViewAllBtn from "@/app/components/ViewAllBtn";
import NewsCard from "@/app/components/NewsCard";
import { Gal1, Gal2, Gal3, UnderImg } from "@/app/assets/images";

const newsText =
  "Используйте гибкие структуры, чтобы предоставить надежный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.";

const cards = [
  { image: Gal1 },
  { image: Gal2 },
  { image: Gal3 },
];

const Gallery = () => {
  const t = useTranslations("gallery");

  return (
    <div className="container mx-auto px-4 md:px-15">
      <h1 className="text-2xl md:text-[48px] font-bold text-center py-10 md:py-20 mb-6 md:mb-15">
        {t("title")}
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0 mb-6">
        {cards.map((card, i) => (
          <NewsCard
            key={i}
            image={card.image}
            text={newsText}
            authorImage={UnderImg}
            authorName="Сергей"
          />
        ))}
      </div>

      <div className="flex justify-end mb-10">
        <ViewAllBtn href="/news" />
      </div>
    </div>
  );
};

export default Gallery;
