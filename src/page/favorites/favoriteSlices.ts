import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeCard } from "../collection/type";

interface FavoritesState {
  items: TypeCard[];
}

const initialState: FavoritesState = {
  items: [],
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
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      console.log("Удаляем:", action.payload);
      state.items = state.items.filter((item) => {
        console.log("Сравниваем:", item.name, "с", action.payload);
        return item.name !== action.payload;
      });
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
