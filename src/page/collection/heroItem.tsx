import Unknow from "../../assets/classes/unknow.png";
import { heroImages } from "./constants";
export type ChildProps = {
  hero: string[];
  setFilterByHero: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  filterByHero: string | null;
};
export function HeroItem({
  hero,
  setLoading,
  setFilterByHero,
  filterByHero,
}: ChildProps) {
  return (
    <div className="flex flex-col gap-3">
      {hero.map((item, id) => (
        <div
          key={id}
          className={`flex items-center justify-between h-20 cursor-pointer hover:scale-105 transition duration-300 min-w-[275px] rounded-r-xl ${
            filterByHero === item ? "bg-red-400" : "bg-blue-600"
          }`}
          onClick={() => {
            setFilterByHero(item);
            setLoading(true);
          }}
        >
          <h1 className="text-nowrap ml-8 text-lg text-white font-sans">
            {item}
          </h1>
          <div className="flex-shrink-0 ">
            <img
              src={heroImages[item] || Unknow}
              alt=""
              className="h-25 w-30"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
