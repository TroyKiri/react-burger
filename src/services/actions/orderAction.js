import { ORDER_ID } from "../../utils/constants";
import { RESET_CONSTRUCTOR } from "./constructorAction";

// экшены для получения номера заказа
export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export function getOrderNumber(ingredientsId, openModal) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });

    fetch(ORDER_ID, {
      method: "POST",
      body: JSON.stringify({ ingredients: ingredientsId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.ok ? res : Promise.reject(res.status);
      })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          number: res.order.number,
        });
        dispatch({ type: RESET_CONSTRUCTOR });
        openModal();
      })
      .catch((e) => {
        console.log(`Ошибка: статус промиса: ${e}`);
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
      });
  };
}
