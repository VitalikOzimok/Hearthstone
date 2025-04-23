import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeCard } from "../collection/type";

interface FavoritesState {
  items: TypeCard[];
}
const loadFromLocalStorage = (): TypeCard[] => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFromLocalStorage(),
};
const updateLocalStorage = (items: TypeCard[]) => {
  localStorage.setItem("favorites", JSON.stringify(items));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<TypeCard>) => {
      const exists = state.items.some(
        (item) => item.name === action.payload.name
      );
      if (!exists) {
        state.items.push(action.payload);
        updateLocalStorage(state.items);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => {
        return item.name !== action.payload;
      });
      updateLocalStorage(state.items);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
