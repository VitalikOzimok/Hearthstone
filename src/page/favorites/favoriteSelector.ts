import { RootState } from "../../store";

export const selectFavoritesItems = (state: RootState) => state.favorites.items;
