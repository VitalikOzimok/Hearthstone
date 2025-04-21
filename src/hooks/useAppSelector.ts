import { TypeCard } from "../page/collection/type";
import { useAppSelector } from "./typeReduxHooks";

export const useIsFavorite = (card: TypeCard | undefined | null) => {
  const favorites = useAppSelector((state) => state.favorites.items);
  return !!card && favorites.some((item) => item.name === card.name);
};
