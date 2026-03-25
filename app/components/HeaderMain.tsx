import { SertsaIcon, KarzinaIcon } from "../assets/icons";

const HeaderMain = () => {
  return (
    <div className="flex items-center justify-between container mx-auto py-6 px-17">
      <h1 className="text-5xl font-bold">Logo</h1>
      <ul className="flex items-center gap-11 text-lg cursor-pointer hover">
        <li>Меню</li>
        <li>Новости</li>
        <li>Бронирование</li>
        <li>О нас</li>
        <li>Контакты</li>
      </ul>
      <div className="flex items-center gap-4">
        <div className="cursor-pointer flex items-center justify-center border-2 border-black text-black w-8.25 h-8.25 rounded-full p-1">
          <SertsaIcon />
        </div>
        <div className="cursor-pointer border-2 border-black text-black rounded-full p-1 flex justify-center items-center w-8.25 h-8.25">
          <KarzinaIcon />
        </div>
      </div>
    </div>
  );
}

export default HeaderMain
