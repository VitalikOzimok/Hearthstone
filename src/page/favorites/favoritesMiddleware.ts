import { Middleware } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/localStorage";
import { addToFavorites, removeFromFavorites } from "./favoriteSlices";

export const favoritesMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (addToFavorites.match(action) || removeFromFavorites.match(action)) {
      const { token } = action.payload;
      const state = store.getState();
      const items = state.favorites.items;

      localStorage.setItem(
        `${STORAGE_KEYS.FAVORITES}_${token}`,
        JSON.stringify(items)
      );
    }

    return result;
  };
