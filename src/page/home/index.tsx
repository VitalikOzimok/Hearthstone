import Lich from "../../assets/lich_king.png";
import { Button } from "../../components/shared/button";
import { ROUTES } from "../../constants/route";
export function Home() {
  return (
    <div className="mx-auto w-5/6 items-center justify-between  ">
      <div className="pt-12 pb-10 ">
        <span className="font-s3 font-extrabold  text-7xl max-lg:text-5xl max-md:text-7xl max-xs:text-4xl   whitespace-nowrap flex max-md:justify-center ">
          Обманчиво простая,
          <br /> невероятно интересная
        </span>
        <p className="mt-8 text-2xl ">
          Компьютерная коллекционная карточная онлайн-игра по мотивам вселенной
          Warcraft
        </p>
        <Button to={ROUTES.collection} text={"Начать"} />
      </div>
      <div className=" flex-shrink-0 absolute bottom-0 ">
        <img className="h-auto w-full " src={Lich} alt="Lich" />
      </div>
    </div>
  );
}
