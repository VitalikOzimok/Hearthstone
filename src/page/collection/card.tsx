import { Button } from "../../components/shared/button";
import { ROUTES } from "../../constants/route";
import { useAuth } from "../../hooks/useAuth";
import { TypeCard } from "./type";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/typeReduxHooks"; // Импортируем хук
import {
  addToFavorites,
  removeFromFavorites,
} from "../favorites/favoritesSlice";

type ChildProps = {
  card: TypeCard;
};
export function Card({ card }: ChildProps) {
  const { state } = useAuth();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items); // Берем список избранных
  const isFav = card && favorites.some((item) => item.name === card.name);

  const toggleFavorite = () => {
    if (card) {
      if (isFav) {
        dispatch(removeFromFavorites(card.name));
      } else {
        dispatch(addToFavorites(card));
      }
    }
  };

  return (
    <div className="relative">
      <NavLink
        to={ROUTES.hearthstoneCard.replace(
          ":cardName",
          encodeURIComponent(card.name)
        )}
      >
        <div
          key={card.cardId}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={card.img}
            alt={card.name}
            className="w-[200px] hover:scale-105 transition duration-300"
          />
          <p>{card.name}</p>
        </div>
      </NavLink>
      {state.isAuthenticated && (
        <div
          onClick={toggleFavorite}
          className="absolute  right-0 top-0 mr-3 mt-3 "
        >
          <Button
            text={!isFav ? "+" : "-"}
            color={!isFav ? "bg-blue-500" : "bg-red-400"}
          />
        </div>
      )}
    </div>
  );
}
