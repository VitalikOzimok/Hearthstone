import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypeCard } from "../collection/type";
import { Button } from "../../components/shared/button";
import { API_HEADERS, fieldsToDisplay } from "./constants";
import { BASE_URL } from "../collection/constants";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../hooks/typeReduxHooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../favorites/favoritesSlice";
import { Loader } from "../../components/shared/loader";

export function HearthstoneCard() {
  const { cardName } = useParams<{ cardName: string }>();
  const [oneCard, setOneCard] = useState<TypeCard | null>(null);
  const { state } = useAuth();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFav = oneCard && favorites.some((item) => item.name === oneCard.name);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cards/${cardName}`, {
          method: "GET",
          headers: API_HEADERS,
        });
        const data = await response.json();
        setOneCard(data[0]);
      } catch (err) {
        console.error("Ошибка загрузки карт:", err);
      }
    };

    fetchCards();
  }, [cardName]);

  const toggleFavorite = () => {
    if (oneCard) {
      if (isFav) {
        dispatch(removeFromFavorites(oneCard.name));
      } else {
        dispatch(addToFavorites(oneCard));
      }
    }
  };
  if (!oneCard) {
    return <Loader />;
  }

  return (
    <div className="flex w-full mx-auto items-center justify-center ">
      <img src={oneCard?.img} alt={oneCard?.name} />
      <div>
        <div className="font-bold text-5xl"> {oneCard?.name}</div>
        <div className="text-2xl mt-10">
          {fieldsToDisplay.map(({ key, label }) => {
            const value = oneCard?.[key];
            if (!value) return null;
            return (
              <div key={key} className="flex gap-5 mb-2">
                <li className="text-amber-500 list-none">{label}:</li>
                <h1 className="text-violet-600">{value}</h1>
              </div>
            );
          })}
        </div>
        {state.isAuthenticated && (
          <div onClick={toggleFavorite} className="mt-10">
            <Button
              text={!isFav ? "Добавить в избранное" : "Удалить из избранного"}
              color={!isFav ? "bg-blue-600" : "bg-red-400"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
