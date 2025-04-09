import Lich from "../../assets/lich_king.png";
import { NavLink } from "react-router-dom";
export default function Home() {
  return (
    <div className="overflow-x-hidde">
      <section className=" gap-16 md:h-full ">
        <div className="mx-auto w-5/6 items-center justify-between md:flex ">
          <div className=" z-10 pt-12 pb-10 ">
            <span className="font-s3 font-extrabold  text-7xl max-lg:text-5xl max-md:text-7xl max-xs:text-4xl   whitespace-nowrap flex max-md:justify-center ">
              Обманчиво простая,
              <br /> невероятно интересная
            </span>

            <p className="font-s5 mt-8 text-sm ">
              Компьютерная коллекционная карточная онлайн-игра по мотивам
              вселенной Warcraft
            </p>

            <NavLink to={"/collection"}>
              {" "}
              <div className="pt-5">
                <button className="p-3 px-14 max-md:w-full border-[1px] hover:bg-suki-100 hover:text-black  hover:border-gray-300 transition  bg-black text-white rounded-full text-md ">
                  Shop Now
                </button>
              </div>
            </NavLink>

            <div className="flex flex-row pt-7 gap-5 max-md:justify-center">
              <div className="flex flex-col">
                <h1 className="sis">200+</h1>
                <span>International Brands</span>
              </div>
              <div className="flex flex-col">
                <h1 className="sis">200+</h1>
                <span>International Brands</span>
              </div>
              <div className="flex flex-col">
                <h1 className="sis">200+</h1>
                <span>International Brands</span>
              </div>
            </div>
          </div>
          <div className=" flex-shrink-0 absolute bottom-0 ">
            <img className="h-auto w-full " src={Lich} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
