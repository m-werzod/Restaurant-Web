"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CarouselTall from "@/app/components/CarouselTall";
import NewsCard from "@/app/components/NewsCard";
import HeaderMain from "@/app/components/HeaderMain";
import { Link } from "@/i18n/navigation";
import FooterCopy from "@/app/components/FooterCopy";
import ArrowBtn from "@/app/components/ArrowBtn";
import { Gal1, Gal2, Gal3, UnderImg, Meal1, Meal2, Meal3 } from "@/app/assets/images";
import { CartProduct } from "@/app/context/CartContext";
import type { StaticImageData } from "next/image";

const mealImages: StaticImageData[] = [Meal1, Meal2, Meal3];

const categories = [
  { key: "first", label: "Первые" },
  { key: "second", label: "Вторые" },
  { key: "salads", label: "Салаты" },
  { key: "drinks", label: "Напитки" },
  { key: "fastfood", label: "Фаст-Фуд" },
];

const menuProducts: CartProduct[] = [
  { id: 1, name: "Chicken Soup", description: "Spicy with garlic", price: 10, image: "" },
  { id: 2, name: "Tomato Soup", description: "Fresh tomatoes & basil", price: 8, image: "" },
  { id: 3, name: "Mushroom Soup", description: "Creamy forest mushrooms", price: 9, image: "" },
  { id: 4, name: "Pea Soup", description: "With smoked ham", price: 7, image: "" },
  { id: 5, name: "Borsch", description: "Traditional beet soup", price: 9, image: "" },
  { id: 6, name: "Lentil Soup", description: "Hearty & nutritious", price: 8, image: "" },
  { id: 7, name: "Fish Soup", description: "With salmon & dill", price: 12, image: "" },
  { id: 8, name: "Onion Soup", description: "French style, gratinée", price: 11, image: "" },
  { id: 9, name: "Minestrone", description: "Italian vegetable soup", price: 9, image: "" },
  { id: 10, name: "Ramen", description: "Japanese noodle broth", price: 13, image: "" },
  { id: 11, name: "Pho", description: "Vietnamese beef broth", price: 12, image: "" },
  { id: 12, name: "Gazpacho", description: "Cold Spanish tomato soup", price: 8, image: "" },
  { id: 13, name: "Clam Chowder", description: "New England style", price: 14, image: "" },
  { id: 14, name: "Miso Soup", description: "Japanese tofu & seaweed", price: 6, image: "" },
  { id: 15, name: "Egg Drop Soup", description: "Classic Chinese style", price: 7, image: "" },
  { id: 16, name: "Corn Chowder", description: "Sweet corn & cream", price: 9, image: "" },
];

const newsText =
  "Используйте гибкие структуры, чтобы предоставить надежный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.";

const Menu = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("cat") ?? "first";
  const t = useTranslations("gallery");

  return (
    <div>
      <div className="bg-linear-to-r from-white/40 to-white/40 w-full container mx-auto rounded-3xl pb-10">
        <HeaderMain />

        <p className="text-sm text-gray-500 px-4 md:px-10 pt-6 flex gap-1">
          <Link href="/" className="hover:underline">Главная</Link>{" "}
          › <span className="text-black">Меню</span>
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-center py-8">Меню</h1>

        {/* Category tabs — scrollable on mobile */}
        <div className="flex justify-center mb-10 px-4">
          <div className="flex gap-1 bg-white/40 backdrop-blur-sm rounded-full p-1.5 shadow-inner overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/menu?cat=${cat.key}`}
                className={`px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition whitespace-nowrap ${
                  activeCategory === cat.key
                    ? "bg-white shadow-md font-semibold text-black"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {activeCategory === "first" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 px-4 md:px-12 mt-16">
            {menuProducts.map((product) => (
              <CarouselTall
                key={product.id}
                product={product}
                localImage={mealImages[product.id % 3]}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-20 text-gray-400 text-sm">
            No items found
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-15">
        <h1 className="text-2xl md:text-[48px] font-bold text-center py-10 md:py-20">{t("title")}</h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 md:mb-20">
          <NewsCard image={Gal1} text={newsText} authorImage={UnderImg} authorName="Сергей" />
          <NewsCard image={Gal2} text={newsText} authorImage={UnderImg} authorName="Сергей" />
          <NewsCard image={Gal3} text={newsText} authorImage={UnderImg} authorName="Сергей" />
        </div>
        <div className="flex justify-end mb-10">
          <ArrowBtn />
        </div>
      </div>

      <FooterCopy />
    </div>
  );
};

export default Menu;
