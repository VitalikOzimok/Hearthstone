import { UserCheck, X } from "lucide-react";
import { Button } from "../shared/button";
import { ROUTES } from "../../constants/route";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../shared/header";

export function LoginBlock() {
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return !state.isAuthenticated ? (
    <div className="flex gap-2 text-lg font-s5 whitespace-nowrap">
      <Button to={ROUTES.signin} text={"Войти"} />
      <Button to={ROUTES.signup} text={"Регистрация"} />
    </div>
  ) : (
    <div className="rounded-xl bg-blue-600 p-2 relative group">
      <UserCheck className="w-8 h-8 text-white" />
      <div
        className="flex flex-col gap-1 bg-blue-500 absolute -bottom-22 right-0 rounded-xl p-1 
               opacity-0  group-hover:opacity-100 group-hover:translate-y-16 
               transition-all duration-300 ease-in-out z-10"
      >
        <Header
          text1={state.user?.login}
          className1={"text-2xl font-semibold text-white"}
          text2={state.user?.email}
          className2={"text-gray-300"}
        />
        <div onClick={handleLogout} className="p-1 w-[112px] mx-auto ">
          <Button text={"выйти"} icon={<X size={20} />} />
        </div>
      </div>
    </div>
  );
}
