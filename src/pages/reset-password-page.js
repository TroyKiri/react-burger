import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import formStyles from "./form.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPasswordPage() {
  const [passwordValue, setPasswordValue] = useState("");
  const inputPasswordRef = useRef(null);
  const [codeValue, setCodeValue] = useState("");
  const inputCodeRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
  };

  return (
    <div className={`${formStyles.main}`}>
      <h1 className={`${formStyles.header} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${formStyles.form} text text_type_main-medium mb-20`}>
        <div className={`${formStyles.input} mb-6`}>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
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
        <div className={`${formStyles.input} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setCodeValue(e.target.value)}
            value={codeValue}
            name={"name"}
            error={false}
            ref={inputCodeRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${formStyles.button}`}>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <p className="text text_type_main-default mb-4 text_color_inactive">
        Вспомнили пароль?&nbsp;
        <Link to={{ pathname: "/login" }} className={`${formStyles.link}`}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
