import { Arrow } from "../assets/icons";

const ArrowBtn = () => {
  return (
    <button className="flex items-center justify center gap-2 text-white bg-black px-4 py-2 rounded-lg mt-6 text-sm font-medium cursor-pointer justify-center">
      <p>Посмотреть меню</p>
      <Arrow />
    </button>
  );
};

export default ArrowBtn;
