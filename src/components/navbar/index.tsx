import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { LoginBlock } from "./login";
import { SeacrhInput } from "../shared/search-input";
import { ROUTES } from "../../constants/route";
import { navItems } from "./constants";

export function NavBar() {
  const [ifAuth, setIfAuth] = useState<boolean>(false);

  return (
    <div className="sticky top-0 w-full py-4  z-50 shadow-lg shadow-violet-200 bg-amber-200">
      <nav className="flex items-center justify-between gap-4 mx-auto w-5/6">
        <NavLink to={ROUTES.home}>
          <img className="h-[70px]" src={Logo} alt="Logo" />
        </NavLink>
        <div className="flex gap-5  text-lg  whitespace-nowrap">
          {navItems.map(
            (item) =>
              (!item.authRequired || ifAuth) && (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              )
          )}
        </div>
        <SeacrhInput />
        <LoginBlock ifAuth={ifAuth} />
      </nav>
    </div>
  );
}
