import {
  REGISTER,
  LOGIN,
  LOGOUT,
  PROFILE,
  UPDATE_PROFILE,
} from "../../utils/constants";

import {
  setCookie,
  getCookie,
  deleteCookie,
  checkResponse,
  refreshToken,
} from "../../utils/cookie";

//экшены для авторизации
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESFULL = "SIGN_UP_SUCCESFULL";
export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";
// получение данных о пользователе
export const GET_USER = "GET_USER";
export const PATCH_USER = "GET_USER";

const options = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};
const optionsForGetUser = { ...options, method: "GET" };
const optionsForUpdateUser = { ...options, method: "PATCH" };

export const getUserWithRefresh = () => {
  return function (dispatch) {
    fetchWithRefresh(PROFILE, optionsForGetUser)
      .then((res) => {
        dispatch({
          type: GET_USER,
          user: res.user,
        });
      })
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
      });
  };
};
export const updateUserWithRefresh = (name, email, password) => {
  const form = password ? { name, email, password } : { name, email };

  return function (dispatch) {
    fetchWithRefresh(PROFILE, {
      ...optionsForUpdateUser,
      body: JSON.stringify(form),
    })
      .then((res) => {
        dispatch({
          type: PATCH_USER,
          user: res.user,
        });
      })
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
      });
  };
};

export const fetchWithRefresh = async (url, options) => {
  try {
    options.headers.Authorization = "Bearer " + getCookie("accessToken");
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      setCookie("refreshToken", refreshData.refreshToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

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
      .then(() => {
        dispatch({ type: SIGN_UP_SUCCESFULL });
      })
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
        const accessToken = res.accessToken.split("Bearer ")[1];
        setCookie("refreshToken", res.refreshToken);
        setCookie("accessToken", accessToken);
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
      .then(() => {
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
