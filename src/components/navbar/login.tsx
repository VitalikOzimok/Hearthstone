import { UserCheck } from "lucide-react";
import { Button } from "../shared/button";

interface Props {
  ifAuth: boolean;
}

export function LoginBlock({ ifAuth }: Props) {
  return !ifAuth ? (
    <div className="flex gap-2 text-lg font-s5 whitespace-nowrap">
      <Button text={"Войти"} />
      <Button text={"Регистрация"} />
    </div>
  ) : (
    <div className="rounded-xl bg-indigo-500 p-2 ">
      <UserCheck className="w-8 h-8 text-white" />
    </div>
  );
}
