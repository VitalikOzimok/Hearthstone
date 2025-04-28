export const STORAGE_KEYS = {
  AUTH: "auth",
  FAVORITES: "favorites",
  USERS: "users",
  SEARCH_HISTORY: "searchHistory",
};
export const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
