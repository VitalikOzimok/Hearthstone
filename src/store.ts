import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./page/favorites/favoriteSlices";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
