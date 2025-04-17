import { Button } from "../../components/shared/button";
import { ROUTES } from "../../constants/route";

export function SignIn() {
  return (
    <div className="flex flex-col items-center w-4/6 mx-auto  gap-5">
      <Button text={"Войти"} />
      <div className="flex items-center justify-center gap-5 absolute bottom-20">
        <h1>Создать новый аккаунт</h1>
        <Button text={"Регистрация"} to={ROUTES.signup} />
      </div>
    </div>
  );
}
