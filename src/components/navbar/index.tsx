import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { LoginBlock } from "./login";
import { SeacrhInput } from "../shared/search-input";
import { ROUTES } from "../../constants/route";
import { useNavItems } from "../../hooks/useNavItems";

export function NavBar() {
  const navItems = useNavItems();
  return (
    <div className="sticky top-0 w-full py-4  z-50 shadow-lg shadow-violet-200 bg-amber-200">
      <nav className="flex items-center justify-between gap-4 mx-auto w-5/6">
        <NavLink to={ROUTES.home}>
          <img
            className="h-[70px] hover:scale-105 duration-300 transition"
            src={Logo}
            alt="Logo"
          />
        </NavLink>
        <div className="flex gap-5  text-lg font-semibold  whitespace-nowrap">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="cursor-pointer hover:scale-105 text-xl hover:text-blue-500 transition duration-300 "
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <SeacrhInput />
        <LoginBlock />
      </nav>
    </div>
  );
}
