import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/localStorage";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/loadFromLocalStorage";

const STORAGE_KEY = STORAGE_KEYS.SEARCH_HISTORY;

type SearchState = {
  history: string[];
};

const initialState: SearchState = {
  history: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchQuery: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (!query) return;

      const filtered = state.history.filter((item) => item !== query);
      const updated = [query, ...filtered].slice(0, 10);

      state.history = updated;

      const userLogin = localStorage.getItem(STORAGE_KEYS.AUTH)
        ? JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH)!).user.login
        : "guest";
      const key = `${STORAGE_KEY}_${userLogin}`;
      saveToLocalStorage(key, updated);
    },
    clearHistory: (state) => {
      state.history = [];
      const userLogin = localStorage.getItem(STORAGE_KEYS.AUTH)
        ? JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH)!).user.login
        : "guest";
      const key = `${STORAGE_KEY}_${userLogin}`;
      removeFromLocalStorage(key);
    },
    setSearchHistory: (state, action: PayloadAction<string>) => {
      const userLogin = action.payload || "guest";
      const key = `${STORAGE_KEY}_${userLogin}`;
      const history = loadFromLocalStorage<string[]>(key) || [];
      state.history = history;
    },
  },
});

export const { addSearchQuery, clearHistory, setSearchHistory } =
  searchSlice.actions;
export default searchSlice.reducer;
