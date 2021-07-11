import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import formStyles from "./form.module.css";

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
    <div className={`${formStyles.main}`}>
      <h1 className={`${formStyles.header} text text_type_main-medium mb-6`}>
        Вход
      </h1>
      <form className={`${formStyles.form} text text_type_main-medium mb-20`}>
        <div className={`${formStyles.input} mb-6`}>
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
        <div className={`${formStyles.input} mb-6`}>
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
        <div className={`${formStyles.button}`}>
          <Button type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>
      <p className="text text_type_main-default mb-4 text_color_inactive">
        Вы — новый пользователь?&nbsp;
        <Link to={{ pathname: "/register" }} className={`${formStyles.link}`}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?&nbsp;
        <Link
          to={{ pathname: "/forgot-password" }}
          className={`${formStyles.link}`}
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
