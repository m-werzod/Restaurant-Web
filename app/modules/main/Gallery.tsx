import { getTranslations } from "next-intl/server";
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

const Gallery = async () => {
  const t = await getTranslations("gallery");

  return (
    <div className="container mx-auto px-15">
      <h1 className="text-[48px] font-bold text-center py-20 mb-15">
        {t("title")}
      </h1>

      <div className="flex justify-between items-start px-0 mb-6">
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
