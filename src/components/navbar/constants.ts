import { ROUTES } from "../../constants/route";
export const navItems = [
  { to: ROUTES.collection, label: "Коллекция", authRequired: false },
  { to: ROUTES.favorites, label: "Избранное", authRequired: true },
  { to: ROUTES.history, label: "История", authRequired: true },
];
