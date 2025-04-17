import { Form } from "../../components/shared/form";
import { Header } from "../../components/shared/header";
import { useAuth } from "../../hooks/useAuth";
import { fields } from "./constants";

export function SignUp() {
  const { state } = useAuth();

  return (
    <>
      <div className="flex flex-col items-center w-4/6 mx-auto  gap-5">
        <Header text1={"Заходите в таверну!"} text2={"Регистрация"} />
        <Form
          fields={fields}
          buttonText={"Зарегистрироваться"}
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
      </div>
    </>
  );
}
