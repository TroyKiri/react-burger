import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import formStyles from "./form.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = useState("");
  const inputEmailRef = useRef(null);

  return (
    <div className={`${formStyles.main}`}>
      <h1 className={`${formStyles.header} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${formStyles.form} text text_type_main-medium mb-20`}>
        <div className={`${formStyles.input} mb-6`}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            name={"e-mail"}
            error={false}
            ref={inputEmailRef}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${formStyles.button}`}>
          <Button type="primary" size="medium">
            Восстановить
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

export default ForgotPasswordPage;
