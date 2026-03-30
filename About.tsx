import Image from "next/image";
import { Link } from "@/i18n/navigation";
import HeaderHead from "@/app/components/HeaderHead";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import NewsCard from "@/app/components/NewsCard";
import { Nash1, Nash2, Gal1, Gal2, Gal3, UnderImg } from "@/app/assets/images";

const API_BASE = "https://anorkhulov.uz";

type Cook = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
};

async function getCooks(): Promise<Cook[]> {
  try {
    const res = await fetch(`${API_BASE}/api/cook`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const json = await res.json();
    if (Array.isArray(json)) return json;
    if (Array.isArray(json.data)) return json.data;
    return [];
  } catch {
    return [];
  }
}

const newsText =
  "Используйте гибкие структуры, чтобы предоставить надежный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.";

const About = async () => {
  const cooks = await getCooks();

  return (
    <div>
      <HeaderHead />

      <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl pb-10">
        <HeaderMain />

        <p className="text-sm text-gray-500 px-10 pt-6 flex gap-1">
          <Link href="/" className="hover:underline">
            Главная
          </Link>{" "}
          ›<span className="text-black">О нас</span>
        </p>

        <h1 className="text-5xl font-bold text-center py-8">О нас</h1>
        <div className="px-12 flex flex-col gap-5 text-base text-gray-800 leading-relaxed mb-14">
          <p className="text-[22px]">
            С 1995 года наша миссия в ресторане — питать и вдохновлять каждого
            члена команды, гостя и сообщество, которому мы служим. Спустя все
            эти годы эти основные ценности остаются в основе всего, что мы
            делаем. От нашего меню до наших услуг и способов ведения бизнеса —
            наш свежий, неожиданный и человечный взгляд отличает нас. Мы
            называем его Необыкновенной Добротой. И это то само, что мы делаем.
          </p>
          <p className="text-[22px]">
            Имея более 450 ресторанов в 26 штатах и более 8000 членов команды,
            мы два года подряд были названы Forbes одним из лучших работодателей
            Америки в области разнообразия. Деловой журнал признал нас одним из
            лучших мест для работы. Мы считаем, что эти успехи основаны на нашей
            уникальной и заботливой культуре, благодаря которой каждый, кто
            входит в наши двери, чувствует себя желанным гостем и оцененным по
            достоинству.
          </p>
        </div>

        <div className="px-12 mb-16">
          <h2 className="text-4xl font-bold mb-8 ">Наша еда</h2>
          <div className="flex gap-10 items-start">
            <div className="flex-1 flex flex-col gap-4 text-base text-gray-800 leading-relaxed">
              <p className="text-[22px]">
                Наша страсть — создавать исключительные впечатления от еды по
                отличной цене. От традиционных и современных блюд до наших
                собственных кулинарных творений, таких как фаршированные
                тарелочки премиум-класса, наши свежеприготовленные рецепты
                отличаются индивидуальностью, креативностью и ярким вкусом кухни
                всего мира.
              </p>
              <p className="text-[22px]">
                От «Пенне Роза» до японской лапши, салата «Медь» и некоторых
                известных макарон с сыром «Вислония» — мы используем только
                самые лучшие и полезные ингредиенты. Каждое блюдо готовится
                свежим и делается «на заказ». Наше богатое меню наполнено
                яркими, яркими и притягательными вкусами.
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors w-fit mt-2"
              >
                Посмотреть меню →
              </Link>
            </div>

            <div className="relative shrink-0">
              <Image
                src={Nash1}
                alt="наша еда"
                className="relative z-10 w-120 h-140 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="px-12 mb-16">
          <div className="flex gap-10 items-start">
            <div className="shrink-0">
              <Image
                src={Nash2}
                alt="наш путь"
                className="w-120 h-140 object-cover rounded-2xl"
              />
            </div>

            <div className="flex-1 flex flex-col gap-4 text-base text-gray-800 leading-relaxed">
              <h2 className="text-4xl font-bold mb-2">Наш путь</h2>
              <p className="text-[22px]">
                С самого начала мы взяли на себя обязательство предлагать свежие
                продукты, свежие ингредиенты и новый взгляд на то, что люди
                слышат о нашем бизнесе. Наша история говорит о нашем росте и о
                наших сообществах. Мы искренне верим, что нет ничего, что
                объединяет людей лучше, чем еда или сделать мир лучше, чем
                творить добро.
              </p>
              <p className="text-[22px]">
                Продолжая расти, мы реализуем ключевые инициативы во всей нашей
                компании, чтобы поддерживать светлое будущее. В каждом отчёте о
                прогрессе мы рассматриваем некоторые из этих областей, такие как
                создание меню, возможность свежего питания и захватывающим
                новыми вкусами: активных лучших в отрасли льгот для людей; и
                некоторые способы лучше заботиться о нашей команде — и о нашей
                планете — которую мы называем домом.
              </p>
            </div>
          </div>
        </div>

        <div className="px-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-10">Наша команда</h2>
          <div className="grid grid-cols-3 gap-x-8 gap-y-10 justify-items-center">
            {cooks.map((cook) => (
              <div
                key={cook.id}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-white/80 shadow-md">
                  {cook.avatar ? (
                    <img
                      src={`${API_BASE}/${cook.avatar}`}
                      alt={`${cook.firstName} ${cook.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-3xl text-gray-400">
                      {cook.firstName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-base">
                    {cook.firstName} {cook.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{cook.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="px-12 mb-10 container mx-auto mt-10">
        <h2 className="text-4xl font-bold text-center mb-10">
          Новости/Галерея
        </h2>
        <div className="flex justify-between items-start">
          {[Gal1, Gal2, Gal3].map((img, i) => (
            <NewsCard
              key={i}
              image={img}
              text={newsText}
              authorImage={UnderImg}
              authorName="Сергей"
            />
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
          >
            Посмотреть всё →
          </Link>
        </div>
      </div>

      <FooterCopy />
    </div>
  );
};

export default About;
