import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { UserCheck } from "lucide-react";
import SeacrhInput from "../shared/search-input";
export default function NavBar() {
  const [ifAuth, setIfAuth] = useState<boolean>(true);

  return (
    <div className="sticky top-0 w-full py-4  z-50 shadow-lg shadow-violet-200 bg-amber-200">
      <nav className="flex items-center justify-between gap-4 mx-auto w-5/6">
        <NavLink to={"/"}>
          <img style={{ height: "70px" }} src={Logo} alt="" />
        </NavLink>
        <div>
          <ul className="flex gap-5  text-lg  font-s5 whitespace-nowrap">
            <NavLink to={"/collection"}>
              <li>Коллекция</li>
            </NavLink>
            {ifAuth && (
              <NavLink to={"/favorites"}>
                <li>Избранное</li>
              </NavLink>
            )}
            {ifAuth && (
              <NavLink to={"/history"}>
                <li>История</li>
              </NavLink>
            )}
          </ul>
        </div>
        <SeacrhInput />
        {!ifAuth ? (
          <div className="flex gap-2  text-lg  font-s5 whitespace-nowrap">
            <button className="p-3 px-5 max-md:w-full   hover:text-teal-100 cursor-pointer hover:scale-105  transition  bg-indigo-500 text-white rounded-xl">
              Войти
            </button>
            <button className="p-3 px-5 max-md:w-full   hover:text-teal-100 hover:scale-105 cursor-pointer  transition  bg-indigo-500 text-white rounded-xl ">
              Регистрация
            </button>
          </div>
        ) : (
          <div className="rounded-full bg-white p-2 border-[3px] border-indigo-500">
            <UserCheck className="w-8 h-8 text-indigo-500" />
          </div>
        )}
      </nav>
    </div>
  );
}
