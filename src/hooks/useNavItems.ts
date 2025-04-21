import { useAuth } from "./useAuth";
import { navItems } from "../components/navbar/constants";

export const useNavItems = () => {
  const { state } = useAuth();

  return navItems.filter((item) => !item.authRequired || state.isAuthenticated);
};
