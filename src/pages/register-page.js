import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import formStyles from "./form.module.css";

import { signUp } from "../services/actions/authAction";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function RegisterPage() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);

  const dispatch = useDispatch();
  const { successRegister } = useSelector((store) => store.auth);
  const history = useHistory();
  const onChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(signUp(nameValue, emailValue, passwordValue));
    setNameValue("");
    setEmailValue("");
    setPasswordValue("");
  };

  if (successRegister) {
    history.replace("/login");
  }

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
          <Button type="primary" size="medium" onClick={register}>
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
