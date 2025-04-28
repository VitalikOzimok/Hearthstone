import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/localStorage";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/loadFromLocalStorage";

const STORAGE_KEY = STORAGE_KEYS.SEARCH_HISTORY;

type SearchState = {
  history: string[];
};

const initialState: SearchState = {
  history: loadFromLocalStorage<string[]>(STORAGE_KEY) || [],
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
      saveToLocalStorage(STORAGE_KEY, updated);
    },
    clearHistory: (state) => {
      state.history = [];
      removeFromLocalStorage(STORAGE_KEY);
    },
  },
});

export const { addSearchQuery, clearHistory } = searchSlice.actions;
export default searchSlice.reducer;
