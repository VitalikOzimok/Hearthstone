import { useAppSelector } from "../../hooks/typeReduxHooks";
import { Card } from "../collection/card";

export const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  if (favorites.length === 0) {
    return <div>Ваша коллекция карт пока пуста!</div>;
  }

  return (
    <div className="w-5/6 mx-auto ">
      <div className="flex flex-wrap gap-4 ml-10">
        {favorites.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
