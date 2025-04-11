import { Card } from "./type";
type ChildProps = {
  loading: boolean;
  filteredCards: Card[];
};
export function CardList({ loading, filteredCards }: ChildProps) {
  return (
    <div>
      {!loading ? (
        <div className="flex mx-auto ">
          <div className="  mx-auto flex flex-wrap justify-center gap-4 w-full">
            {filteredCards.map((card) => (
              <div key={card.cardId} className="flex flex-col items-center">
                <img src={card.img} alt={card.name} className="w-[200px]" />
                <p>{card.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm transition duration-700">
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-lg text-gray-700 font-semibold">
              Загрузка данных...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
