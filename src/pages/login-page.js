import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import formStyles from "./form.module.css";

import { signIn, getUserWithRefresh } from "../services/actions/authAction";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../utils/cookie";

function LoginPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth);

  const { state } = useLocation();

  const onIconClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
  };
  const onChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(signIn(emailValue, passwordValue));
    setEmailValue("");
    setPasswordValue("");
  };

  if (user.email && user.name) {
    return <Redirect to={`${state?.from.pathname}` || "/"} />;
  }

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
          <PasswordInput
            onChange={onChange}
            value={passwordValue}
            name={"password"}
          />
        </div>
        <div className={`${formStyles.button}`}>
          <Button type="primary" size="medium" onClick={login}>
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
