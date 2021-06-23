import { DATA_ID, ORDER_ID } from "../../utils/constants";
//экшены для загрузки ингредиентов с API
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
// экшены для добавления ингредиентов в конструктор
export const ADDITION = 'ADDITION';
export const RESET = 'RESET';
// экшены для просмотра информации об ингредиенте
export const CHOOSE_INGREDIENT = 'CHOOSE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
// экшены для получения номера заказа
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })

    fetch(DATA_ID)
      .then(res => {
        return res.ok ? res : Promise.reject(res.status)
      })
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      })
      .catch(e => {
        console.log(`Ошибка: статус промиса: ${e}`);
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  }
}

export function getOrderNumber(ingredientsId, openModal) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    })

    fetch(ORDER_ID, {
      method: 'POST',
      body: JSON.stringify({ ingredients: ingredientsId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.ok ? res : Promise.reject(res.status)
      })
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          number: res.order.number
        })
        dispatch({ type: RESET })
        openModal();
      })
      .catch(e => {
        console.log(`Ошибка: статус промиса: ${e}`);
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
      })

  }
}