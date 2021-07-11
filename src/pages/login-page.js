import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import loginPageStyles from "./login-page.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function LoginPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
  };

  return (
    <div className={`${loginPageStyles.main}`}>
      <h1
        className={`${loginPageStyles.header} text text_type_main-medium mb-6`}
      >
        Вход
      </h1>
      <form
        className={`${loginPageStyles.form} text text_type_main-medium mb-20`}
      >
        <div className={`${loginPageStyles.input} mb-6`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            name={"e-mail"}
            error={false}
            ref={inputEmailRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${loginPageStyles.input} mb-6`}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={(e) => setPasswordValue(e.target.value)}
            icon={"ShowIcon"}
            value={passwordValue}
            name={"password"}
            error={false}
            ref={inputPasswordRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${loginPageStyles.button}`}>
          <Button type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>
      <p className="text text_type_main-default mb-4 text_color_inactive">
        Вы — новый пользователь?&nbsp;
        <Link
          to={{ pathname: "/register" }}
          className={`${loginPageStyles.link}`}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?&nbsp;
        <Link
          to={{ pathname: "/forgot-password" }}
          className={`${loginPageStyles.link}`}
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
