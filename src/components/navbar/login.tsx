import { UserCheck } from "lucide-react";

interface Props {
  ifAuth: boolean;
}

export function LoginBlock({ ifAuth }: Props) {
  return !ifAuth ? (
    <div className="flex gap-2 text-lg font-s5 whitespace-nowrap">
      <button className="p-3 px-5 max-md:w-full hover:text-teal-100 cursor-pointer hover:scale-105 transition bg-indigo-500 text-white rounded-xl">
        Войти
      </button>
      <button className="p-3 px-5 max-md:w-full hover:text-teal-100 hover:scale-105 cursor-pointer transition bg-indigo-500 text-white rounded-xl">
        Регистрация
      </button>
    </div>
  ) : (
    <div className="rounded-xl bg-indigo-500 p-2 ">
      <UserCheck className="w-8 h-8 text-white" />
    </div>
  );
}
