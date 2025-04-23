import { useAppSelector } from "../../types/reduxHook";
import { Card } from "../collection/card";
import { TypeCard } from "../collection/type";

export const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  if (favorites.length === 0) {
    return <div>Ваши избранные товары пока пусты!</div>;
  }

  return (
    <div className="w-5/6 mx-auto ">
      <div className="flex flex-wrap gap-4 ml-10">
        {favorites.map((card: TypeCard) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
