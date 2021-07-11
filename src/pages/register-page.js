import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import formStyles from "./form.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function RegisterPage() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
  };

  return (
    <div className={`${formStyles.main}`}>
      <h1 className={`${formStyles.header} text text_type_main-medium mb-6`}>
        Регистрация
      </h1>
      <form className={`${formStyles.form} text text_type_main-medium mb-20`}>
        <div className={`${formStyles.input} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setNameValue(e.target.value)}
            value={nameValue}
            name={"name"}
            error={false}
            ref={inputNameRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
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
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <p className="text text_type_main-default mb-4 text_color_inactive">
        Уже зарегистрированы?&nbsp;
        <Link to={{ pathname: "/login" }} className={`${formStyles.link}`}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
