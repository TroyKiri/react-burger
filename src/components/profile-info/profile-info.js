import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./profile-info.module.css";

import {
  getUserWithRefresh,
  updateUserWithRefresh,
} from "../../services/actions/authAction";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileInfo() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth);

  const onIconClick = (ref) => {
    ref.current.removeAttribute("disabled");
    ref.current.classList.remove("input__textfield-disabled");
    ref.current.focus();
  };

  const updateUser = () => {
    dispatch(updateUserWithRefresh(nameValue, emailValue, passwordValue));
  };

  const cancelUpdate = () => {
    dispatch(getUserWithRefresh());
  };

  const onBlur = (ref) => {
    ref.current.disabled = true;
    ref.current.classList.add("input__textfield-disabled");
  };

  useEffect(() => {
    dispatch(getUserWithRefresh());
  }, []);

  useEffect(() => {
    setEmailValue(user.email);
    setNameValue(user.name);
  }, [user]);

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.input} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            value={nameValue}
            disabled={true}
            icon={"EditIcon"}
            onChange={(e) => setNameValue(e.target.value)}
            onIconClick={() => onIconClick(inputNameRef)}
            onBlur={() => onBlur(inputNameRef)}
            error={false}
            ref={inputNameRef}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.input} mb-6`}>
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            icon={"EditIcon"}
            name={"e-mail"}
            disabled={true}
            error={false}
            ref={inputEmailRef}
            onIconClick={() => onIconClick(inputEmailRef)}
            onBlur={() => onBlur(inputEmailRef)}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.input} mb-6`}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={(e) => setPasswordValue(e.target.value)}
            icon={"EditIcon"}
            value={passwordValue}
            disabled={true}
            name={"password"}
            error={false}
            ref={inputPasswordRef}
            onIconClick={() => onIconClick(inputPasswordRef)}
            onBlur={() => onBlur(inputPasswordRef)}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info} mt-2`}
        >
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
        <Button type="secondary" onClick={cancelUpdate}>
          Отмена
        </Button>
        <Button type="primary" onClick={updateUser}>
          Сохранить
        </Button>
      </div>
    </>
  );
}

export default ProfileInfo;
