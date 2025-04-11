import { costOptions } from "./constants";
type ChildProps = {
  setIdByCost: React.Dispatch<React.SetStateAction<number>>;
  idByCost: number;
};

export function FilterByMana({ setIdByCost, idByCost }: ChildProps) {
  return (
    <div className="flex gap-1 text-white ">
      {costOptions.map((item) => (
        <button
          onClick={() => {
            setIdByCost(item);
          }}
          className={`rounded-full p-2 hover:scale-105 cursor-pointer  ${
            idByCost === item ? "bg-red-300 " : "bg-indigo-500"
          }`}
        >
          {item != 8 ? `${item}` : `${item}+`}
        </button>
      ))}
    </div>
  );
}
