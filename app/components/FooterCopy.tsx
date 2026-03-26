import { Facebook, Instagram, Telegram, WhatsApp } from "@/app/assets/icons/index";

const FooterCopy = () => {
  return (
    <div className="bg-[url('assets/images/footer-bg.png')] bg-cover bg-center">
      <div className="flex justify-between px-18 py-15 container mx-auto ">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">Logo</h1>
          <div className="flex gap-2 cursor-pointer">
            <Telegram />
            <WhatsApp />
            <Facebook />
            <Instagram />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-1">Наши услуги</h1>
          <h3 className="text-base font-normal">Цены</h3>
          <h3 className="text-base font-normal">Отслеживание</h3>
          <h3 className="text-base font-normal">Cообщить об ошибке</h3>
          <h3 className="text-base font-normal">Условия услуг</h3>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-1">Наша компания</h1>
          <h3 className="text-base font-normal">Отчетность</h3>
          <h3 className="text-base font-normal">Cвяжитесь с нами</h3>
          <h3 className="text-base font-normal">Управление</h3>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-1">Адрес</h1>
          <h3 className="text-base font-normal">Узбекистан, Ташкент</h3>
          <h3 className="text-base font-normal">Улица, 24</h3>
          <h3 className="text-base font-normal">+99894848844848</h3>
          <h3 className="text-base font-normal">info@bmgsoft.com</h3>
        </div>
      </div>
    </div>
  );
};

export default FooterCopy;
