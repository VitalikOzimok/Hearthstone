import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./page/favorites/favoriteSlices";
import searchReducer from "./page/history/searchSlice";
import { favoritesMiddleware } from "./page/favorites/favoritesMiddleware";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
