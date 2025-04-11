import { costOptions } from "./constants";
type ChildProps = {
  setIdByCost: React.Dispatch<React.SetStateAction<number>>;
};

export function FilterByMana({ setIdByCost }: ChildProps) {
  return (
    <div className="flex gap-1 text-white ">
      {costOptions.map((item) => (
        <button
          onClick={() => {
            setIdByCost(item);
          }}
          className="rounded-full p-2 hover:scale-105 cursor-pointer  bg-indigo-500 border-[1px] border-black"
        >
          {item != 8 ? `${item}` : `${item}+`}
        </button>
      ))}
    </div>
  );
}
