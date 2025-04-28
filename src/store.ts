import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./page/favorites/favoriteSlices";
import searchReducer from "./page/history/searchSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
