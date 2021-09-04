import { BASE_URL } from "../../utils/constants";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function forgotPassword(email) {
  return function (dispatch) {
    return fetch(`${BASE_URL}/password-reset`, {
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
      }),
    })
      .then((res) => {
        return res.ok ? res : Promise.reject(res.status);
      })
      .then((res) => res.json())
      .then(() => {
        dispatch({ type: FORGOT_PASSWORD });
      })
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
      });
  };
}

export function resetPassword(password, token) {
  return function (dispatch) {
    return fetch(`${BASE_URL}/password-reset/reset`, {
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
        password,
        token,
      }),
    })
      .then((res) => {
        return res.ok ? res : Promise.reject(res.status);
      })
      .then((res) => res.json())
      .then(() => {
        dispatch({ type: RESET_PASSWORD });
      })
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
      });
  };
}
