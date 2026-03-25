import { EmailIcon, FlagIcon, PhoneIcon, UserIcon } from "../assets/icons";

const HeaderHead = () => {
  return (
    <div className="flex items-center justify-between container mx-auto px-4 py-6">
      <div className="flex-1 flex items-center gap-10  py-2">
        <span className="flex items-center gap-2"><PhoneIcon />+998(90)758383833</span>
        <span className="flex items-center gap-2"><EmailIcon />info@bmgsoft.com </span>
      </div>
      <div className="flex-1 flex items-center justify-end gap-10">
        <div className="flex items-center gap-2">
          <FlagIcon />
          <select name="Language"id="Lang"className="border-none outline-none bg-transparent cursor-pointer  text-black font-normal text-base">
            <option value="Eng">English</option>
            <option className="outline-none" value="Rus">Русски </option>
          </select>
        </div>

        <span className="flex items-center gap-2 text-white bg-black px-2 py-1 rounded-lg cursor-pointer text-sm font-medium">
          <UserIcon />
          Вход в аккаунт
        </span>
      </div>
      <div />
    </div>
  );
}

export default HeaderHead