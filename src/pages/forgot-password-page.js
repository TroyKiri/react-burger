import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import formStyles from "./form.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../services/actions/passwordAction";

function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = useState("");
  const inputEmailRef = useRef(null);

  const dispatch = useDispatch();
  const { forgotPasswordSuccess } = useSelector((store) => store.password);

  const history = useHistory();
  const location = useLocation();

  console.log(location);

  const forgotPass = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(emailValue));
  };

  useEffect(() => {
    if (forgotPasswordSuccess) {
      // location.state = location.pathname;
      // history.replace("/reset-password");
      history.replace({
        pathname: "/reset-password",
        state: location.pathname,
      });
    }
  }, [forgotPasswordSuccess, history]);

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
          <Button type="primary" size="medium" onClick={forgotPass}>
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
