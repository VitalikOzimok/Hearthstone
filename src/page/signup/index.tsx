import { useState } from "react";
import { Form } from "../../components/shared/form";
import { Header } from "../../components/shared/header";
import { fields } from "./constants";
import { generateToken } from "../../utils/generateToken";

export function SignUp() {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center w-4/6 mx-auto  gap-10">
      <Header text1={"Приключение начинается!"} text2={"Регистрация"} />
      <div className="text-red-500 text-xl">{error}</div>
      <Form
        setError={setError}
        fields={fields}
        buttonText={"Зарегистрироваться"}
        onSubmit={async (data, dispatch) => {
          const userData = {
            user: {
              login: data.login,
              email: data.email,
              password: data.password,
            },
            token: generateToken(),
            isAuthenticated: true,
          };

          const users = JSON.parse(localStorage.getItem("users") || "[]");

          const existing = users.find(
            (u: any) => u.user.login === userData.user.login
          );

          if (existing) {
            setError("Пользователь с таким логином уже существует");
            return false;
          }

          users.push({ user: userData.user, token: userData.token });
          localStorage.setItem("users", JSON.stringify(users));

          localStorage.setItem("auth", JSON.stringify(userData));

          dispatch({
            type: "LOGIN",
            payload: userData,
          });

          return true;
        }}
      />
    </div>
  );
}
