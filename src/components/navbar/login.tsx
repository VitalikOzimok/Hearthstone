import { UserCheck, X } from "lucide-react";
import { Button } from "../shared/button";
import { ROUTES } from "../../constants/route";
import { useAuth } from "../../hooks/useAuth";

export function LoginBlock() {
  const { state } = useAuth();
  return !state.isAuthenticated ? (
    <div className="flex gap-2 text-lg font-s5 whitespace-nowrap">
      <Button to={ROUTES.signin} text={"Войти"} />
      <Button to={ROUTES.signup} text={"Регистрация"} />
    </div>
  ) : (
    <div className="rounded-xl bg-indigo-500 p-2 relative group">
      <UserCheck className="w-8 h-8 text-white" />
      <div
        className="flex flex-col gap-1 bg-white border-[1px] border-indigo-500 absolute -bottom-20 opacity-0 right-[1px] rounded-xl p-1  transition-all duration-300 
              group-hover:opacity-100 group-hover:translate-y-16"
      >
        <h1 className="text-2xl font-semibold">{state.user?.login}</h1>
        <h1 className="text-gray-400">{state.user?.email}</h1>
        <div className="p-1 w-[112px] mx-auto ">
          <Button text={"выйти"} icon={<X size={20} />} />
        </div>
      </div>
    </div>
  );
}
