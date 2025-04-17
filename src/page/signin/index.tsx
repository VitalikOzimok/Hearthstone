import { useState } from "react";
import { Button } from "../../components/shared/button";
import { Form } from "../../components/shared/form";
import { ROUTES } from "../../constants/route";
import { fields } from "./constants";
import { Header } from "../../components/shared/header";

export function SignIn() {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center w-4/6 mx-auto  gap-20">
      <Header text1={"Заходи в таверну!"} text2={"Мы по тебе скучали"} />
      <Form
        setError={setError}
        fields={fields}
        buttonText={"Войти"}
        onSubmit={(data, dispatch) => {
          const userData = {
            user: {
              login: data.login,
              email: data.email,
              password: data.password,
            },
            token: Date.now() + "_" + Math.random().toString(36).slice(2),
          };
          localStorage.setItem("auth", JSON.stringify(userData));
          dispatch({
            type: "LOGIN",
            payload: userData,
          });
        }}
      />

      <div className="flex items-center justify-center gap-5 absolute bottom-20">
        <h1>Создать новый аккаунт</h1>
        <Button text={"Регистрация"} to={ROUTES.signup} />
      </div>
    </div>
  );
}
