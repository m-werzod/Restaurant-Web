import { useTranslations } from "next-intl";
import { Gal1, Gal2, Gal3, UnderImg } from "@/app/assets/images";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import NewsCard from "@/app/components/NewsCard";
import { Link } from "@/i18n/navigation";
import Gallery from "@/app/modules/main/Gallery";

const newsText =
  "Используйте гибкие структуры, чтобы предоставить надежный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.";

const newsCards = [
  { image: Gal1 },
  { image: Gal2 },
  { image: Gal3 },
  { image: Gal1 },
  { image: Gal2 },
  { image: Gal3 },
];

const News = () => {
  const t = useTranslations("news");

  return (
    <div>
      <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl pb-10">
        <HeaderMain />

        <p className="text-sm text-gray-500 px-10 pt-6 flex gap-1">
          <Link href="/" className="hover:underline">
            Главная
          </Link>{" "}
          ›<span className="text-black -pb-20">Новости</span>
        </p>

        <h1 className="text-5xl font-bold text-center py-8 -mb-20">{t("title")}</h1>

        <div className="flex justify-between items-start px-12 mt-20 mb-6">
          {newsCards.slice(0, 3).map((card, i) => (
            <NewsCard
              key={i}
              image={card.image}
              text={newsText}
              authorImage={UnderImg}
              authorName="Сергей"
            />
          ))}
        </div>

        <div className="flex justify-between items-start px-12 mt-16 mb-6">
          {newsCards.slice(3, 6).map((card, i) => (
            <NewsCard
              key={i}
              image={card.image}
              text={newsText}
              authorImage={UnderImg}
              authorName="Сергей"
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 my-8">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center ${
                n === 1 ? "bg-black text-white" : "bg-white/60 text-black"
              }`}
            >
              {n}
            </button>
          ))}
          <span className="text-gray-500 px-1">...</span>
          <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-black text-lg">
            ›
          </button>
        </div>
      </div>

      <Gallery />

      <FooterCopy />
    </div>
  );
};

export default News;
