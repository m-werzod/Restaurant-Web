"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import { Link } from "@/i18n/navigation";
import { Meal1, Meal2, Meal3 } from "@/app/assets/images";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import CarouselDemo from "@/app/components/CarouselDemo";

const mealImages = [Meal1, Meal2, Meal3];

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  rating?: number;
  reviews?: number;
  fullDescription?: string;
};

const StarRating = ({ rating = 4 }: { rating?: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} width="18" height="18" viewBox="0 0 24 24"
        fill={star <= rating ? "#FBBF24" : "none"}
        stroke={star <= rating ? "#FBBF24" : "#D1D5DB"}
        strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const More = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = (params?.locale as string) || "ru";
  const { addToCart } = useCart();

  const idParam = searchParams.get("id");
  const nameParam = searchParams.get("name") ?? "Бургер";
  const descParam = searchParams.get("desc") ?? "Spicy with garlic";
  const priceParam = parseFloat(searchParams.get("price") ?? "10");
  const imgParam = searchParams.get("img") ?? "";

  const [product, setProduct] = useState<Product>({
    id: Number(idParam) || 1,
    name: nameParam,
    description: descParam,
    price: priceParam,
    image: imgParam,
    rating: 4,
    reviews: 24,
    fullDescription:
      "Эти двусторонние шелковые брюки с запахом икат сочетают в себе универсальность двух потрясающих рисунков ткани. Эти брюки, изготовленные из очаровательной ткани икат, позволяют вам выбрать предпочтительный узор, что делает их универсальным дополнением к вашему гардеробу.",
  });

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!idParam) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/${idParam}`)
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => setProduct({ ...data, rating: data.rating ?? 4, reviews: data.reviews ?? 24 }))
      .catch(() => {});
  }, [idParam]);

  const fallbackImage = mealImages[(product.id - 1) % 3];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, name: product.name, description: product.description, price: product.price, image: product.image ?? "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header card */}
      <div className="bg-linear-to-r from-white/40 to-white/40 w-full container mx-auto rounded-3xl">
        <HeaderMain />
      </div>

      {/* Main detail card */}
      <div className="bg-linear-to-r from-white/40 to-white/40 w-full container mx-auto rounded-3xl mt-4 p-4 md:p-10">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-6 md:mb-8 flex gap-1 flex-wrap">
          <Link href="/" className="hover:underline">Главная</Link> ›
          <Link href="/menu" className="hover:underline">Меню</Link> ›
          <span className="text-black">{product.name}</span>
        </p>

        {/* Product layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Left — large image */}
          <div className="w-full md:shrink-0 md:w-80 h-64 md:h-80 flex items-center justify-center">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            ) : (
              <Image src={fallbackImage} alt={product.name} className="w-full h-full object-contain" />
            )}
          </div>

          {/* Right — info */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>

            {/* Price + rating */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{product.price.toFixed(2)}$</span>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} />
                <span className="text-gray-500 text-sm font-medium">{product.rating?.toFixed(1)}</span>
                <Link href="#reviews" className="text-sm text-gray-400 hover:underline">
                  (Смотреть отзывы)
                </Link>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold mb-2">Описание:</h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                {product.fullDescription ?? product.description}
              </p>
            </div>

            {/* Quantity + cart */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-3 bg-white/60 rounded-full px-4 py-2 shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-xl font-bold cursor-pointer hover:text-gray-500 transition w-6 text-center"
                >−</button>
                <span className="text-lg font-semibold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-xl font-bold cursor-pointer hover:text-gray-500 transition w-6 text-center"
                >+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition active:scale-95 cursor-pointer"
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar products */}
      <div className="container mx-auto px-15 mt-10 mb-10">
        <h2 className="text-3xl font-bold mb-8">Похожие:</h2>
        <CarouselDemo />
      </div>

      <FooterCopy />
    </div>
  );
};

export default More;
