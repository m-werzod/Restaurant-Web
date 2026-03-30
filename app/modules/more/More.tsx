"use client";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import { Link } from "@/i18n/navigation";
import { Nash1, Nash2 } from "@/app/assets/images";
import Image from "next/image";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Быстрая доставка",
    desc: "Доставляем горячие блюда прямо к вашей двери в течение 30-45 минут.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Приготовлено с любовью",
    desc: "Каждое блюдо готовится нашими опытными поварами из свежих продуктов.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Гарантия качества",
    desc: "Мы гарантируем свежесть и качество каждого ингредиента в наших блюдах.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    title: "Лучшие ингредиенты",
    desc: "Используем только проверенные поставщики и сезонные продукты.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Опытная команда",
    desc: "Более 50 специалистов работают для того, чтобы ваш опыт был незабываемым.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Удобное расположение",
    desc: "Находимся в центре города — легко добраться пешком или на транспорте.",
  },
];

const More = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl">
        <HeaderMain />
      </div>

      {/* Hero */}
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-widest">О нас</span>
            <h1 className="text-5xl font-bold mt-3 mb-6 leading-tight">
              Больше, чем просто ресторан
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Мы создаём незабываемые гастрономические впечатления с 2015 года.
              Наша миссия — приносить радость каждому гостю через вкусную еду,
              тёплую атмосферу и безупречный сервис.
            </p>
            <div className="flex gap-4">
              <Link
                href="/reservation"
                className="bg-black text-white px-7 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition"
              >
                Забронировать стол
              </Link>
              <Link
                href="/menu"
                className="border-2 border-black text-black px-7 py-3.5 rounded-full font-semibold hover:bg-black hover:text-white transition"
              >
                Наше меню
              </Link>
            </div>
          </div>
          <div className="flex-1 flex gap-4 justify-center">
            <Image src={Nash1} alt="Our restaurant" className="w-52 h-64 object-cover rounded-3xl shadow-lg" />
            <Image src={Nash2} alt="Our food" className="w-52 h-64 object-cover rounded-3xl shadow-lg mt-8" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-black text-white py-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "8+", label: "Лет опыта" },
              { number: "120+", label: "Блюд в меню" },
              { number: "50k+", label: "Довольных гостей" },
              { number: "15+", label: "Наград" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-4">Почему выбирают нас</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Мы стремимся к совершенству в каждой детали — от выбора ингредиентов до подачи блюда
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group"
            >
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 text-orange-500 group-hover:bg-orange-100 transition">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 pb-16 max-w-6xl">
        <div className="bg-linear-to-r from-orange-400 to-amber-400 rounded-3xl p-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Готовы попробовать?</h2>
          <p className="text-white/80 mb-8 text-lg">Закажите любимое блюдо или забронируйте столик прямо сейчас</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/menu"
              className="bg-white text-black px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition"
            >
              Открыть меню
            </Link>
            <Link
              href="/contacts"
              className="border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>

      <FooterCopy />
    </div>
  );
};

export default More;
