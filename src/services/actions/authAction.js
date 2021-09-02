import { REGISTER, LOGIN, LOGOUT } from "../../utils/constants";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";

//экшены для авторизации
export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";

export function signUp(name, email, password) {
  return function (dispatch) {
    return fetch(REGISTER, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => {
        return res.ok ? res : Promise.reject(res.status);
      })
      .then((res) => res.json())
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
      });
  };
}

export function signIn(email, password) {
  return function (dispatch) {
    return fetch(LOGIN, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return res.ok ? res : Promise.reject(res.status);
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const accessToken = res.accessToken.split("Bearer ")[1];
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: SIGN_IN,
          user: res.user,
        });
      })
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
      });
  };
}

export const logOut = () => {
  return function (dispatch) {
    return fetch(LOGOUT, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    })
      .then((res) => {
        return res.ok ? res : Promise.reject(res.status);
      })
      .then((res) => res.json())
      .then((res) => {
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
        dispatch({
          type: LOG_OUT,
        });
      })
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
      });
  };
};
