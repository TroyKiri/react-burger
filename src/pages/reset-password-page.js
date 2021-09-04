import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import formStyles from "./form.module.css";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../services/actions/passwordAction";

function ResetPasswordPage() {
  const [passwordValue, setPasswordValue] = useState("");
  const inputPasswordRef = useRef(null);
  const [codeValue, setCodeValue] = useState("");
  const inputCodeRef = useRef(null);

  const dispatch = useDispatch();
  const { resetPasswordSuccess } = useSelector((store) => store.password);

  const history = useHistory();
  const location = useLocation();

  console.log("location");
  console.log(location);
  console.log("history");
  console.log(history);

  const onIconClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
  };

  const resetPass = (event) => {
    event.preventDefault();
    dispatch(resetPassword(passwordValue, codeValue));
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      history.replace("/login");
    }
  }, [resetPasswordSuccess, history]);

  if (location.state !== "/forgot-password") {
    return <Redirect to="/login" />;
  }

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
          <Button type="primary" size="medium" onClick={resetPass}>
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
