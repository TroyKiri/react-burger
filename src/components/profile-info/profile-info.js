import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./profile-info.module.css";

import {
  getUserWithRefresh,
  updateUserWithRefresh,
} from "../../services/actions/authAction";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookie";

function ProfileInfo() {
  const [nameValue, setNameValue] = useState("Марк");
  const [emailValue, setEmailValue] = useState("mail@stellar.burgers");
  const [passwordValue, setPasswordValue] = useState("123456");
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const [stateOfIcon, setStateOfIcon] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth);
  console.log(user);

  const onIconClick = (ref) => {
    setTimeout(() => {
      if (!stateOfIcon) {
        setStateOfIcon(true);
        ref.current.removeAttribute("disabled");
        ref.current.classList.remove("input__textfield-disabled");
        ref.current.focus();
      } else {
        setStateOfIcon(false);
        dispatch(updateUserWithRefresh(nameValue, emailValue, passwordValue));
      }
    }, 0);
  };

  const onBlur = (ref) => {
    ref.current.disabled = true;
    ref.current.classList.add("input__textfield-disabled");
  };

  // const init = async () => {
  //   await dispatch(getUserWithRefresh()).then(() => {
  //     setEmailValue(user.email);
  //     setNameValue(user.name);
  //   });
  // };

  useEffect(() => {
    // init();
    // if (getCookie("accessToken")) {
    // console.log("test");
    dispatch(getUserWithRefresh());
    // setEmailValue(user.email);
    // setNameValue(user.name);
    // }
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
      <p
        className={`text text_type_main-default text_color_inactive ${styles.info} mt-2`}
      >
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </>
  );
}

export default ProfileInfo;
