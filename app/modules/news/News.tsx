"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Gal1, Gal2, Gal3, UnderImg } from "@/app/assets/images";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import NewsCard from "@/app/components/NewsCard";
import { Link } from "@/i18n/navigation";
import Gallery from "@/app/modules/main/Gallery";

const fallbackText =
  "Используйте гибкие структуры, чтобы предоставить надежный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.";

const fallbackCards = [
  { image: Gal1 },
  { image: Gal2 },
  { image: Gal3 },
  { image: Gal1 },
  { image: Gal2 },
  { image: Gal3 },
];

type NewsItem = {
  id: number;
  image?: string;
  text?: string;
  authorName?: string;
};

const ITEMS_PER_PAGE = 6;

const News = () => {
  const t = useTranslations("news");
  const [apiNews, setApiNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?page=${page}&limit=${ITEMS_PER_PAGE}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items ?? [];
        setApiNews(items);
        if (data.totalPages) setTotalPages(data.totalPages);
      })
      .catch(() => setApiNews([]));
  }, [page]);

  const hasApi = apiNews.length > 0;

  const renderCard = (item: NewsItem | null, i: number) => {
    const fallback = fallbackCards[i % fallbackCards.length];
    return (
      <NewsCard
        key={i}
        image={item?.image ? (item.image as never) : fallback.image}
        text={item?.text ?? fallbackText}
        authorImage={UnderImg}
        authorName={item?.authorName ?? "Сергей"}
      />
    );
  };

  const rows = hasApi
    ? [apiNews.slice(0, 3), apiNews.slice(3, 6)]
    : [fallbackCards.slice(0, 3), fallbackCards.slice(3, 6)];

  const pageNumbers = Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1);

  return (
    <div>
      <div className="bg-linear-to-r from-white/40 to-white/40 w-full container mx-auto rounded-3xl pb-10">
        <HeaderMain />

        <p className="text-sm text-gray-500 px-4 md:px-10 pt-6 flex gap-1">
          <Link href="/" className="hover:underline">Главная</Link>{" "}
          ›<span className="text-black">Новости</span>
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-center py-8">{t("title")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12 mt-10 mb-6">
          {rows[0].map((card, i) => renderCard(hasApi ? (card as NewsItem) : null, i))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12 mt-6 mb-6">
          {rows[1].map((card, i) => renderCard(hasApi ? (card as NewsItem) : null, i + 3))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 my-8">
          {pageNumbers.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center cursor-pointer transition ${
                page === n ? "bg-black text-white" : "bg-white/60 text-black hover:bg-white/80"
              }`}
            >
              {n}
            </button>
          ))}
          {totalPages > 4 && <span className="text-gray-500 px-1">...</span>}
          {totalPages > 4 && (
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-black text-lg hover:bg-white/80 cursor-pointer transition"
            >
              ›
            </button>
          )}
        </div>
      </div>

      <Gallery />
      <FooterCopy />
    </div>
  );
};

export default News;
