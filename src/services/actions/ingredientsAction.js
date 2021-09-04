import { BASE_URL } from "../../utils/constants";

//экшены для загрузки ингредиентов с API
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    return fetch(`${BASE_URL}/ingredients`)
      .then((res) => {
        return res.ok ? res : Promise.reject(res.status);
      })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
