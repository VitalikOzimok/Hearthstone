import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeCard } from "../collection/type";
import { STORAGE_KEYS } from "../../constants/localStorage";

type FavoritesState = {
  items: TypeCard[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    loadFavorites: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      try {
        const data = localStorage.getItem(`${STORAGE_KEYS.FAVORITES}_${token}`);
        state.items = data ? JSON.parse(data) : [];
      } catch {
        state.items = [];
      }
    },
    addToFavorites: (
      state,
      action: PayloadAction<{ token: string; card: TypeCard }>
    ) => {
      const { card } = action.payload;
      const exists = state.items.some((item) => item.name === card.name);
      if (!exists) {
        state.items.push(card);
      }
    },

    removeFromFavorites: (
      state,
      action: PayloadAction<{ token: string; name: string }>
    ) => {
      const { name } = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },
  },
});

export const { addToFavorites, removeFromFavorites, loadFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
