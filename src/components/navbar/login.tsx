import { UserCheck, X } from "lucide-react";
import { Button } from "../shared/button";
import { ROUTES } from "../../constants/route";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../shared/header";

export function LoginBlock() {
  const { state, dispatch } = useAuth();

  return !state.isAuthenticated ? (
    <div className="flex gap-2 text-lg font-s5 whitespace-nowrap">
      <Button to={ROUTES.signin} text={"Войти"} />
      <Button to={ROUTES.signup} text={"Регистрация"} />
    </div>
  ) : (
    <div className="rounded-xl bg-blue-600 p-2 relative group">
      <UserCheck className="w-8 h-8 text-white" />
      <div className="flex flex-col gap-1   bg-blue-500 absolute -bottom-20 opacity-0 right-[0px] rounded-xl p-1  transition-all duration-300 ">
        <Header
          text1={state.user?.login}
          className1={"text-2xl font-semibold"}
          text2={state.user?.email}
          className2={"text-gray-400"}
        />
        <div
          onClick={() => dispatch({ type: "LOGOUT" })}
          className="p-1 w-[112px] mx-auto "
        >
          <Button text={"выйти"} icon={<X size={20} />} />
        </div>
      </div>
    </div>
  );
}
