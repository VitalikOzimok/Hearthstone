import { useState } from "react";
import { Button } from "../../components/shared/button";
import { Form } from "../../components/shared/form";
import { ROUTES } from "../../constants/route";
import { fields } from "./constants";
import { Header } from "../../components/shared/header";
import { STORAGE_KEYS } from "../../constants/localStorage";

export function SignIn() {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center w-4/6 mx-auto  gap-20">
      <Header text1={"Заходи в таверну!"} text2={"Мы по тебе скучали"} />
      <div className="text-red-500 text-xl">{error}</div>
      <Form
        setError={setError}
        fields={fields}
        buttonText={"Войти"}
        onSubmit={async (data, dispatch) => {
          const auth = localStorage.getItem(STORAGE_KEYS.AUTH);

          if (!auth) {
            setError("Пользователь не зарегистрирован");
            return false;
          }

          const saved = JSON.parse(auth);

          if (
            data.login === saved.user.login &&
            data.password === saved.user.password
          ) {
            dispatch({ type: "IF_AUTH" });
            return true;
          } else {
            setError("Неверный логин или пароль");
            return false;
          }
        }}
      />

      <div className="flex items-center justify-center gap-5 absolute bottom-20">
        <h1>Создать новый аккаунт</h1>
        <Button text={"Регистрация"} to={ROUTES.signup} />
      </div>
    </div>
  );
}
