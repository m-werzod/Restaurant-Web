import { Car, Cofe, Etic, HeadChef, Pitsa, UserInLove } from "@/app/assets/icons/index";
import InfoChange from "@/app/components/InfoChange";

const Info = () => {
    return (
      <div className="flex flex-col container mx-auto mb-10 px-20">
        <h1 className="text-[48px] font-bold text-center pb-20">
          Почему именно мы?
        </h1>
        <div className="flex flex-col gap-20">
          <div className="flex justify-between">
            <div>
              <InfoChange
                className="flex flex-col gap-2.5"
                icon={<Cofe />}
                title="Качественные продукты"
                description={
                  <>
                    Входные билеты в музеи, для посещения <br />
                    достопримечательностей, памятников
                  </>
                }
              />
            </div>

            <div>
              <InfoChange
                className="flex flex-col gap-2.5"
                icon={<Car />}
                title="Быстрая доставка"
                description={
                  <>
                    Входные билеты в музеи, для посещения <br />
                    достопримечательностей, памятников
                  </>
                }
              />
            </div>

            <div>
              <InfoChange
                className="flex flex-col gap-2.5"
                icon={<Pitsa />}
                title="Вкусные рецепты"
                description={
                  <>
                    Входные билеты в музеи, для посещения <br />
                    достопримечательностей, памятников
                  </>
                }
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <InfoChange
                className="flex flex-col gap-2.5"
                icon={<Etic />}
                title="Уютная атмосфера"
                description={
                  <>
                    Входные билеты в музеи, для посещения <br />
                    достопримечательностей, памятников
                  </>
                }
              />
            </div>

            <div>
              <InfoChange
                className="flex flex-col gap-2.5"
                icon={<HeadChef />}
                title="Опытные повара"
                description={
                  <>
                    Входные билеты в музеи, для посещения <br />
                    достопримечательностей, памятников
                  </>
                }
              />
            </div>

            <div>
              <InfoChange
                className="flex flex-col gap-2.5"
                icon={<UserInLove />}
                title=" Обслуживания"
                description={
                  <>
                    Входные билеты в музеи, для посещения <br />
                    достопримечательностей, памятников
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Info
