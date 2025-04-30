import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../types/reduxHook";
import { Card } from "../collection/card";
import { TypeCard } from "../collection/type";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../constants/route";
import { loadFavorites } from "../favorites/favoriteSlices";
import { getToken } from "../../utils/getToken";
import { Header } from "../../components/shared/header";

export const Favorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(ROUTES.signin);
    } else {
      const token = state.token;
      if (token) {
        dispatch(loadFavorites(getToken()!));
      }
    }
  }, [state.isAuthenticated, dispatch]);

  if (favorites.length === 0) {
    return <Header text2={"Ваша коллекция карт пока пуста!"} />;
  }

  return (
    <div className="w-5/6 mx-auto">
      <div className="flex flex-wrap gap-4 ml-10">
        {favorites.map((card: TypeCard) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
