import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/localStorage";

const STORAGE_KEY = STORAGE_KEYS.SEARCH_HISTORY;

const loadFromLocalStorage = (): string[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveToLocalStorage = (history: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

interface SearchState {
  history: string[];
}

const initialState: SearchState = {
  history: loadFromLocalStorage(),
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
      saveToLocalStorage(updated);
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { addSearchQuery, clearHistory } = searchSlice.actions;
export default searchSlice.reducer;
