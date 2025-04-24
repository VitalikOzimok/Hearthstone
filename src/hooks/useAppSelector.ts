import { TypeCard } from "../page/collection/type";
import { useAppSelector } from "../types/reduxHook";
import { selectFavoritesItems } from "../page/favorites/favoriteSelector";

export const useIsFavorite = (card: TypeCard | undefined | null) => {
  const favorites = useAppSelector(selectFavoritesItems);
  return !!card && favorites.some((item) => item.name === card.name);
};
