import Unknow from "../../assets/classes/unknow.jpg";
import { heroImages } from "./constants";
type ChildProps = {
  hero: string[];
  setFilterByHero: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export function HeroItem({ hero, setLoading, setFilterByHero }: ChildProps) {
  return (
    <div className="flex flex-col gap-6">
      {hero.map((item, id) => (
        <div
          key={id}
          className="flex items-center justify-between bg-indigo-500 h-20 cursor-pointer hover:scale-105 transition duration-300 min-w-[275px] rounded-r-xl"
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
              className="h-30 w-35"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
