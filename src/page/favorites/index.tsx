import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../types/reduxHook";
import { Card } from "../collection/card";
import { TypeCard } from "../collection/type";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../constants/route";

export const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  if (favorites.length === 0) {
    return <div>Ваша коллекция карт пока пуста!</div>;
  }
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(ROUTES.signin);
    }
  }, [state.isAuthenticated]);

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
