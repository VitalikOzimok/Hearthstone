import { useState } from "react";
import { Button } from "../../components/shared/button";
import { X } from "lucide-react";

type ChildProp = {
  sets: string[];
  selectedSet: string;
  setSelectedSet: React.Dispatch<React.SetStateAction<string>>;
};

export function FilterBySets({ sets, selectedSet, setSelectedSet }: ChildProp) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (item: string) => {
    setSelectedSet(item);
    setIsModalOpen(false);
  };

  return (
    <div className="relative inline-block">
      <Button text={selectedSet} onClick={() => setIsModalOpen(!isModalOpen)} />
      {isModalOpen && (
        <div className="absolute mt-2 bg-blue-500 text-white border rounded-xl shadow-lg p-4 w-64 z-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold mb-2">Выберите набор</h2>
            <X
              onClick={() => setIsModalOpen(false)}
              className="text-red-400 mb-2 -mr-1 cursor-pointer hover:scale-110"
            />
          </div>
          <ul className="space-y-1 max-h-60 overflow-y-auto">
            {sets.map((item) => (
              <li key={item}>
                <div
                  onClick={() => handleSelect(item)}
                  className={`w-[200px] cursor-pointer text-left px-3 py-2 rounded 
        ${
          item === selectedSet
            ? "bg-red-400 text-white"
            : "hover:bg-gray-100 hover:text-blue-500"
        }`}
                >
                  {item}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
