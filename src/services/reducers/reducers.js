import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,

  RESET,
  ADDITION
} from '../actions/actions';

//Исходное состояние
const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  constructorIngredients: {
    stuffing: [],
    bun: {},
    totalPrice: 0,
    ingredientsId: []
  },
  currentIngredient: {},
  orderInfo: []
}

const ingredientReducer = (state = initialState, action) => {
  const bunPrice = 2 * state.constructorIngredients.bun.price; // стоимость булочек
  const stuffingPrice = state.constructorIngredients.stuffing.reduce((prev, item) => { return prev += item.price }, 0); // общая стоимость начинок
  const prevPrice = bunPrice ? stuffingPrice + bunPrice : stuffingPrice; // стоимость заказа до добавления очередного ингредиента

  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    }
    case ADDITION: {
      if (action.item.type === 'bun') {
        return {
          ...state,
          constructorIngredients: {
            ...state.constructorIngredients,
            bun: action.item,
            totalPrice: bunPrice ? prevPrice - bunPrice + 2 * action.item.price : prevPrice + 2 * action.item.price,
            ingredientsId: [...state.constructorIngredients.ingredientsId, action.item._id, action.item._id]
          }
        }
      } else {
        return {
          ...state,
          constructorIngredients: {
            ...state.constructorIngredients,
            stuffing: [...state.constructorIngredients.stuffing, action.item],
            totalPrice: prevPrice + action.item.price,
            ingredientsId: [...state.constructorIngredients.ingredientsId, action.item._id]
          }
        }
      }
    }
    case RESET: {
      return {
        ...state,
        constructorIngredients: initialState.constructorIngredients
      }
    }
    default: {
      return state
    }
  }
}

export default ingredientReducer;